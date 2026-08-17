import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/marathon/validation";
import { hashOtp, OTP_MAX_ATTEMPTS } from "@/lib/marathon/otp";
import { createEmailVerifiedToken } from "@/lib/admin/session";
import type { OtpVerifyResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const otp = typeof body?.otp === "string" ? body.otp.trim() : "";

  if (!validateEmail(email) || !/^\d{6}$/.test(otp)) {
    return NextResponse.json<ApiErrorResponse>({ error: "Invalid email or code." }, { status: 400 });
  }

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

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json<ApiErrorResponse>({ error: "Too many attempts. Please request a new code." }, { status: 429 });
  }

  if (new Date(record.expires_at).getTime() < Date.now()) {
    return NextResponse.json<ApiErrorResponse>({ error: "This code has expired. Please request a new one." }, { status: 400 });
  }

  const expectedHash = hashOtp(otp, email);
  if (expectedHash !== record.otp_hash) {
    await supabase
      .from("otp_verifications")
      .update({ attempts: record.attempts + 1 })
      .eq("email", email)
      .eq("purpose", "marathon_registration");

    return NextResponse.json<ApiErrorResponse>({ error: "Incorrect code. Please try again." }, { status: 400 });
  }

  await supabase
    .from("otp_verifications")
    .update({ verified: true })
    .eq("email", email)
    .eq("purpose", "marathon_registration");

  const emailVerifiedToken = createEmailVerifiedToken(email);

  return NextResponse.json<OtpVerifyResponse>({ success: true, emailVerifiedToken });
}
