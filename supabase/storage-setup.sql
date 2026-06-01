-- ============================================================
-- Supabase Storage: Mega Pink Marathon participant photos
--
-- Run this in the Supabase SQL Editor after creating the
-- marathon_registrations table.
--
-- Bucket:  marathon-registrations   (private)
-- Path:    photos/<registrationId>.<ext>
--
-- IMPORTANT: This bucket is private. Photos are never accessible
-- via public URLs. The API route must generate a signed URL
-- (createSignedUrl) if a photo needs to be viewed.
-- ============================================================


-- ── Create bucket ─────────────────────────────────────────────

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'marathon-registrations',
  'marathon-registrations',
  FALSE,                                          -- private bucket
  5242880,                                        -- 5 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;


-- ── Storage RLS policies ──────────────────────────────────────

-- Service role can upload photos (used from the API route)
CREATE POLICY "service_role_upload_photos"
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'marathon-registrations');

-- Service role can read photos (for signed URL generation)
CREATE POLICY "service_role_read_photos"
  ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'marathon-registrations');

-- Service role can delete photos (admin operations)
CREATE POLICY "service_role_delete_photos"
  ON storage.objects
  FOR DELETE
  TO service_role
  USING (bucket_id = 'marathon-registrations');

-- No public access — anon and authenticated roles cannot read or write.


-- ── Naming convention ─────────────────────────────────────────
--
-- Upload path format:
--   photos/{registrationId}.{ext}
--
-- Example:
--   photos/MPM-LH3K2A-XY4Z.jpg
--
-- The photo_url column in marathon_registrations stores this
-- storage path (NOT a full URL). To serve it:
--
--   const { data } = await supabase.storage
--     .from('marathon-registrations')
--     .createSignedUrl(registration.photo_url, 3600);
--
--   // data.signedUrl is valid for 1 hour
