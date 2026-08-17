/**
 * Uploads generated marathon assets (QR PNGs, entry-pass PDFs,
 * certificate PDFs) to the public `marathon-2026-assets` bucket.
 * Server-only — uses the service_role admin client.
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const BUCKET = "marathon-2026-assets";

export async function uploadMarathonAsset(
  path: string,
  data: Buffer | Uint8Array,
  contentType: "image/png" | "application/pdf"
): Promise<string> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.storage.from(BUCKET).upload(path, data, {
    contentType,
    upsert: true,
  });

  if (error) {
    throw new Error(`Failed to upload ${path} to ${BUCKET}: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return publicUrlData.publicUrl;
}
