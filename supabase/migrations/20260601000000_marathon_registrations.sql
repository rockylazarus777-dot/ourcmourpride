-- ============================================================
-- Migration: 20260601000000_marathon_registrations
-- Description: Create Mega Pink Marathon registration table
--              with enums, constraints, indexes, and RLS.
-- ============================================================


-- ── Enums ────────────────────────────────────────────────────

CREATE TYPE age_category AS ENUM (
  'below_18',
  'above_18'
);

CREATE TYPE registration_prefix AS ENUM (
  'Mr.',
  'Mrs.',
  'Ms.',
  'Others'
);


-- ── Table ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS marathon_registrations (
  -- Primary key
  id                BIGSERIAL         PRIMARY KEY,

  -- Registration identity
  registration_id   TEXT              NOT NULL UNIQUE,  -- MPM-<ts>-<rand>
  event_name        TEXT              NOT NULL
                                      DEFAULT 'Mega Pink Marathon',

  -- Participant details
  age_category      age_category      NOT NULL,
  prefix            registration_prefix NOT NULL,
  full_name         TEXT              NOT NULL,
  gender            TEXT              NOT NULL,
  date_of_birth     DATE              NOT NULL,
  phone             TEXT              NOT NULL,
  email             TEXT              NOT NULL,
  pin_code          TEXT              NOT NULL,

  -- Optional photo (Supabase Storage path, e.g. "photos/<registrationId>.jpg")
  photo_url         TEXT,

  -- Pledge
  pledge_accepted   BOOLEAN           NOT NULL DEFAULT TRUE,

  -- Guardian (required only when age_category = 'below_18')
  guardian_name     TEXT,
  guardian_mobile   TEXT,
  guardian_consent  BOOLEAN,

  -- Audit
  created_at        TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);


-- ── Column constraints ────────────────────────────────────────

ALTER TABLE marathon_registrations
  ADD CONSTRAINT phone_format
    CHECK (phone ~ '^[6-9][0-9]{9}$'),
  ADD CONSTRAINT guardian_mobile_format
    CHECK (guardian_mobile IS NULL OR guardian_mobile ~ '^[6-9][0-9]{9}$'),
  ADD CONSTRAINT pin_code_format
    CHECK (pin_code ~ '^\d{6}$'),
  ADD CONSTRAINT pledge_must_be_accepted
    CHECK (pledge_accepted = TRUE),
  ADD CONSTRAINT guardian_required_for_minors
    CHECK (
      age_category = 'above_18'
      OR (
        age_category = 'below_18'
        AND guardian_name   IS NOT NULL
        AND guardian_mobile IS NOT NULL
        AND guardian_consent = TRUE
      )
    );


-- ── Indexes ───────────────────────────────────────────────────

-- Used by admin lookups
CREATE INDEX idx_marathon_reg_email
  ON marathon_registrations (email);

CREATE INDEX idx_marathon_reg_phone
  ON marathon_registrations (phone);

-- Used for dashboard sorting
CREATE INDEX idx_marathon_reg_created_at
  ON marathon_registrations (created_at DESC);

CREATE INDEX idx_marathon_reg_age_category
  ON marathon_registrations (age_category);


-- ── Row Level Security ────────────────────────────────────────

ALTER TABLE marathon_registrations ENABLE ROW LEVEL SECURITY;

-- Anyone (anonymous or authenticated) may INSERT a new registration.
-- The API route validates all fields before inserting, so this is safe.
CREATE POLICY "public_insert_registrations"
  ON marathon_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Nobody (except service_role which bypasses RLS) may SELECT.
-- Admin reads must go through the admin client using the service_role key.
CREATE POLICY "no_public_select"
  ON marathon_registrations
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- No public UPDATE or DELETE — all mutations must go through service_role.
