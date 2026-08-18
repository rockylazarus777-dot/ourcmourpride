/**
 * Razorpay webhook — the authoritative, server-to-server source of truth
 * for payment status. Also acts as an idempotent fallback in case a
 * participant closes their browser after paying but before the client's
 * call to /api/marathon/payment/verify completes.
 *
 * Configure in Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://<your-domain>/api/razorpay/webhook
 *   Secret: same value as RAZORPAY_WEBHOOK_SECRET
 *   Events: payment.captured, payment.failed, order.paid (Order/Checkout flow)
 *           payment_link.paid, payment_link.cancelled, payment_link.expired
 *           (Payment Link flow — additive, see lib/razorpay/paymentLink.ts)
 *
 * Security: the raw request body is read and its signature verified
 * BEFORE any JSON parsing happens. Nothing here ever trusts a payment
 * status/amount asserted by the client — only Razorpay's HMAC-signed
 * payload (verified with RAZORPAY_WEBHOOK_SECRET) is treated as truth.
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay/client";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { finalizePaidRegistration, markPaymentFailed, markPaymentFailedByPaymentLink } from "@/lib/marathon/finalize";

interface RazorpayWebhookPayload {
  event: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        error_description?: string;
      };
    };
    order?: {
      entity?: {
        id?: string;
      };
    };
    payment_link?: {
      entity?: {
        id?: string;
        reference_id?: string;
        amount?: number;
        amount_paid?: number;
        currency?: string;
      };
    };
  };
}

export async function POST(req: NextRequest) {
  // 1. Raw body first — required for signature verification. Never call
  //    req.json() before this, since that would consume/reserialize the
  //    body and could desync it from what Razorpay actually signed.
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  // 2. Reject anything without a valid signature before doing anything else.
  //    Verification itself is wrapped defensively — a misconfigured or
  //    missing RAZORPAY_WEBHOOK_SECRET must fail closed (400), never crash
  //    the route with an unhandled 500.
  let signatureValid = false;
  try {
    signatureValid = !!signature && verifyWebhookSignature(rawBody, signature);
  } catch (err) {
    console.error("[razorpay:webhook] signature verification error:", err instanceof Error ? err.message : "unknown error");
  }

  if (!signatureValid) {
    console.warn("[razorpay:webhook] rejected — missing or invalid signature");
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  // 3. Only parse JSON once the signature is confirmed authentic.
  let event: RazorpayWebhookPayload;
  try {
    event = JSON.parse(rawBody);
  } catch {
    console.warn("[razorpay:webhook] rejected — malformed JSON body despite valid signature");
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const eventType = event.event;
  console.log(`[razorpay:webhook] received event="${eventType}"`);

  try {
    switch (eventType) {
      case "payment.captured":
      case "order.paid": {
        const payment = event.payload?.payment?.entity;
        const orderId = payment?.order_id ?? event.payload?.order?.entity?.id;
        const paymentId = payment?.id;

        if (!orderId || !paymentId) {
          console.warn(`[razorpay:webhook] event="${eventType}" missing order/payment id, ignoring`);
          return NextResponse.json({ received: true });
        }

        // finalizePaidRegistration keys off our internal draft id, not
        // Razorpay's order id, so look the row up first.
        const supabase = createSupabaseAdminClient();
        const { data: draft } = await supabase
          .from("registrations")
          .select("id")
          .eq("razorpay_order_id", orderId)
          .maybeSingle();

        if (!draft) {
          console.warn(`[razorpay:webhook] event="${eventType}" order_id="${orderId}" — no matching registration`);
          return NextResponse.json({ received: true });
        }

        const result = await finalizePaidRegistration(draft.id, paymentId, orderId, "webhook-verified");
        console.log(
          `[razorpay:webhook] event="${eventType}" order_id="${orderId}" registration_id="${result.registrationId}"`
        );
        return NextResponse.json({ received: true });
      }

      case "payment.failed": {
        const payment = event.payload?.payment?.entity;
        const orderId = payment?.order_id;
        const paymentId = payment?.id ?? null;

        if (!orderId) {
          console.warn("[razorpay:webhook] payment.failed missing order_id, ignoring");
          return NextResponse.json({ received: true });
        }

        const { updated } = await markPaymentFailed(orderId, paymentId);
        console.log(`[razorpay:webhook] event="payment.failed" order_id="${orderId}" updated=${updated}`);
        return NextResponse.json({ received: true });
      }

      // ── Payment Link flow (additive — used while Checkout awaits
      //    live approval; the cases above for the Order/Checkout flow
      //    are untouched) ──────────────────────────────────────────
      case "payment_link.paid": {
        const paymentLink = event.payload?.payment_link?.entity;
        const payment = event.payload?.payment?.entity;
        const linkId = paymentLink?.id;
        const paymentId = payment?.id;

        if (!linkId || !paymentId) {
          console.warn(`[razorpay:webhook] event="${eventType}" missing payment_link/payment id, ignoring`);
          return NextResponse.json({ received: true });
        }

        const supabase = createSupabaseAdminClient();
        const { data: draft } = await supabase
          .from("registrations")
          .select("id, payment_amount, payment_status, razorpay_payment_link_reference_id")
          .eq("razorpay_payment_link_id", linkId)
          .maybeSingle();

        if (!draft) {
          console.warn(`[razorpay:webhook] event="${eventType}" payment_link_id="${linkId}" — no matching registration`);
          return NextResponse.json({ received: true });
        }

        // Defense-in-depth: the reference_id we stored at link-creation
        // time must match what Razorpay reports back for this link.
        if (
          paymentLink?.reference_id &&
          draft.razorpay_payment_link_reference_id &&
          paymentLink.reference_id !== draft.razorpay_payment_link_reference_id
        ) {
          console.warn(`[razorpay:webhook] event="${eventType}" reference_id mismatch for payment_link_id="${linkId}", ignoring`);
          return NextResponse.json({ received: true });
        }

        const currency = paymentLink?.currency ?? "INR";
        if (currency !== "INR") {
          console.warn(`[razorpay:webhook] event="${eventType}" unexpected currency="${currency}" for payment_link_id="${linkId}", ignoring`);
          return NextResponse.json({ received: true });
        }

        const expectedPaise = Math.round(Number(draft.payment_amount) * 100);
        const paidPaise = paymentLink?.amount_paid ?? paymentLink?.amount;
        if (paidPaise !== expectedPaise) {
          console.warn(
            `[razorpay:webhook] event="${eventType}" amount mismatch for payment_link_id="${linkId}" — expected=${expectedPaise} got=${paidPaise}, ignoring`
          );
          return NextResponse.json({ received: true });
        }

        if (draft.payment_status === "paid") {
          // Already finalized — idempotent no-op on a retried/duplicate webhook.
          return NextResponse.json({ received: true });
        }

        // Razorpay auto-creates an underlying order for every Payment
        // Link payment; reuse that id for the razorpay_order_id column
        // finalizePaidRegistration already writes, falling back to the
        // link id if it's ever absent from the payload.
        const underlyingOrderId = payment?.order_id ?? linkId;
        const result = await finalizePaidRegistration(draft.id, paymentId, underlyingOrderId, "payment-link-webhook-verified");
        console.log(
          `[razorpay:webhook] event="${eventType}" payment_link_id="${linkId}" registration_id="${result.registrationId}"`
        );
        return NextResponse.json({ received: true });
      }

      case "payment_link.cancelled":
      case "payment_link.expired": {
        const linkId = event.payload?.payment_link?.entity?.id;
        if (!linkId) {
          console.warn(`[razorpay:webhook] event="${eventType}" missing payment_link id, ignoring`);
          return NextResponse.json({ received: true });
        }

        const { updated } = await markPaymentFailedByPaymentLink(linkId);
        console.log(`[razorpay:webhook] event="${eventType}" payment_link_id="${linkId}" updated=${updated}`);
        return NextResponse.json({ received: true });
      }

      default:
        // Unhandled event type — acknowledge so Razorpay doesn't retry.
        return NextResponse.json({ received: true });
    }
  } catch (err) {
    // Never leak internals; log a safe summary server-side only.
    console.error(`[razorpay:webhook] processing error for event="${eventType}"`, err instanceof Error ? err.message : err);
    // Returning 500 lets Razorpay retry — appropriate for a transient
    // failure (e.g. a momentary DB/storage/email hiccup), and finalize
    // is idempotent so a retry is always safe.
    return NextResponse.json({ error: "Processing failed." }, { status: 500 });
  }
}
