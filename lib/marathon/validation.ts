import {
  BLOOD_GROUPS,
  CATEGORY_LABELS,
  TSHIRT_SIZES,
  type RegisterRequest,
} from "@/types/marathon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_RE.test(email.trim());
}

export function validatePhone(phone: unknown): phone is string {
  return typeof phone === "string" && PHONE_RE.test(phone.trim());
}

/**
 * Validates the full registration payload server-side. Never trust the
 * client — this is the actual gate before a DB row (and eventually a
 * payment) is created.
 */
export function validateRegisterRequest(body: unknown): { errors: string[]; data: RegisterRequest | null } {
  const errors: string[] = [];
  const b = (body ?? {}) as Record<string, unknown>;

  if (b.participantType !== "physical" && b.participantType !== "e_participant") {
    errors.push("Invalid participant type.");
  }
  if (b.pledgeAccepted !== true) {
    errors.push("The pledge must be accepted.");
  }
  if (!validateEmail(b.email)) {
    errors.push("A valid email address is required.");
  }
  if (typeof b.emailVerifiedToken !== "string" || !b.emailVerifiedToken) {
    errors.push("Email verification is required.");
  }
  if (typeof b.fullName !== "string" || b.fullName.trim().length < 2) {
    errors.push("Full name is required.");
  }
  const age = Number(b.age);
  if (!Number.isFinite(age) || age < 5 || age > 100) {
    errors.push("Enter a valid age between 5 and 100.");
  }
  if (typeof b.gender !== "string" || !GENDERS.includes(b.gender)) {
    errors.push("Please select a gender.");
  }
  if (typeof b.bloodGroup !== "string" || !BLOOD_GROUPS.includes(b.bloodGroup as (typeof BLOOD_GROUPS)[number])) {
    errors.push("Please select a blood group.");
  }
  if (!validatePhone(b.phone)) {
    errors.push("Enter a valid 10-digit Indian mobile number.");
  }
  if (typeof b.city !== "string" || b.city.trim().length < 2) {
    errors.push("City is required.");
  }
  if (typeof b.category !== "string" || !(b.category in CATEGORY_LABELS)) {
    errors.push("Please select a category.");
  }
  if (typeof b.tshirtSize !== "string" || !TSHIRT_SIZES.includes(b.tshirtSize as (typeof TSHIRT_SIZES)[number])) {
    errors.push("Please select a t-shirt size.");
  }
  if (typeof b.emergencyContactName !== "string" || b.emergencyContactName.trim().length < 2) {
    errors.push("Emergency contact name is required.");
  }
  if (!validatePhone(b.emergencyContactPhone)) {
    errors.push("Enter a valid emergency contact mobile number.");
  }

  if (errors.length > 0) return { errors, data: null };

  return {
    errors: [],
    data: {
      participantType: b.participantType as RegisterRequest["participantType"],
      email: (b.email as string).trim().toLowerCase(),
      emailVerifiedToken: b.emailVerifiedToken as string,
      pledgeAccepted: true,
      fullName: (b.fullName as string).trim(),
      age,
      gender: b.gender as RegisterRequest["gender"],
      bloodGroup: b.bloodGroup as RegisterRequest["bloodGroup"],
      phone: (b.phone as string).trim(),
      city: (b.city as string).trim(),
      category: b.category as RegisterRequest["category"],
      tshirtSize: b.tshirtSize as RegisterRequest["tshirtSize"],
      emergencyContactName: (b.emergencyContactName as string).trim(),
      emergencyContactPhone: (b.emergencyContactPhone as string).trim(),
    },
  };
}
