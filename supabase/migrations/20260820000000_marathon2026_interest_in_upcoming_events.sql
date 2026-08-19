-- ============================================================
-- Migration: 20260820000000_marathon2026_interest_in_upcoming_events
-- Description: Additive, optional registration question — whether a
--              participant is interested in future OUR CM OUR PRIDE
--              events. Nullable, no default, so leaving it unanswered
--              is valid. Purely additive: every existing row and
--              every existing registration/payment column is
--              untouched.
-- ============================================================

CREATE TYPE mm2026_interest_level AS ENUM (
  'yes',
  'maybe',
  'no'
);

ALTER TABLE registrations
  ADD COLUMN interested_in_upcoming_events mm2026_interest_level;
