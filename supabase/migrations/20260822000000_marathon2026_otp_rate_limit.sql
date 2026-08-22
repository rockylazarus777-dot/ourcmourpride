-- ============================================================
-- Migration: 20260822000000_marathon2026_otp_rate_limit
-- Description: Distributed, atomic rate limiting for
--              /api/marathon/otp/send. Replaces the previous
--              read-then-write "last_sent_at" cooldown check
--              (racy under Vercel's parallel serverless execution)
--              with Postgres row-locked counters, safely shared
--              across every serverless instance since they all
--              talk to the same database. No new infrastructure
--              (Redis/Upstash) required.
-- ============================================================


-- ── Table: otp_rate_limit_counters ─────────────────────────────
-- One row per (scope:identifier:window). Reused indefinitely via
-- UPSERT rather than appended-to, so this table's size is bounded
-- by distinct emails/IPs ever seen, not by request volume.

CREATE TABLE IF NOT EXISTS otp_rate_limit_counters (
  key           TEXT         PRIMARY KEY,
  window_start  TIMESTAMPTZ  NOT NULL,
  count         INTEGER      NOT NULL,
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

ALTER TABLE otp_rate_limit_counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access"
  ON otp_rate_limit_counters
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);


-- ── Function: otp_rl_touch ──────────────────────────────────────
-- Atomically increments (or resets, if the window has elapsed) a
-- single fixed-window counter and returns its new count + window
-- start. The UPDATE's row lock is what makes two simultaneous
-- requests for the same key (e.g. a double-clicked "Send OTP", or
-- two browser tabs) serialize instead of both reading a stale count
-- and both proceeding.

CREATE OR REPLACE FUNCTION otp_rl_touch(
  p_key             TEXT,
  p_window_seconds  INTEGER,
  p_now             TIMESTAMPTZ,
  OUT o_count        INTEGER,
  OUT o_window_start TIMESTAMPTZ
) LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO otp_rate_limit_counters AS c (key, window_start, count, updated_at)
  VALUES (p_key, p_now, 1, p_now)
  ON CONFLICT (key) DO UPDATE SET
    count = CASE
      WHEN c.window_start <= p_now - make_interval(secs => p_window_seconds) THEN 1
      ELSE c.count + 1
    END,
    window_start = CASE
      WHEN c.window_start <= p_now - make_interval(secs => p_window_seconds) THEN p_now
      ELSE c.window_start
    END,
    updated_at = p_now
  RETURNING count, window_start INTO o_count, o_window_start;
END;
$$;

REVOKE ALL ON FUNCTION otp_rl_touch(TEXT, INTEGER, TIMESTAMPTZ) FROM PUBLIC;


-- ── Function: check_and_touch_otp_rate_limit ────────────────────
-- Layered, atomic OTP-send rate limiter — safe under Vercel's
-- parallel serverless execution because every layer is a single-row
-- UPSERT (Postgres serializes concurrent writers on the same row),
-- and all four layers run inside one function call, so a single
-- round trip from the API route decides allow/deny.
--
-- Layers, checked cheapest/most-specific first so a blocked request
-- never touches a broader-scoped counter it didn't need to:
--   1. per-email cooldown   — 1  request  / 60s    (instant re-send guard)
--   2. per-email window     — 5  requests / 30 min (sustained-abuse guard for one address)
--   3. per-IP short window  — 20 requests / 10 min (single-client hammering guard)
--   4. per-IP long window   — 60 requests / 60 min (slower scripted-abuse guard)
--
-- IP limits are deliberately looser than the commonly-quoted
-- 10/10min & 30/hour: a lot of participants will be on carrier-grade
-- NAT (Indian mobile networks, college/office wifi), where dozens of
-- legitimate users can share one public IP. The per-email limits are
-- the primary defense; per-IP is a backstop against scripted abuse,
-- not the front line — so it stays generous enough not to collectively
-- lock out a shared network during a registration rush.
CREATE OR REPLACE FUNCTION check_and_touch_otp_rate_limit(
  p_email TEXT,
  p_ip    TEXT
) RETURNS TABLE (
  allowed             BOOLEAN,
  code                TEXT,
  retry_after_seconds INTEGER
) LANGUAGE plpgsql AS $$
DECLARE
  v_now   TIMESTAMPTZ := NOW();
  v_count INTEGER;
  v_start TIMESTAMPTZ;
  v_ip    TEXT := COALESCE(NULLIF(TRIM(p_ip), ''), 'unknown');
BEGIN
  -- 1. Per-email cooldown: 1 / 60s
  SELECT * INTO v_count, v_start FROM otp_rl_touch('email_cd:' || p_email, 60, v_now);
  IF v_count > 1 THEN
    RETURN QUERY SELECT false, 'EMAIL_COOLDOWN',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '60 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 2. Per-email window: 5 / 30 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('email_win:' || p_email, 1800, v_now);
  IF v_count > 5 THEN
    RETURN QUERY SELECT false, 'EMAIL_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '1800 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 3. Per-IP short window: 20 / 10 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('ip_short:' || v_ip, 600, v_now);
  IF v_count > 20 THEN
    RETURN QUERY SELECT false, 'IP_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '600 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 4. Per-IP long window: 60 / 60 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('ip_long:' || v_ip, 3600, v_now);
  IF v_count > 60 THEN
    RETURN QUERY SELECT false, 'IP_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '3600 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  RETURN QUERY SELECT true, NULL::TEXT, 0;
END;
$$;

REVOKE ALL ON FUNCTION check_and_touch_otp_rate_limit(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION check_and_touch_otp_rate_limit(TEXT, TEXT) TO service_role;
