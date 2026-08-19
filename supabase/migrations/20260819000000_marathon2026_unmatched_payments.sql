-- ============================================================
-- Migration: 20260819000000_marathon2026_unmatched_payments
-- Description: Audit table for the static Razorpay Payment Link
--              flow (Dashboard-created, shared Physical/E-Participant
--              links — see lib/razorpay/paymentLinkConfig.ts). When a
--              payment_link.paid webhook can't be cleanly matched to
--              exactly one pending `registrations` row (wrong payer
--              email, wrong amount, an unrecognized Payment Link id,
--              or an ambiguous multi-match), it lands here instead of
--              being silently dropped, for manual admin reconciliation.
--              Purely additive — does not touch `registrations` or
--              any other existing table.
-- ============================================================

CREATE TYPE mm2026_reconciliation_status AS ENUM (
  'pending_review',
  'resolved',
  'ignored'
);

CREATE TABLE IF NOT EXISTS unmatched_payments (
  id                    BIGSERIAL                      PRIMARY KEY,

  -- Razorpay identifiers
  razorpay_payment_id   TEXT                            NOT NULL,
  payment_link_id       TEXT                            NOT NULL,

  -- Payer info as reported by Razorpay — used to help an admin
  -- manually match this payment to the right registration
  payer_email           TEXT,
  payer_phone           TEXT,

  -- Payment details
  amount                NUMERIC(10, 2),
  currency              TEXT                            NOT NULL DEFAULT 'INR',
  participant_type      mm2026_participant_type,

  -- Context
  webhook_event         TEXT                            NOT NULL,
  notes                 TEXT,

  -- Reconciliation workflow
  reconciliation_status mm2026_reconciliation_status     NOT NULL DEFAULT 'pending_review',

  created_at             TIMESTAMPTZ                    NOT NULL DEFAULT NOW(),

  -- A retried/duplicate webhook for the same payment must not create a
  -- second audit row.
  UNIQUE (razorpay_payment_id)
);

CREATE INDEX idx_unmatched_payments_status ON unmatched_payments (reconciliation_status);
CREATE INDEX idx_unmatched_payments_email ON unmatched_payments (payer_email);
CREATE INDEX idx_unmatched_payments_created_at ON unmatched_payments (created_at DESC);

-- ── Row Level Security ────────────────────────────────────────
-- Same posture as `registrations`: all access goes through the API
-- using the service_role admin client, which bypasses RLS.

ALTER TABLE unmatched_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access"
  ON unmatched_payments
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
