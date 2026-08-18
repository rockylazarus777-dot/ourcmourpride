/**
 * Razorpay Payment Links helper — server-only, additive alongside
 * lib/razorpay/client.ts (Order/Checkout). Used while the site's
 * Razorpay Checkout is awaiting live approval; Orders/Checkout stay
 * fully intact as a fallback.
 *
 * NEVER import this from a 'use client' component.
 */

import { getRazorpayClient } from "./client";

export interface CreatePaymentLinkParams {
  amountRupees: number;
  referenceId: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: Record<string, string>;
  callbackUrl: string;
}

export interface PaymentLinkResult {
  id: string;
  shortUrl: string;
  status: string;
}

export async function createRazorpayPaymentLink(params: CreatePaymentLinkParams): Promise<PaymentLinkResult> {
  const razorpay = getRazorpayClient();

  const link = await razorpay.paymentLink.create({
    amount: Math.round(params.amountRupees * 100), // paise
    currency: "INR",
    accept_partial: false,
    description: params.description,
    customer: {
      name: params.customerName,
      email: params.customerEmail,
      contact: params.customerPhone,
    },
    // We redirect the participant to the link ourselves right after
    // creating it — no need for Razorpay to also email/SMS it.
    notify: { sms: false, email: false },
    reminder_enable: false,
    reference_id: params.referenceId,
    notes: params.notes,
    callback_url: params.callbackUrl,
    callback_method: "get",
  });

  return { id: link.id, shortUrl: link.short_url, status: link.status };
}
