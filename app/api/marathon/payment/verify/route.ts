import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { verifyPaymentSignature } from "@/lib/razorpay/client";
import { finalizePaidRegistration } from "@/lib/marathon/finalize";
import type { VerifyPaymentResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const draftId = Number(body?.draftId);
  const razorpay_order_id = body?.razorpay_order_id;
  const razorpay_payment_id = body?.razorpay_payment_id;
  const razorpay_signature = body?.razorpay_signature;

  if (
    !Number.isFinite(draftId) ||
    typeof razorpay_order_id !== "string" ||
    typeof razorpay_payment_id !== "string" ||
    typeof razorpay_signature !== "string"
  ) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid payment verification request." }, { status: 400 });
  }

  let signatureValid = false;
  try {
    signatureValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  } catch (err) {
    console.error("[marathon:payment/verify] signature verification error:", err instanceof Error ? err.message : "unknown error");
  }

  if (!signatureValid) {
    return NextResponse.json<ApiErrorResponse>({ error: "Payment signature verification failed." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: draft } = await supabase
    .from("registrations")
    .select("id, razorpay_order_id")
    .eq("id", draftId)
    .maybeSingle();

  if (!draft || draft.razorpay_order_id !== razorpay_order_id) {
    return NextResponse.json<ApiErrorResponse>({ error: "Order mismatch." }, { status: 400 });
  }

  try {
    const result = await finalizePaidRegistration(
      draftId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );
    return NextResponse.json<VerifyPaymentResponse>({
      registrationId: result.registrationId,
      certificateId: result.certificateId,
      paymentId: result.paymentId,
      amount: result.amount,
      paymentStatus: "paid",
    });
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Payment was verified but finalizing your registration failed. Our team will follow up by email." },
      { status: 500 }
    );
  }
}
