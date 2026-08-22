import type { NextRequest } from "next/server";

/**
 * Best-effort client IP for rate limiting. Vercel's edge network always
 * sets x-forwarded-for on requests reaching a serverless function, with
 * the original client as the first entry. Good enough for coarse abuse
 * throttling — never treat this as a trusted identity.
 */
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
