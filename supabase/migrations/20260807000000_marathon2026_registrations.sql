-- ============================================================
-- Migration: 20260807000000_marathon2026_registrations
-- Description: Our CM Our Pride – Mega Marathon 2026 registration
--              system. Fully independent from the older
--              `marathon_registrations` table (Mega Pink Marathon) —
--              that table and its migration are left untouched.
-- ============================================================


-- ── Enums ────────────────────────────────────────────────────

CREATE TYPE mm2026_participant_type AS ENUM (
  'physical',
  'e_participant'
);

CREATE TYPE mm2026_category AS ENUM (
  'student',
  'public',
  'government_employee'
);

CREATE TYPE mm2026_tshirt_size AS ENUM (
  'XS', 'S', 'M', 'L', 'XL', 'XXL'
);

CREATE TYPE mm2026_payment_status AS ENUM (
  'pending',
  'paid',
  'failed'
);

CREATE TYPE mm2026_otp_purpose AS ENUM (
  'marathon_registration'
);


-- ── Sequential ID generators ─────────────────────────────────
-- Assigned atomically at confirmed-payment time so concurrent
-- checkouts never collide or skip a number.

CREATE SEQUENCE mm2026_registration_id_seq START 1;
CREATE SEQUENCE mm2026_certificate_id_seq START 1;

CREATE OR REPLACE FUNCTION next_registration_id() RETURNS text
LANGUAGE sql
AS $$
  SELECT 'OCOP-MM-2026-' || LPAD(nextval('mm2026_registration_id_seq')::text, 6, '0');
$$;

CREATE OR REPLACE FUNCTION next_certificate_id() RETURNS text
LANGUAGE sql
AS $$
  SELECT 'GIMM2026-' || LPAD(nextval('mm2026_certificate_id_seq')::text, 6, '0');
$$;


-- ── Table: registrations ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS registrations (
  id                          BIGSERIAL               PRIMARY KEY,

  -- Assigned only once payment is confirmed
  registration_id             TEXT                     UNIQUE,

  participant_type            mm2026_participant_type  NOT NULL,

  -- Personal information
  full_name                   TEXT                     NOT NULL,
  age                         SMALLINT                 NOT NULL CHECK (age BETWEEN 5 AND 100),
  gender                      TEXT                     NOT NULL,
  blood_group                 TEXT                     NOT NULL,

  -- Contact information
  phone                       TEXT                     NOT NULL CHECK (phone ~ '^[6-9][0-9]{9}$'),
  email                       TEXT                     NOT NULL,
  city                        TEXT                     NOT NULL,

  -- Category
  category                    mm2026_category          NOT NULL,

  -- Additional information
  tshirt_size                 mm2026_tshirt_size        NOT NULL,

  -- Emergency contact
  emergency_contact_name      TEXT                     NOT NULL,
  emergency_contact_phone     TEXT                     NOT NULL CHECK (emergency_contact_phone ~ '^[6-9][0-9]{9}$'),

  -- Pledge
  pledge_accepted             BOOLEAN                  NOT NULL DEFAULT FALSE,

  -- Email OTP verification
  otp_verified                BOOLEAN                  NOT NULL DEFAULT FALSE,

  -- Payment (Razorpay)
  payment_amount               NUMERIC(10, 2)          NOT NULL,
  payment_status                mm2026_payment_status   NOT NULL DEFAULT 'pending',
  payment_id                    TEXT,
  razorpay_order_id             TEXT,
  razorpay_signature            TEXT,

  -- Certificate (e-participants)
  certificate_id               TEXT                     UNIQUE,
  certificate_url              TEXT,

  -- QR + entry pass (physical participants)
  qr_code_url                  TEXT,
  entry_pass_url                TEXT,

  -- Check-in
  check_in_status               BOOLEAN                 NOT NULL DEFAULT FALSE,
  check_in_time                  TIMESTAMPTZ,

  -- Audit
  created_at                    TIMESTAMPTZ             NOT NULL DEFAULT NOW(),
  updated_at                    TIMESTAMPTZ             NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reg2026_email ON registrations (email);
CREATE INDEX idx_reg2026_phone ON registrations (phone);
CREATE INDEX idx_reg2026_registration_id ON registrations (registration_id);
CREATE INDEX idx_reg2026_certificate_id ON registrations (certificate_id);
CREATE INDEX idx_reg2026_created_at ON registrations (created_at DESC);
CREATE INDEX idx_reg2026_participant_type ON registrations (participant_type);
CREATE INDEX idx_reg2026_payment_status ON registrations (payment_status);

CREATE OR REPLACE FUNCTION mm2026_set_updated_at() RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_reg2026_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION mm2026_set_updated_at();


-- ── Row Level Security ────────────────────────────────────────
-- All access — including inserts — goes through the API using the
-- service_role admin client, which bypasses RLS. The server computes
-- payment_amount and validates every field; the client is never
-- trusted directly, unlike the older marathon_registrations table.

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access"
  ON registrations
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);


-- ── Table: otp_verifications ──────────────────────────────────

CREATE TABLE IF NOT EXISTS otp_verifications (
  id              BIGSERIAL           PRIMARY KEY,
  email           TEXT                NOT NULL,
  purpose         mm2026_otp_purpose  NOT NULL DEFAULT 'marathon_registration',
  otp_hash        TEXT                NOT NULL,
  attempts        SMALLINT            NOT NULL DEFAULT 0,
  verified        BOOLEAN             NOT NULL DEFAULT FALSE,
  expires_at      TIMESTAMPTZ         NOT NULL,
  last_sent_at    TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),

  UNIQUE (email, purpose)
);

ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "no_public_access"
  ON otp_verifications
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
