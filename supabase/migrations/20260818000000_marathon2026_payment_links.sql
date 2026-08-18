-- ============================================================
-- Migration: 20260818000000_marathon2026_payment_links
-- Description: Additive support for Razorpay Payment Links as a
--              temporary alternative to the Razorpay Order/Checkout
--              flow while the live Checkout integration awaits
--              Razorpay's approval. Purely additive and nullable —
--              existing rows, the Order/Checkout columns
--              (razorpay_order_id, razorpay_signature), and every
--              other existing column are entirely unaffected.
-- ============================================================

ALTER TABLE registrations
  ADD COLUMN razorpay_payment_link_id             TEXT UNIQUE,
  ADD COLUMN razorpay_payment_link_reference_id   TEXT UNIQUE,
  ADD COLUMN razorpay_payment_link_url            TEXT;

-- UNIQUE on a nullable column allows any number of NULLs (rows that
-- haven't used the Payment Link flow) while still guaranteeing one
-- Payment Link maps to exactly one registration — required so the
-- webhook can safely resolve "which draft does this payment belong to"
-- and so a payment can never be matched to the wrong registration.
