-- ============================================================
-- Migration: 20260822010000_marathon2026_otp_rate_limit_tune
-- Description: Tunes check_and_touch_otp_rate_limit() thresholds to
--              match the confirmed production spec:
--                - per-email cooldown: 60s -> 30s
--                - per-IP short window: 20/10min -> 10/10min
--                - per-IP long window:  60/60min -> 30/60min
--              (per-email 30min/5 window is unchanged.)
--              No schema change — CREATE OR REPLACE only.
-- ============================================================

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
  -- 1. Per-email cooldown: 1 / 30s
  SELECT * INTO v_count, v_start FROM otp_rl_touch('email_cd:' || p_email, 30, v_now);
  IF v_count > 1 THEN
    RETURN QUERY SELECT false, 'EMAIL_COOLDOWN',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '30 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 2. Per-email window: 5 / 30 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('email_win:' || p_email, 1800, v_now);
  IF v_count > 5 THEN
    RETURN QUERY SELECT false, 'EMAIL_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '1800 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 3. Per-IP short window: 10 / 10 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('ip_short:' || v_ip, 600, v_now);
  IF v_count > 10 THEN
    RETURN QUERY SELECT false, 'IP_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '600 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  -- 4. Per-IP long window: 30 / 60 min
  SELECT * INTO v_count, v_start FROM otp_rl_touch('ip_long:' || v_ip, 3600, v_now);
  IF v_count > 30 THEN
    RETURN QUERY SELECT false, 'IP_LIMIT',
      GREATEST(1, CEIL(EXTRACT(EPOCH FROM (v_start + INTERVAL '3600 seconds' - v_now))))::INTEGER;
    RETURN;
  END IF;

  RETURN QUERY SELECT true, NULL::TEXT, 0;
END;
$$;

REVOKE ALL ON FUNCTION check_and_touch_otp_rate_limit(TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION check_and_touch_otp_rate_limit(TEXT, TEXT) TO service_role;
