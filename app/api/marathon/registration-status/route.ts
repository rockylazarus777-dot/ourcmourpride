/**
 * Server-truth payment status for the success page. Gated by the same
 * signed statusToken issued at registration time — knowing a draftId
 * alone is never enough to read another participant's status.
 *
 * Deliberately minimal response: no name/email/phone/address, no
 * payment identifiers or secrets — only what the success page needs
 * to decide what to render.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { verifyRegistrationStatusToken } from "@/lib/admin/session";
import type { RegistrationStatusRequest, RegistrationStatusResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<RegistrationStatusRequest> | null;
  const draftId = Number(body?.draftId);
  const statusToken = body?.statusToken;

  if (!Number.isFinite(draftId) || draftId <= 0 || typeof statusToken !== "string" || !statusToken) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyRegistrationStatusToken(statusToken, draftId)) {
    return NextResponse.json<ApiErrorResponse>({ error: "This registration session has expired." }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: row } = await supabase
    .from("registrations")
    .select("payment_status, registration_id, certificate_id")
    .eq("id", draftId)
    .maybeSingle();

  if (!row) {
    return NextResponse.json<ApiErrorResponse>({ error: "Registration not found." }, { status: 404 });
  }

  const paid = row.payment_status === "paid";
  return NextResponse.json<RegistrationStatusResponse>({
    paymentStatus: row.payment_status,
    registrationId: paid ? row.registration_id : null,
    certificateId: paid ? row.certificate_id : null,
  });
}
