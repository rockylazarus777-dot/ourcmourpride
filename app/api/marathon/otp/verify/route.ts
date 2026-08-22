import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/marathon/validation";
import { hashOtp, OTP_MAX_ATTEMPTS } from "@/lib/marathon/otp";
import { createEmailVerifiedToken } from "@/lib/admin/session";
import type { OtpVerifyResponse, ApiErrorResponse } from "@/types/marathon";

function hashForLog(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

  if (!validateEmail(email) || !/^\d{6}$/.test(otp)) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid email or code." }, { status: 400 });
  }

  const emailHash = hashForLog(email);
  const supabase = createSupabaseAdminClient();

  const { data: record } = await supabase
    .from("otp_verifications")
    .select("*")
    .eq("email", email)
    .eq("purpose", "marathon_registration")
    .maybeSingle();

  if (!record) {
    return NextResponse.json<ApiErrorResponse>({ error: "No verification code found. Please request a new one." }, { status: 400 });
  }

  if (new Date(record.expires_at).getTime() < Date.now()) {
    console.log("[otp/verify] expired", { emailHash });
    return NextResponse.json<ApiErrorResponse>({ error: "This code has expired. Please request a new one." }, { status: 400 });
  }

  // Atomically reserve one of OTP_MAX_ATTEMPTS "slots" before looking at the
  // guess at all. This has to happen before the hash comparison, not after:
  // a plain "read attempts, compare, then update" is an optimistic lock, and
  // under truly simultaneous guesses every request reads the same stale
  // `attempts` value before any of them commit — so concurrent brute-force
  // attempts evade the cap. Folding "is a slot free" and "consume it" into a
  // single UPDATE ... WHERE attempts < max lets Postgres's row lock
  // serialize concurrent callers, so at most OTP_MAX_ATTEMPTS ever succeed
  // no matter how much concurrency hits this at once.
  const { data: reservation, error: reserveError } = await supabase
    .rpc("reserve_otp_verification_attempt", { p_email: email, p_max_attempts: OTP_MAX_ATTEMPTS })
    .single();

  if (reserveError || !reservation) {
    console.error("[otp/verify] attempt reservation failed", { emailHash, error: reserveError?.message });
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to process request. Please try again." }, { status: 500 });
  }

  if (!reservation.allowed) {
    console.log("[otp/verify] max attempts reached", { emailHash });
    return NextResponse.json<ApiErrorResponse>(
      { error: "Too many attempts. Please request a new code.", code: "OTP_MAX_ATTEMPTS" },
      { status: 429 }
    );
  }

  const expectedHash = hashOtp(otp, email);
  if (expectedHash !== record.otp_hash) {
    console.log("[otp/verify] incorrect code", { emailHash });
    return NextResponse.json<ApiErrorResponse>({ error: "Incorrect code. Please try again." }, { status: 400 });
  }

  // Invalidate this OTP immediately so it can't be replayed — reuses the
  // existing expiry check rather than adding a new "consumed" column.
  await supabase
    .from("otp_verifications")
    .update({ verified: true, expires_at: new Date(0).toISOString() })
    .eq("email", email)
    .eq("purpose", "marathon_registration");

  console.log("[otp/verify] success", { emailHash });

  const emailVerifiedToken = createEmailVerifiedToken(email);

  return NextResponse.json<OtpVerifyResponse>({ success: true, emailVerifiedToken });
}
