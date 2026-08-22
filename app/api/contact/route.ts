import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/send";
import { contactNotificationTemplate } from "@/lib/email/templates";
import type { ApiErrorResponse } from "@/types/marathon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 100;
const MAX_SUBJECT_LEN = 200;
const MAX_MESSAGE_LEN = 5000;

/** Strips CR/LF so form input can never inject extra headers into the outgoing email. */
function stripNewlines(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export interface ContactResponse {
  success: true;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const b = (body ?? {}) as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in. Bots that
  // blindly fill every input trip this — silently report success so
  // they don't learn to skip it, without ever sending an email.
  if (typeof b.company === "string" && b.company.trim() !== "") {
    return NextResponse.json<ContactResponse>({ success: true });
  }

  const name = typeof b.name === "string" ? stripNewlines(b.name).slice(0, MAX_NAME_LEN) : "";
  const email = typeof b.email === "string" ? b.email.trim().toLowerCase() : "";
  const subject = typeof b.subject === "string" ? stripNewlines(b.subject).slice(0, MAX_SUBJECT_LEN) : "";
  const message = typeof b.message === "string" ? b.message.trim().slice(0, MAX_MESSAGE_LEN) : "";

  if (name.length < 2 || !EMAIL_RE.test(email) || subject.length < 2 || message.length < 10) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Please fill in your name, a valid email, a subject, and a message." },
      { status: 400 }
    );
  }

  const adminInbox = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  if (!adminInbox) {
    console.error("[contact] no ADMIN_EMAIL or SMTP_USER configured to receive submissions");
    return NextResponse.json<ApiErrorResponse>(
      { error: "Contact form is temporarily unavailable. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    await sendEmail({
      to: adminInbox,
      // Object form so nodemailer handles quoting/escaping of the
      // user-supplied display name — never hand-format "name <email>".
      replyTo: { name, address: email },
      subject: `[Contact] ${subject}`,
      html: contactNotificationTemplate({ name, email, subject, message }),
    });
  } catch (err) {
    console.error("[contact] email delivery failed", { error: err instanceof Error ? err.message : String(err) });
    return NextResponse.json<ApiErrorResponse>(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json<ContactResponse>({ success: true });
}
