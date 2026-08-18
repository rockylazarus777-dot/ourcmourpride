/**
 * Finalizes a paid registration: assigns registration_id (+certificate_id
 * for e-participants), generates QR/entry-pass/certificate PDFs, uploads
 * them, sends the confirmation email, and marks payment_status = 'paid'.
 *
 * Idempotent: called from both /api/marathon/payment/verify (client-driven)
 * and /api/razorpay/webhook (Razorpay-driven, for payment.captured and
 * order.paid) — if the row is already 'paid', it's a no-op.
 */

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { generateQrPngBuffer } from "./qr";
import { generateEntryPassPdf } from "./entryPass";
import { generateCertificatePdf } from "./certificate";
import { uploadMarathonAsset } from "./storage";
import { sendEmail } from "@/lib/email/send";
import {
  physicalConfirmationTemplate,
  eParticipantConfirmationTemplate,
} from "@/lib/email/templates";
import { MARATHON_EVENT_NAME, PARTICIPANT_LABELS } from "@/types/marathon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourcmourpride.com";

export interface FinalizeResult {
  registrationId: string;
  certificateId: string | null;
  paymentId: string;
  amount: number;
}

export async function finalizePaidRegistration(
  draftId: number,
  paymentId: string,
  razorpayOrderId: string,
  razorpaySignature: string
): Promise<FinalizeResult> {
  const supabase = createSupabaseAdminClient();

  const { data: row, error: fetchError } = await supabase
    .from("registrations")
    .select("*")
    .eq("id", draftId)
    .single();

  if (fetchError || !row) {
    throw new Error("Registration not found.");
  }

  // Already finalized — idempotent no-op (webhook may race the client call,
  // or Razorpay may send both payment.captured and order.paid for one payment).
  if (row.payment_status === "paid" && row.registration_id) {
    return {
      registrationId: row.registration_id,
      certificateId: row.certificate_id,
      paymentId: row.payment_id ?? paymentId,
      amount: Number(row.payment_amount),
    };
  }

  const { data: registrationId } = await supabase.rpc("next_registration_id");
  if (!registrationId) throw new Error("Failed to allocate registration ID.");

  let certificateId: string | null = null;
  if (row.participant_type === "e_participant") {
    const { data: certId } = await supabase.rpc("next_certificate_id");
    certificateId = certId ?? null;
  }

  const qrPayload = {
    registrationId,
    name: row.full_name,
    category: PARTICIPANT_LABELS[row.participant_type],
    event: MARATHON_EVENT_NAME,
    date: "19-09-2026",
  };
  const qrBuffer = await generateQrPngBuffer(qrPayload);
  const qrCodeUrl = await uploadMarathonAsset(`qr/${registrationId}.png`, qrBuffer, "image/png");

  let entryPassUrl: string | null = null;
  let certificateUrl: string | null = null;

  if (row.participant_type === "physical") {
    const passPdf = await generateEntryPassPdf({
      fullName: row.full_name,
      registrationId,
      category: PARTICIPANT_LABELS[row.participant_type],
      tshirtSize: row.tshirt_size,
      bloodGroup: row.blood_group,
      qrPngBuffer: qrBuffer,
    });
    entryPassUrl = await uploadMarathonAsset(`entry-passes/${registrationId}.pdf`, passPdf, "application/pdf");
  } else if (certificateId) {
    const verifyUrl = `${SITE_URL}/verify/${certificateId}`;
    const certPdf = await generateCertificatePdf({
      fullName: row.full_name,
      certificateId,
      qrPngBuffer: qrBuffer,
      verifyUrl,
    });
    certificateUrl = await uploadMarathonAsset(`certificates/${certificateId}.pdf`, certPdf, "application/pdf");
  }

  await supabase
    .from("registrations")
    .update({
      registration_id: registrationId,
      certificate_id: certificateId,
      certificate_url: certificateUrl,
      qr_code_url: qrCodeUrl,
      entry_pass_url: entryPassUrl,
      payment_status: "paid",
      payment_id: paymentId,
      razorpay_order_id: razorpayOrderId,
      razorpay_signature: razorpaySignature,
    })
    .eq("id", draftId);

  try {
    if (row.participant_type === "physical" && entryPassUrl) {
      await sendEmail({
        to: row.email,
        subject: `Registration Confirmed — ${registrationId}`,
        html: physicalConfirmationTemplate({
          fullName: row.full_name,
          registrationId,
          passUrl: `${SITE_URL}/events/marathon/pass/${registrationId}`,
        }),
      });
    } else if (certificateId && certificateUrl) {
      await sendEmail({
        to: row.email,
        subject: `Your E-Participant Certificate — ${certificateId}`,
        html: eParticipantConfirmationTemplate({
          fullName: row.full_name,
          registrationId,
          certificateId,
          certificateUrl: `${SITE_URL}/events/marathon/certificate/${certificateId}`,
          verifyUrl: `${SITE_URL}/verify/${certificateId}`,
        }),
      });
    }
  } catch {
    // Email failure shouldn't fail the payment confirmation — the
    // participant can still view/download the pass or certificate
    // directly from the success page.
  }

  return { registrationId, certificateId, paymentId, amount: Number(row.payment_amount) };
}

/**
 * Records a failed payment attempt. Guarded so it can never downgrade a
 * registration that a race/out-of-order webhook has already marked 'paid'.
 * Idempotent — safe to call repeatedly for retried payment.failed webhooks.
 */
export async function markPaymentFailed(
  razorpayOrderId: string,
  paymentId: string | null
): Promise<{ updated: boolean }> {
  const supabase = createSupabaseAdminClient();

  const { data: row } = await supabase
    .from("registrations")
    .select("id, payment_status")
    .eq("razorpay_order_id", razorpayOrderId)
    .maybeSingle();

  if (!row || row.payment_status === "paid") {
    return { updated: false };
  }

  await supabase
    .from("registrations")
    .update({ payment_status: "failed", ...(paymentId ? { payment_id: paymentId } : {}) })
    .eq("id", row.id);

  return { updated: true };
}

/**
 * Same as markPaymentFailed above, but keyed by Razorpay Payment Link
 * id instead of order id — used by the Payment Link webhook's
 * cancelled/expired events. Same idempotency guard: never downgrades a
 * row a race has already marked 'paid'.
 */
export async function markPaymentFailedByPaymentLink(paymentLinkId: string): Promise<{ updated: boolean }> {
  const supabase = createSupabaseAdminClient();

  const { data: row } = await supabase
    .from("registrations")
    .select("id, payment_status")
    .eq("razorpay_payment_link_id", paymentLinkId)
    .maybeSingle();

  if (!row || row.payment_status === "paid") {
    return { updated: false };
  }

  await supabase.from("registrations").update({ payment_status: "failed" }).eq("id", row.id);

  return { updated: true };
}
