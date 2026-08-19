/**
 * Our CM Our Pride – Mega Marathon 2026.
 * Form / API / UI types. Kept fully separate from types/events.ts
 * (the older Mega Pink Marathon feature) by design.
 */

import type { RegistrationRow } from "./supabase";

export const MARATHON_EVENT_NAME = "Our CM Our Pride – Mega Marathon 2026";
export const MARATHON_EVENT_DATE_ISO = "2026-09-19";
export const MARATHON_EVENT_DATE_DISPLAY = "19 September 2026";
export const MARATHON_VENUE = "Napier Bridge, Chennai";
export const MARATHON_REG_CLOSE_DATE_DISPLAY = "13 September 2026";

export type ParticipantType = "physical" | "e_participant";

export const PARTICIPANT_FEES: Record<ParticipantType, number> = {
  physical: 399,
  e_participant: 52,
};

export const PARTICIPANT_LABELS: Record<ParticipantType, string> = {
  physical: "Physical Participant",
  e_participant: "E-Participant",
};

export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Not Sure"] as const;
export type BloodGroup = (typeof BLOOD_GROUPS)[number];

export type MarathonCategory = "student" | "public" | "government_employee";

export const CATEGORY_LABELS: Record<MarathonCategory, string> = {
  student: "Student",
  public: "Public",
  government_employee: "Government Employee",
};

export type TshirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export const TSHIRT_SIZES: TshirtSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

/** In-memory / sessionStorage state carried across the multi-page flow. */
export interface MarathonDraftState {
  participantType: ParticipantType | null;
  pledgeAccepted: boolean;
  email: string;
  emailVerifiedToken: string | null;
  fullName: string;
  age: string;
  gender: Gender | "";
  bloodGroup: BloodGroup | "";
  phone: string;
  city: string;
  category: MarathonCategory | "";
  tshirtSize: TshirtSize | "";
  emergencyContactName: string;
  emergencyContactPhone: string;
  draftId: number | null;
  /** Signed proof that this browser completed the OTP-gated registration for draftId — required by the registration-status API. */
  statusToken: string | null;
  photoDriveFileId: string | null;
  photoDriveUrl: string | null;
  razorpayOrderId: string | null;
  registrationId: string | null;
  certificateId: string | null;
  paymentId: string | null;
  paymentAmount: number | null;
}

export const INITIAL_MARATHON_DRAFT: MarathonDraftState = {
  participantType: null,
  pledgeAccepted: false,
  email: "",
  emailVerifiedToken: null,
  fullName: "",
  age: "",
  gender: "",
  bloodGroup: "",
  phone: "",
  city: "",
  category: "",
  tshirtSize: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  draftId: null,
  statusToken: null,
  photoDriveFileId: null,
  photoDriveUrl: null,
  razorpayOrderId: null,
  registrationId: null,
  certificateId: null,
  paymentId: null,
  paymentAmount: null,
};

/** QR payload embedded in every generated QR code. */
export interface MarathonQrPayload {
  registrationId: string;
  name: string;
  category: string;
  event: string;
  date: string;
}

/** Request/response shapes for app/api/marathon/** routes. */
export interface OtpSendRequest {
  email: string;
}
export interface OtpSendResponse {
  success: true;
  expiresInSeconds: number;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}
export interface OtpVerifyResponse {
  success: true;
  emailVerifiedToken: string;
}

export interface RegisterRequest {
  participantType: ParticipantType;
  email: string;
  emailVerifiedToken: string;
  pledgeAccepted: boolean;
  fullName: string;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  phone: string;
  city: string;
  category: MarathonCategory;
  tshirtSize: TshirtSize;
  emergencyContactName: string;
  emergencyContactPhone: string;
}
export interface RegisterResponse {
  draftId: number;
  amount: number;
  /** Echoed back on the registration-status polling calls. */
  statusToken: string;
}

/** multipart/form-data: { draftId: string, photo: File } */
export interface PhotoUploadResponse {
  photoDriveFileId: string;
  photoDriveUrl: string;
}

export interface CreateOrderRequest {
  draftId: number;
}
export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: "INR";
  keyId: string;
}

export interface VerifyPaymentRequest {
  draftId: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
export interface VerifyPaymentResponse {
  registrationId: string;
  certificateId: string | null;
  paymentId: string;
  amount: number;
  paymentStatus: "paid";
}

export type MarathonPaymentStatus = "pending" | "paid" | "failed";

/**
 * Server-truth status check for the success page. Deliberately minimal:
 * no participant PII, no payment identifiers — just enough for the
 * success page to render.
 */
export interface RegistrationStatusRequest {
  draftId: number;
  statusToken: string;
}
export interface RegistrationStatusResponse {
  paymentStatus: MarathonPaymentStatus;
  registrationId: string | null;
  certificateId: string | null;
}

export interface ApiErrorResponse {
  error: string;
}

export type RegistrationSummary = Pick<
  RegistrationRow,
  | "registration_id"
  | "participant_type"
  | "full_name"
  | "email"
  | "phone"
  | "city"
  | "category"
  | "tshirt_size"
  | "blood_group"
  | "payment_status"
  | "payment_amount"
  | "certificate_id"
  | "certificate_url"
  | "qr_code_url"
  | "entry_pass_url"
  | "check_in_status"
  | "check_in_time"
  | "created_at"
>;
