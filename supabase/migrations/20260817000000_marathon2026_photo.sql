-- ============================================================
-- Migration: 20260817000000_marathon2026_photo
-- Description: Adds an optional participant passport-size photo
--              reference to the Mega Marathon 2026 `registrations`
--              table. The photo file itself lives in Google Drive
--              (server-side OAuth upload, outside Supabase) — only
--              the Drive file id and a view link are stored here.
-- ============================================================

ALTER TABLE registrations
  ADD COLUMN photo_drive_file_id TEXT,
  ADD COLUMN photo_drive_url TEXT;
