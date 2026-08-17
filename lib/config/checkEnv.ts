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
        RAZORPAY_KEY_ID: status(process.env.RAZORPAY_KEY_ID),
        RAZORPAY_KEY_SECRET: status(process.env.RAZORPAY_KEY_SECRET),
        NEXT_PUBLIC_RAZORPAY_KEY_ID: status(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
        RAZORPAY_WEBHOOK_SECRET: status(process.env.RAZORPAY_WEBHOOK_SECRET),
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
  ];
}
