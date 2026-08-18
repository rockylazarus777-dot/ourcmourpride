"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Loader2, ShieldCheck } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import StepProgress from "./StepProgress";
import {
  MARATHON_EVENT_NAME,
  PARTICIPANT_FEES,
  PARTICIPANT_LABELS,
} from "@/types/marathon";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
  CreatePaymentLinkRequest,
  CreatePaymentLinkResponse,
  ApiErrorResponse,
} from "@/types/marathon";

/**
 * "link" (default): redirect to a unique Razorpay Payment Link — used
 * while Razorpay Checkout is awaiting live approval.
 * "checkout": the original Razorpay Checkout.js flow, kept fully
 * intact as a rollback — set NEXT_PUBLIC_MARATHON_PAYMENT_MODE=checkout
 * to switch back without a code change.
 */
type PaymentMode = "link" | "checkout";
const PAYMENT_MODE: PaymentMode =
  process.env.NEXT_PUBLIC_MARATHON_PAYMENT_MODE === "checkout" ? "checkout" : "link";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: "payment.failed", handler: (response: RazorpayFailureEvent) => void) => void;
    };
  }
}

interface RazorpayFailureEvent {
  error: {
    code: string;
    description: string;
    reason?: string;
  };
}

export default function PaymentView() {
  const router = useRouter();
  const { draft, updateDraft, hydrated } = useMarathonRegistration();
  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    if (!draft.draftId || !draft.participantType) {
      router.replace("/events/marathon/register");
    }
  }, [hydrated, draft.draftId, draft.participantType, router]);

  if (!draft.draftId || !draft.participantType) return null;

  const amount = PARTICIPANT_FEES[draft.participantType];

  // New default flow: create a unique Payment Link server-side and
  // redirect the browser to Razorpay's hosted payment page. No
  // Razorpay credentials ever reach the client.
  const payWithLink = async () => {
    setError("");
    const draftId = draft.draftId;
    if (!draftId) return;
    if (!draft.statusToken) {
      setError("Your registration session has expired. Please start again from the Details step.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/marathon/payment/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId,
          statusToken: draft.statusToken,
        } satisfies CreatePaymentLinkRequest),
      });
      const data = (await res.json()) as CreatePaymentLinkResponse | ApiErrorResponse;

      if (!res.ok || !("shortUrl" in data)) {
        setError("error" in data ? data.error : "Failed to start payment.");
        setLoading(false);
        return;
      }

      window.location.href = data.shortUrl;
    } catch {
      setError("Failed to start payment. Please try again.");
      setLoading(false);
    }
  };

  // Original Razorpay Checkout.js flow — kept fully intact as a
  // rollback fallback (NEXT_PUBLIC_MARATHON_PAYMENT_MODE=checkout).
  const payWithCheckout = async () => {
    setError("");
    const draftId = draft.draftId;
    if (!draftId) return;
    if (!scriptReady || typeof window.Razorpay === "undefined") {
      setError("Payment gateway is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);
    try {
      const orderRes = await fetch("/api/marathon/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId } satisfies CreateOrderRequest),
      });
      const orderData = (await orderRes.json()) as CreateOrderResponse | ApiErrorResponse;

      if (!orderRes.ok || !("orderId" in orderData)) {
        setError("error" in orderData ? orderData.error : "Failed to start payment.");
        setLoading(false);
        return;
      }

      updateDraft({ razorpayOrderId: orderData.orderId });

      // Tracks whether the checkout reached a definite outcome (success or
      // failure) before the modal closed, so `ondismiss` can tell an actual
      // user-initiated cancellation apart from a completed attempt.
      let settled = false;

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: Math.round(orderData.amount * 100),
        currency: orderData.currency,
        name: "Our CM Our Pride",
        description: `${MARATHON_EVENT_NAME} — ${PARTICIPANT_LABELS[draft.participantType!]}`,
        order_id: orderData.orderId,
        prefill: {
          name: draft.fullName,
          email: draft.email,
          contact: draft.phone,
        },
        theme: { color: "#7A1F2B" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          settled = true;
          try {
            const verifyRes = await fetch("/api/marathon/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                draftId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              } satisfies VerifyPaymentRequest),
            });
            const verifyData = (await verifyRes.json()) as VerifyPaymentResponse | ApiErrorResponse;

            if (!verifyRes.ok || !("registrationId" in verifyData)) {
              setError("error" in verifyData ? verifyData.error : "Payment verification failed.");
              setLoading(false);
              return;
            }

            updateDraft({
              registrationId: verifyData.registrationId,
              certificateId: verifyData.certificateId,
              paymentId: verifyData.paymentId,
              paymentAmount: verifyData.amount,
            });
            router.push("/events/marathon/success");
          } catch {
            setError(
              "We received your payment but could not confirm it automatically. This usually resolves within a few minutes — if not, please contact support with your payment ID."
            );
            setLoading(false);
          }
        },
        modal: {
          // Fires when the user closes the checkout modal. If neither the
          // success handler nor the payment.failed listener below has run,
          // this was a genuine cancellation, not a failed/completed attempt.
          ondismiss: () => {
            setLoading(false);
            if (!settled) {
              setError("Payment was cancelled. You can try again whenever you're ready.");
            }
          },
        },
      });

      // Razorpay Checkout emits this separately from `handler` when a
      // payment attempt is declined (e.g. insufficient funds, bank
      // decline) — surface a specific message instead of leaving the user
      // on a silently reset button.
      razorpay.on("payment.failed", (response) => {
        settled = true;
        setLoading(false);
        setError(response.error?.description || "Payment failed. Please try again or use a different payment method.");
      });

      razorpay.open();
    } catch {
      setError("Failed to start payment. Please try again.");
      setLoading(false);
    }
  };

  const payNow = PAYMENT_MODE === "checkout" ? payWithCheckout : payWithLink;

  return (
    <>
      {PAYMENT_MODE === "checkout" && (
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
          onLoad={() => setScriptReady(true)}
        />
      )}
      <StepProgress current={5} />
      <section className="container-max py-10 sm:py-14 max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={24} className="text-primary" />
          </div>
          <h1 className="font-poppins font-black text-2xl text-navy mb-1.5">Complete Payment</h1>
          <p className="font-inter text-navy/55 text-sm">Secure payment powered by Razorpay</p>
        </div>

        <div className="bg-white border border-navy/10 rounded-2xl shadow-card p-6 mb-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy/10">
            <span className="font-inter text-sm text-navy/60">Participant Type</span>
            <span className="font-poppins font-semibold text-sm text-navy">
              {PARTICIPANT_LABELS[draft.participantType]}
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy/10">
            <span className="font-inter text-sm text-navy/60">Participant</span>
            <span className="font-poppins font-semibold text-sm text-navy">{draft.fullName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-poppins font-bold text-sm text-navy uppercase tracking-wide">Total</span>
            <span className="font-poppins font-black text-2xl text-maroon-600">₹{amount}</span>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-red-500 text-sm font-inter text-center bg-red-50 px-4 py-3 rounded-xl mb-4">
            {error}
          </p>
        )}

        <p className="text-center font-inter text-xs text-navy/50 mb-4 leading-relaxed">
          By proceeding, I agree to the{" "}
          <Link href="/terms-and-conditions" target="_blank" className="text-primary hover:underline font-semibold">
            Terms &amp; Conditions
          </Link>{" "}
          and acknowledge the{" "}
          <Link href="/privacy-policy" target="_blank" className="text-primary hover:underline font-semibold">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/refund-cancellation-policy" target="_blank" className="text-primary hover:underline font-semibold">
            Cancellation &amp; Refund Policy
          </Link>
          .
        </p>

        <button
          type="button"
          onClick={payNow}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-70"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          {PAYMENT_MODE === "checkout" ? `Pay ₹${amount} Now` : "Continue to Payment"}
        </button>

        <p className="text-center font-inter text-xs text-navy/40 mt-4">
          UPI • Credit Card • Debit Card • Net Banking
        </p>

        <button
          type="button"
          onClick={() => router.push("/events/marathon/details")}
          disabled={loading}
          className="w-full mt-6 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300 disabled:opacity-50"
        >
          Back
        </button>
      </section>
    </>
  );
}
