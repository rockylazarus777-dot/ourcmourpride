-- ============================================================
-- Migration: 20260822020000_marathon2026_otp_attempt_lock
-- Description: Closes a race in OTP verification attempt-counting
--              found during load/concurrency testing: the previous
--              approach (SELECT attempts, then UPDATE ... WHERE
--              attempts = <the value just read>) is an optimistic
--              lock — under N truly simultaneous guesses, every
--              request reads the SAME stale `attempts` value before
--              any of them commit, so only a handful of the N
--              increments actually land. The OTP_MAX_ATTEMPTS gate
--              is a plain value comparison against that same stale
--              read, so concurrent guesses evade the cap entirely:
--              a burst of e.g. 1000 parallel wrong guesses all pass
--              the "attempts < 5" check before any counter update
--              is visible to the others.
--
--              This function fixes it with the same trick used for
--              the send-side limiter: fold "is a slot available" and
--              "consume it" into one UPDATE ... WHERE attempts <
--              max_attempts. Postgres's row lock on the UPDATE
--              serializes concurrent callers — each one only sees
--              the row after the previous writer's increment has
--              committed, so at most max_attempts callers can ever
--              successfully reserve a slot, regardless of how much
--              concurrency is thrown at it.
-- ============================================================

CREATE OR REPLACE FUNCTION reserve_otp_verification_attempt(
  p_email        TEXT,
  p_max_attempts INTEGER
) RETURNS TABLE (
  allowed      BOOLEAN,
  new_attempts INTEGER
) LANGUAGE plpgsql AS $$
DECLARE
  v_attempts INTEGER;
BEGIN
  UPDATE otp_verifications
  SET attempts = attempts + 1
  WHERE email = p_email
    AND purpose = 'marathon_registration'
    AND attempts < p_max_attempts
  RETURNING attempts INTO v_attempts;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::INTEGER;
    RETURN;
  END IF;

  RETURN QUERY SELECT true, v_attempts;
END;
$$;

REVOKE ALL ON FUNCTION reserve_otp_verification_attempt(TEXT, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION reserve_otp_verification_attempt(TEXT, INTEGER) TO service_role;
