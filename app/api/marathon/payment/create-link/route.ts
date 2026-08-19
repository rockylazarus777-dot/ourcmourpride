/**
 * Hands back the static, Dashboard-created Razorpay Payment Link URL
 * for a pending registration's participant type. Never calls the
 * Razorpay API — the two links (Physical / E-Participant) are created
 * once by hand in the Razorpay Dashboard and referenced only by
 * ID/URL from the environment (see lib/razorpay/paymentLinkConfig.ts).
 *
 * Gated by the signed statusToken issued at /api/marathon/register —
 * a bare draftId is never enough to read someone else's registration.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { verifyRegistrationStatusToken } from "@/lib/admin/session";
import { getPaymentLinkConfig } from "@/lib/razorpay/paymentLinkConfig";
import type { CreatePaymentLinkRequest, CreatePaymentLinkResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Partial<CreatePaymentLinkRequest> | null;
  const draftId = Number(body?.draftId);
  const statusToken = body?.statusToken;

  if (!Number.isFinite(draftId) || draftId <= 0 || typeof statusToken !== "string" || !statusToken) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyRegistrationStatusToken(statusToken, draftId)) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "This registration session has expired. Please start again." },
      { status: 401 }
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data: draft } = await supabase
    .from("registrations")
    .select("id, participant_type, payment_status")
    .eq("id", draftId)
    .maybeSingle();

  if (!draft) {
    return NextResponse.json<ApiErrorResponse>({ error: "Registration not found." }, { status: 404 });
  }
  if (draft.payment_status === "paid") {
    return NextResponse.json<ApiErrorResponse>({ error: "This registration has already been paid for." }, { status: 409 });
  }

  const link = getPaymentLinkConfig(draft.participant_type);
  if (!link) {
    console.error(
      `[marathon:payment/create-link] missing Payment Link env config for participant_type="${draft.participant_type}"`
    );
    return NextResponse.json<ApiErrorResponse>(
      { error: "Payment is temporarily unavailable. Please try again shortly." },
      { status: 503 }
    );
  }

  return NextResponse.json<CreatePaymentLinkResponse>({ shortUrl: link.url });
}
