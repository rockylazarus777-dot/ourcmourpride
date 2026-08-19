/**
 * Safe environment-variable presence check — server-only.
 *
 * Reports whether required variables are set to a non-empty value.
 * NEVER returns or logs the actual value of any variable — only
 * "configured" / "missing", so this is safe to expose via an
 * admin-protected diagnostic route or to log at startup.
 */

export type EnvStatus = "configured" | "missing";

export interface EnvCheckGroup {
  group: string;
  vars: Record<string, EnvStatus>;
}

function status(value: string | undefined): EnvStatus {
  return value && value.length > 0 ? "configured" : "missing";
}

export function checkRequiredEnv(): EnvCheckGroup[] {
  return [
    {
      group: "Supabase",
      vars: {
        NEXT_PUBLIC_SUPABASE_URL: status(process.env.NEXT_PUBLIC_SUPABASE_URL),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: status(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        SUPABASE_SERVICE_ROLE_KEY: status(process.env.SUPABASE_SERVICE_ROLE_KEY),
      },
    },
    {
      group: "Razorpay",
      vars: {
        // Old Order/Checkout flow — untouched, kept for local/test/rollback use.
        RAZORPAY_KEY_ID: status(process.env.RAZORPAY_KEY_ID),
        RAZORPAY_KEY_SECRET: status(process.env.RAZORPAY_KEY_SECRET),
        NEXT_PUBLIC_RAZORPAY_KEY_ID: status(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
        RAZORPAY_WEBHOOK_SECRET: status(process.env.RAZORPAY_WEBHOOK_SECRET),
        // Static Dashboard Payment Links — the live registration flow.
        RAZORPAY_PHYSICAL_PAYMENT_LINK_ID: status(process.env.RAZORPAY_PHYSICAL_PAYMENT_LINK_ID),
        RAZORPAY_PHYSICAL_PAYMENT_LINK_URL: status(process.env.RAZORPAY_PHYSICAL_PAYMENT_LINK_URL),
        RAZORPAY_EPARTICIPANT_PAYMENT_LINK_ID: status(process.env.RAZORPAY_EPARTICIPANT_PAYMENT_LINK_ID),
        RAZORPAY_EPARTICIPANT_PAYMENT_LINK_URL: status(process.env.RAZORPAY_EPARTICIPANT_PAYMENT_LINK_URL),
      },
    },
    {
      group: "SMTP",
      vars: {
        SMTP_HOST: status(process.env.SMTP_HOST),
        SMTP_USER: status(process.env.SMTP_USER),
        SMTP_PASS: status(process.env.SMTP_PASS),
      },
    },
    {
      group: "Admin",
      vars: {
        ADMIN_PASSWORD: status(process.env.ADMIN_PASSWORD),
        ADMIN_SESSION_SECRET: status(process.env.ADMIN_SESSION_SECRET),
      },
    },
    {
      // Optional — only needed for the participant photo upload feature.
      group: "Google Drive (participant photos)",
      vars: {
        GOOGLE_OAUTH_CLIENT_ID: status(process.env.GOOGLE_OAUTH_CLIENT_ID),
        GOOGLE_OAUTH_CLIENT_SECRET: status(process.env.GOOGLE_OAUTH_CLIENT_SECRET),
        GOOGLE_OAUTH_REFRESH_TOKEN: status(process.env.GOOGLE_OAUTH_REFRESH_TOKEN),
        GOOGLE_DRIVE_PHOTOS_FOLDER_ID: status(process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID),
      },
    },
  ];
}
