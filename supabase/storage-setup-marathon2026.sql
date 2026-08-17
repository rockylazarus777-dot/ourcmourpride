-- ============================================================
-- Supabase Storage: Mega Marathon 2026 generated assets
--
-- Run this in the Supabase SQL Editor after
-- 20260807000000_marathon2026_registrations.sql.
--
-- Bucket:  marathon-2026-assets   (PUBLIC — read-only for everyone)
-- Paths:
--   qr/{registrationId}.png
--   entry-passes/{registrationId}.pdf
--   certificates/{certificateId}.pdf
--
-- Unlike the older `marathon-registrations` photo bucket, this one
-- is public by design: QR codes, entry passes, and certificates are
-- meant to be viewed/downloaded directly (emailed links, the public
-- certificate verification page) and contain no sensitive PII beyond
-- a name — only writes are restricted to service_role.
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'marathon-2026-assets',
  'marathon-2026-assets',
  TRUE,
  10485760,                                        -- 10 MB max per file
  ARRAY['image/png', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read (bucket is public, but explicit SELECT policy is
-- still required for storage.objects under RLS).
CREATE POLICY "public_read_marathon2026_assets"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'marathon-2026-assets');

-- Only service_role (the admin API) can upload/overwrite/delete.
CREATE POLICY "service_role_write_marathon2026_assets"
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'marathon-2026-assets');

CREATE POLICY "service_role_update_marathon2026_assets"
  ON storage.objects
  FOR UPDATE
  TO service_role
  USING (bucket_id = 'marathon-2026-assets');

CREATE POLICY "service_role_delete_marathon2026_assets"
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'marathon-2026-assets');
