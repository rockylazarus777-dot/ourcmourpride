import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/marathon/validation";
import {
  generateOtp,
  hashOtp,
  OTP_TTL_SECONDS,
  OTP_RESEND_COOLDOWN_SECONDS,
} from "@/lib/marathon/otp";
import { sendEmail } from "@/lib/email/send";
import { otpEmailTemplate } from "@/lib/email/templates";
import type { OtpSendResponse, ApiErrorResponse } from "@/types/marathon";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!validateEmail(email)) {
    return NextResponse.json<ApiErrorResponse>({ error: "A valid email address is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  const { data: existing } = await supabase
    .from("otp_verifications")
    .select("last_sent_at")
    .eq("email", email)
    .eq("purpose", "marathon_registration")
    .maybeSingle();

  if (existing) {
    const elapsedMs = Date.now() - new Date(existing.last_sent_at).getTime();
    const remainingMs = OTP_RESEND_COOLDOWN_SECONDS * 1000 - elapsedMs;
    if (remainingMs > 0) {
      return NextResponse.json<ApiErrorResponse>(
        { error: `Please wait ${Math.ceil(remainingMs / 1000)}s before requesting another code.` },
        { status: 429 }
      );
    }
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp, email);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_TTL_SECONDS * 1000);

  const { error } = await supabase.from("otp_verifications").upsert(
    {
      email,
      purpose: "marathon_registration",
      otp_hash: otpHash,
      attempts: 0,
      verified: false,
      expires_at: expiresAt.toISOString(),
      last_sent_at: now.toISOString(),
    },
    { onConflict: "email,purpose" }
  );

  if (error) {
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to generate verification code." }, { status: 500 });
  }

  try {
    await sendEmail({
      to: email,
      subject: "Your Mega Marathon 2026 verification code",
      html: otpEmailTemplate(otp),
    });
  } catch {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Failed to send verification email. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json<OtpSendResponse>({ success: true, expiresInSeconds: OTP_TTL_SECONDS });
}
