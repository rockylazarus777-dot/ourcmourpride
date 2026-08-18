/**
 * Creates (or reuses) a unique Razorpay Payment Link for a pending
 * registration draft — additive alternative to
 * /api/marathon/payment/create-order while Razorpay Checkout is
 * awaiting live approval. The Order/Checkout route is untouched and
 * stays available as a fallback.
 *
 * Gated by the signed statusToken issued at /api/marathon/register —
 * a bare draftId is never enough to spawn a Payment Link for someone
 * else's registration.
 *
 * Idempotent: Payment Links created here never set expire_by, so once
 * a draft has a stored link it is simply reused — reloading the
 * payment page can't create duplicates.
 */

import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { verifyRegistrationStatusToken } from "@/lib/admin/session";
import { createRazorpayPaymentLink } from "@/lib/razorpay/paymentLink";
import { MARATHON_EVENT_NAME, PARTICIPANT_LABELS } from "@/types/marathon";
import type { CreatePaymentLinkRequest, CreatePaymentLinkResponse, ApiErrorResponse } from "@/types/marathon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourcmourpride.com";

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
    .select(
      "id, full_name, email, phone, participant_type, payment_amount, payment_status, razorpay_payment_link_id, razorpay_payment_link_url"
    )
    .eq("id", draftId)
    .maybeSingle();

  if (!draft) {
    return NextResponse.json<ApiErrorResponse>({ error: "Registration not found." }, { status: 404 });
  }
  if (draft.payment_status === "paid") {
    return NextResponse.json<ApiErrorResponse>({ error: "This registration has already been paid for." }, { status: 409 });
  }

  // Already has a live link for this draft — reuse it instead of
  // creating a second one.
  if (draft.razorpay_payment_link_id && draft.razorpay_payment_link_url) {
    return NextResponse.json<CreatePaymentLinkResponse>({ shortUrl: draft.razorpay_payment_link_url });
  }

  try {
    const referenceId = `mm2026-link-${draft.id}`;
    const link = await createRazorpayPaymentLink({
      amountRupees: Number(draft.payment_amount),
      referenceId,
      description: `${MARATHON_EVENT_NAME} — ${PARTICIPANT_LABELS[draft.participant_type]}`,
      customerName: draft.full_name,
      customerEmail: draft.email,
      customerPhone: draft.phone,
      notes: { draftId: String(draft.id), participantType: draft.participant_type },
      callbackUrl: `${SITE_URL}/events/marathon/success`,
    });

    await supabase
      .from("registrations")
      .update({
        razorpay_payment_link_id: link.id,
        razorpay_payment_link_reference_id: referenceId,
        razorpay_payment_link_url: link.shortUrl,
      })
      .eq("id", draft.id);

    return NextResponse.json<CreatePaymentLinkResponse>({ shortUrl: link.shortUrl });
  } catch (err) {
    console.error("[marathon:payment/create-link] failed:", err instanceof Error ? err.message : err);
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to create payment link. Please try again." }, { status: 502 });
  }
}
