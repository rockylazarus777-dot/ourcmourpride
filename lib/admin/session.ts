/**
 * Minimal HMAC-signed token helper — server-only.
 *
 * Used for two unrelated purposes that both need "prove this happened
 * server-side, without a full auth system":
 *   1. The admin dashboard session cookie (/admin/**).
 *   2. The short-lived "this email was OTP-verified" token handed to
 *      the client after /api/marathon/otp/verify, which the client
 *      must echo back on /api/marathon/register. The server re-verifies
 *      it — the client can't forge one without ADMIN_SESSION_SECRET.
 *
 * Token shape: base64url(payloadJson) + "." + hex(hmacSha256(payloadJson))
 */

import { createHmac, timingSafeEqual } from "crypto";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET environment variable.");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSignedToken(data: Record<string, unknown>, ttlSeconds: number): string {
  const payload = JSON.stringify({ ...data, exp: Date.now() + ttlSeconds * 1000 });
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function verifySignedToken<T extends Record<string, unknown>>(token: string): T | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, signature] = parts;

  const expectedSignature = sign(payloadB64);
  const sigBuf = Buffer.from(signature, "hex");
  const expectedBuf = Buffer.from(expectedSignature, "hex");
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return payload as T;
  } catch {
    return null;
  }
}

/* ── Admin session ─────────────────────────────────────────── */

export const ADMIN_COOKIE_NAME = "ocop_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export function createAdminSessionToken(): string {
  return createSignedToken({ role: "admin" }, ADMIN_SESSION_TTL_SECONDS);
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const payload = verifySignedToken<{ role?: string }>(token);
  return payload?.role === "admin";
}

/* ── Email-verified token (OTP step) ──────────────────────────*/

const EMAIL_VERIFIED_TTL_SECONDS = 60 * 30; // 30 minutes — enough to finish the form

export function createEmailVerifiedToken(email: string): string {
  return createSignedToken({ purpose: "email_verified", email }, EMAIL_VERIFIED_TTL_SECONDS);
}

export function verifyEmailVerifiedToken(token: string | undefined, email: string): boolean {
  if (!token) return false;
  const payload = verifySignedToken<{ purpose?: string; email?: string }>(token);
  return payload?.purpose === "email_verified" && payload?.email?.toLowerCase() === email.toLowerCase();
}

/* ── Registration status token (payment flow) ─────────────────*/
// Issued once at /api/marathon/register and echoed back by the client
// on the success-page status-check calls. Proves "this browser
// completed the OTP-gated registration for this exact draft" without
// a full session system — and, critically, means knowing a draftId
// alone is never enough to read another participant's status.

const REGISTRATION_STATUS_TTL_SECONDS = 60 * 60 * 2; // 2 hours — covers Checkout + webhook delay

export function createRegistrationStatusToken(draftId: number): string {
  return createSignedToken({ purpose: "registration_status", draftId }, REGISTRATION_STATUS_TTL_SECONDS);
}

export function verifyRegistrationStatusToken(token: string | undefined, draftId: number): boolean {
  if (!token) return false;
  const payload = verifySignedToken<{ purpose?: string; draftId?: number }>(token);
  return payload?.purpose === "registration_status" && payload?.draftId === draftId;
}
