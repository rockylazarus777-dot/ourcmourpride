import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateEmail } from "@/lib/marathon/validation";
import { generateOtp, hashOtp, OTP_TTL_SECONDS } from "@/lib/marathon/otp";
import { getClientIp } from "@/lib/marathon/request-ip";
import { sendEmail } from "@/lib/email/send";
import { otpEmailTemplate } from "@/lib/email/templates";
import type { OtpSendResponse, ApiErrorResponse } from "@/types/marathon";

/** Never log raw emails — only enough to correlate events for one address in the logs. */
function hashForLog(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

type SmtpErrorReason =
  | "quota_exceeded"
  | "authentication_failed"
  | "connection_failed"
  | "timeout"
  | "recipient_rejected"
  | "unknown";

/**
 * Classifies an SMTP send failure into a safe, non-sensitive category for
 * logs and metrics — never logs the raw provider error text (which can
 * include internal hostnames/session ids), and never reaches the client.
 *
 * None of these are retried automatically (see the comment at the call
 * site): a quota error retried immediately only digs the account deeper
 * into the same daily limit, and the others are either not something a
 * second attempt within the same request would fix (auth/recipient) or
 * are already covered by nodemailer's own connection-level timeout
 * handling — an application-level retry loop on top of that risks
 * pushing a single request close to the serverless function's execution
 * time limit for no real benefit.
 */
function classifySmtpError(err: unknown): SmtpErrorReason {
  const message = err instanceof Error ? err.message : String(err);
  if (/(550|452).{0,10}5\.4\.5|sending limit|quota/i.test(message)) return "quota_exceeded";
  if (/invalid login|auth|535|534/i.test(message)) return "authentication_failed";
  if (/ETIMEDOUT|timed?\s?out/i.test(message)) return "timeout";
  if (/ECONNREFUSED|ECONNRESET|ENOTFOUND|EAI_AGAIN/i.test(message)) return "connection_failed";
  if (/550.{0,10}5\.1\.1|user unknown|recipient rejected|no such user/i.test(message)) return "recipient_rejected";
  return "unknown";
}

const RATE_LIMIT_MESSAGES: Record<string, string> = {
  EMAIL_COOLDOWN: "Please wait before requesting another code.",
  EMAIL_LIMIT: "Too many code requests for this email. Please try again later.",
  IP_LIMIT: "Too many requests from this network. Please try again later.",
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!validateEmail(email)) {
    return NextResponse.json<ApiErrorResponse>({ error: "A valid email address is required." }, { status: 400 });
  }

  const ip = getClientIp(req);
  const emailHash = hashForLog(email);
  const supabase = createSupabaseAdminClient();

  // Single atomic round trip: checks the per-email cooldown, per-email
  // window, and per-IP windows, and records this attempt against
  // whichever layers it passed — all inside one Postgres function call,
  // so concurrent requests (double-click, multiple tabs, retries) can't
  // race past the gate. See migration 20260822000000 for the mechanism.
  //
  // This is intentionally touched before the email is even attempted —
  // a failed send (e.g. provider quota) still costs real work and should
  // count against abuse limits, otherwise a client could hammer this
  // endpoint for free during any outage. It also means that once the
  // Gmail account is over quota, every request from an email/IP fails
  // the same way regardless of counting, so this doesn't change the
  // user's experience during that specific outage either way.
  const { data: gate, error: gateError } = await supabase
    .rpc("check_and_touch_otp_rate_limit", { p_email: email, p_ip: ip })
    .single();

  if (gateError || !gate) {
    console.error("[otp/send] rate limit check failed", { emailHash, error: gateError?.message });
    return NextResponse.json<ApiErrorResponse>(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }

  if (!gate.allowed) {
    const retryAfter = gate.retry_after_seconds ?? 60;
    const message = `Please wait ${retryAfter}s before requesting another OTP.`;
    console.log("[otp/send] rate limited", { emailHash, code: gate.code, retryAfter });
    return NextResponse.json<ApiErrorResponse>(
      {
        error: RATE_LIMIT_MESSAGES[gate.code ?? ""] ?? message,
        code: "OTP_RATE_LIMITED",
        retryAfter,
        message,
      },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  const otp = generateOtp();

  console.log("[otp/send] otp requested", { emailHash });

  // Deliver before persisting: generating a code and writing it to
  // otp_verifications is what invalidates whatever OTP the user
  // currently has (see the upsert below and its onConflict target). If
  // that write happened first and the send then failed, a user with a
  // still-valid, already-delivered code (e.g. clicking "Resend") would
  // have it silently invalidated in favor of a new code that never
  // reached their inbox — leaving them locked out with no working code
  // at all. Attempting delivery first means a failed send leaves any
  // previous OTP exactly as it was.
  try {
    await sendEmail({
      to: email,
      subject: "Your Mega Marathon 2026 verification code",
      html: otpEmailTemplate(otp),
    });
  } catch (err) {
    // Classify only — never log the raw provider error (may contain
    // internal hostnames/session ids) and never forward it to the client.
    const reason = classifySmtpError(err);
    console.error("[otp/send] email delivery failed", { emailHash, reason });

    if (reason === "quota_exceeded") {
      return NextResponse.json<ApiErrorResponse>(
        {
          success: false,
          error: "Email delivery is temporarily unavailable. Please try again later.",
          code: "EMAIL_TEMPORARILY_UNAVAILABLE",
        },
        { status: 503 }
      );
    }

    // Every other reason (auth/connection/timeout/recipient-rejected) gets
    // the same generic response — recipient_rejected in particular must
    // never surface as a distinct "that address doesn't exist" message,
    // or the endpoint becomes an email-enumeration oracle.
    return NextResponse.json<ApiErrorResponse>(
      { error: "Failed to send verification email. Please try again shortly." },
      { status: 502 }
    );
  }

  console.log("[otp/send] otp email sent", { emailHash });

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
    // The email genuinely sent — the code the user received is real —
    // but we couldn't persist it. There's nothing to invalidate here (no
    // write happened), so this can only fail closed: report an error
    // rather than let the user submit a code we have no record of.
    console.error("[otp/send] failed to store otp after send", { emailHash, error: error.message });
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to generate verification code." }, { status: 500 });
  }

  return NextResponse.json<OtpSendResponse>({ success: true, expiresInSeconds: OTP_TTL_SECONDS });
}
