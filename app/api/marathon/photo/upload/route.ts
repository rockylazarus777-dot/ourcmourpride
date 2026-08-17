/**
 * Uploads an optional participant passport-photo to Google Drive and
 * attaches the resulting file reference to a draft `registrations` row.
 *
 * Called from the Details step, after /api/marathon/register has
 * already created the (payment_status = 'pending') draft row — this
 * route only ever updates that existing row, it never creates one, so
 * a failed or skipped photo upload can't leave a registration half-made.
 *
 * Guarded against touching an already-paid row so a stale/replayed
 * request can never mutate a finalized registration.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validatePhotoFile } from "@/lib/marathon/validation";
import { uploadPhotoToDrive, deleteDrivePhoto } from "@/lib/google/drive";
import type { ApiErrorResponse, PhotoUploadResponse } from "@/types/marathon";

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const draftId = Number(form?.get("draftId"));
  const photo = form?.get("photo");

  if (!Number.isFinite(draftId) || draftId <= 0) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid registration." }, { status: 400 });
  }
  if (!(photo instanceof File)) {
    return NextResponse.json<ApiErrorResponse>({ error: "No photo file provided." }, { status: 400 });
  }

  const validationError = validatePhotoFile(photo);
  if (validationError) {
    return NextResponse.json<ApiErrorResponse>({ error: validationError }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: draft } = await supabase
    .from("registrations")
    .select("id, payment_status, photo_drive_file_id")
    .eq("id", draftId)
    .maybeSingle();

  if (!draft) {
    return NextResponse.json<ApiErrorResponse>({ error: "Registration not found." }, { status: 404 });
  }
  if (draft.payment_status === "paid") {
    return NextResponse.json<ApiErrorResponse>({ error: "This registration is already confirmed." }, { status: 409 });
  }

  try {
    const buffer = Buffer.from(await photo.arrayBuffer());
    const extension = EXTENSION_BY_MIME[photo.type] ?? "jpg";
    const filename = `mm2026-${draftId}.${extension}`;

    const result = await uploadPhotoToDrive(buffer, filename, photo.type);

    // Replacing a previously-uploaded photo — clean up the old Drive file
    // (best-effort; never blocks the response).
    if (draft.photo_drive_file_id) {
      await deleteDrivePhoto(draft.photo_drive_file_id);
    }

    const { error: updateError } = await supabase
      .from("registrations")
      .update({ photo_drive_file_id: result.fileId, photo_drive_url: result.webViewLink })
      .eq("id", draftId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json<PhotoUploadResponse>({
      photoDriveFileId: result.fileId,
      photoDriveUrl: result.webViewLink,
    });
  } catch (err) {
    console.error("[marathon:photo/upload] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json<ApiErrorResponse>(
      { error: "Failed to upload photo. Please try again, or continue without one." },
      { status: 502 }
    );
  }
}
