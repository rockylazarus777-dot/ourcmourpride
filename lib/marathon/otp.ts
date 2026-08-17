import { createHash, randomInt } from "crypto";

export const OTP_LENGTH = 6;
export const OTP_TTL_SECONDS = 5 * 60;
export const OTP_RESEND_COOLDOWN_SECONDS = 60;
export const OTP_MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return randomInt(0, 1_000_000).toString().padStart(OTP_LENGTH, "0");
}

export function hashOtp(otp: string, email: string): string {
  return createHash("sha256").update(`${email.toLowerCase()}:${otp}`).digest("hex");
}
