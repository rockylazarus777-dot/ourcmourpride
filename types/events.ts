import type {
  MarathonRegistrationRow,
  MarathonRegistrationInsert,
  MarathonRegistrationUpdate,
} from "./supabase";

// ── Re-export Supabase row shapes ─────────────────────────────
export type { MarathonRegistrationRow, MarathonRegistrationInsert, MarathonRegistrationUpdate };

// ── Form / UI types ───────────────────────────────────────────

export type AgeCategory = "below_18" | "above_18";
export type Prefix = "Mr." | "Mrs." | "Ms." | "Others";
export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
export type RegistrationStep = 1 | 2 | 3;

/** In-memory state of the multi-step registration form. */
export interface RegistrationFormData {
  ageCategory: AgeCategory | null;
  pledgeAccepted: boolean;
  prefix: Prefix | "";
  fullName: string;
  gender: Gender | "";
  dateOfBirth: string;
  phone: string;
  email: string;
  pinCode: string;
  photo: File | null;
  guardianName: string;
  guardianMobile: string;
  guardianConsent: boolean;
}

// ── Email template shapes ─────────────────────────────────────
// Used when building email payloads in /api/events/register.

export interface ParticipantEmailData {
  to: string;
  subject: string;
  participantName: string;
  registrationId: string;
  eventName: string;
  registrationDate: string;
}

export interface AdminEmailData {
  subject: string;
  registration: MarathonRegistrationRow;
  timestamp: string;
}

export interface EmailTemplateData {
  participant: ParticipantEmailData;
  admin: AdminEmailData;
}
