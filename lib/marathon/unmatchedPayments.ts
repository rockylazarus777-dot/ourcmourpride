/**
 * Audit trail for genuine Razorpay Payment Link payments that couldn't
 * be cleanly matched to a pending registration (wrong payer email,
 * wrong amount, an unrecognized Payment Link id, or an ambiguous
 * multi-match) — so a real payment is never silently lost. This never
 * marks anything paid; it exists purely for admin reconciliation.
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { ParticipantType } from "@/types/marathon";

export interface UnmatchedPaymentInput {
  paymentId: string;
  linkId: string;
  payerEmail: string | null;
  payerPhone: string | null;
  amountPaise: number | null;
  currency: string;
  participantType: ParticipantType | null;
  webhookEvent: string;
  notes: string;
}

export async function recordUnmatchedPayment(input: UnmatchedPaymentInput): Promise<void> {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("unmatched_payments").insert({
    razorpay_payment_id: input.paymentId,
    payment_link_id: input.linkId,
    payer_email: input.payerEmail,
    payer_phone: input.payerPhone,
    amount: input.amountPaise != null ? input.amountPaise / 100 : null,
    currency: input.currency,
    participant_type: input.participantType,
    webhook_event: input.webhookEvent,
    notes: input.notes,
  });

  // Unique constraint on razorpay_payment_id makes a retried webhook for
  // the same payment a safe no-op instead of a duplicate audit row.
  if (error && error.code !== "23505") {
    console.error("[unmatched-payments] insert failed:", error.message);
  }
}
