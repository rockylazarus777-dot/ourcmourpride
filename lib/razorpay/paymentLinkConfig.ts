/**
 * Static Razorpay Payment Link configuration — two Dashboard-created,
 * shared links (Physical / E-Participant) referenced only by ID/URL
 * from the environment. Never calls the Razorpay API.
 *
 * Used by both /api/marathon/payment/create-link (hand back the right
 * URL for a registration's participant type) and /api/razorpay/webhook
 * (map an incoming payment_link.paid event's link id back to a
 * participant type).
 */

import type { ParticipantType } from "@/types/marathon";

export interface PaymentLinkConfig {
  id: string;
  url: string;
  participantType: ParticipantType;
}

function readLink(participantType: ParticipantType, idVar: string, urlVar: string): PaymentLinkConfig | null {
  const id = process.env[idVar];
  const url = process.env[urlVar];
  if (!id || !url) return null;
  return { id, url, participantType };
}

export function getPaymentLinkConfig(participantType: ParticipantType): PaymentLinkConfig | null {
  if (participantType === "physical") {
    return readLink("physical", "RAZORPAY_PHYSICAL_PAYMENT_LINK_ID", "RAZORPAY_PHYSICAL_PAYMENT_LINK_URL");
  }
  return readLink("e_participant", "RAZORPAY_EPARTICIPANT_PAYMENT_LINK_ID", "RAZORPAY_EPARTICIPANT_PAYMENT_LINK_URL");
}

/** Resolves a Razorpay Payment Link id (from a webhook payload) back to its configured participant type — null if it isn't one of ours. */
export function resolvePaymentLinkById(linkId: string): PaymentLinkConfig | null {
  const physical = getPaymentLinkConfig("physical");
  if (physical && physical.id === linkId) return physical;

  const eParticipant = getPaymentLinkConfig("e_participant");
  if (eParticipant && eParticipant.id === linkId) return eParticipant;

  return null;
}
