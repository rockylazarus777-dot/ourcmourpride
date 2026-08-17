import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getRazorpayClient } from "@/lib/razorpay/client";
import type { CreateOrderResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const draftId = Number(body?.draftId);

  if (!Number.isFinite(draftId) || draftId <= 0) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid registration." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: draft } = await supabase
    .from("registrations")
    .select("id, payment_amount, payment_status")
    .eq("id", draftId)
    .maybeSingle();

  if (!draft) {
    return NextResponse.json<ApiErrorResponse>({ error: "Registration not found." }, { status: 404 });
  }
  if (draft.payment_status === "paid") {
    return NextResponse.json<ApiErrorResponse>({ error: "This registration has already been paid for." }, { status: 409 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!keyId) {
    return NextResponse.json<ApiErrorResponse>({ error: "Payments are not configured yet." }, { status: 503 });
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Math.round(draft.payment_amount * 100), // paise
      currency: "INR",
      receipt: `mm2026-${draft.id}`,
      notes: { registrationDraftId: String(draft.id) },
    });

    await supabase
      .from("registrations")
      .update({ razorpay_order_id: order.id })
      .eq("id", draft.id);

    return NextResponse.json<CreateOrderResponse>({
      orderId: order.id,
      amount: draft.payment_amount,
      currency: "INR",
      keyId,
    });
  } catch {
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to create payment order. Please try again." }, { status: 502 });
  }
}
