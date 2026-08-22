/**
 * Nodemailer SMTP transporter — server-only.
 * NEVER import this from a 'use client' component.
 */

import nodemailer, { type Transporter } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

let _transporter: Transporter | undefined;

function getTransporter(): Transporter {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Missing SMTP credentials. Ensure SMTP_HOST, SMTP_USER, and SMTP_PASS are set in .env.local."
    );
  }

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    // Reuse SMTP connections across sends within a warm serverless
    // instance instead of paying a fresh TLS handshake every time, and
    // self-throttle so one instance can't burst past what Gmail's SMTP
    // will accept from a single sender.
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5,
  });

  return _transporter;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | Uint8Array;
  contentType: string;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  /** Set when the recipient should be able to reply straight to a third party (e.g. a contact-form submitter) without the `from` address being spoofed. */
  replyTo?: string | Mail.Address;
  attachments?: EmailAttachment[];
}): Promise<void> {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? "Our CM Our Pride <no-reply@ourcmourpride.com>";

  await transporter.sendMail({
    from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: Buffer.from(a.content),
      contentType: a.contentType,
    })),
  });
}
