/**
 * Admin-only environment-configuration diagnostic.
 * Reports which required variables are configured/missing — never their
 * values. Useful for confirming a Vercel deployment's env vars are set
 * without needing to trigger the full OTP/payment flow to find out.
 */

import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/guard";
import { checkRequiredEnv } from "@/lib/config/checkEnv";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json({ groups: checkRequiredEnv() });
}
