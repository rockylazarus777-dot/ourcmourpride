import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";
import type { ParticipantType, MarathonCategory } from "@/types/marathon";
import type { RegistrationRow } from "@/types/supabase";

const PAGE_SIZE = 25;
const MAX_SEARCH_LENGTH = 200; // plenty for any real name/email/phone/registration ID; guards against pathologically long input blowing up the filter/request size

const PARTICIPANT_TYPES: ParticipantType[] = ["physical", "e_participant"];
const PAYMENT_STATUSES: RegistrationRow["payment_status"][] = ["pending", "paid", "failed"];
const CATEGORIES: MarathonCategory[] = ["student", "public", "government_employee"];

/**
 * PostgREST's `.or()`/`.and()` filter strings treat comma, period,
 * parentheses, and colon as syntax delimiters. Wrapping the value in
 * double quotes makes it a single opaque token instead — and any
 * embedded backslash or double-quote must itself be escaped first so
 * it can never break out of that quoting. Without this, a search
 * containing e.g. a comma next to an apostrophe ("a%b,c'd") produces
 * a malformed filter and PostgREST returns a parse error (PGRST100),
 * which previously surfaced as an unhandled 500.
 */
function escapePostgrestValue(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = (searchParams.get("search")?.trim() ?? "").slice(0, MAX_SEARCH_LENGTH);
  const participantType = searchParams.get("participantType");
  const paymentStatus = searchParams.get("paymentStatus");
  const category = searchParams.get("category");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));

  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from("registrations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) {
    const pattern = escapePostgrestValue(`%${search}%`);
    query = query.or(
      `full_name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern},registration_id.ilike.${pattern}`
    );
  }
  if (participantType && PARTICIPANT_TYPES.includes(participantType as ParticipantType)) {
    query = query.eq("participant_type", participantType as ParticipantType);
  }
  if (paymentStatus && PAYMENT_STATUSES.includes(paymentStatus as RegistrationRow["payment_status"])) {
    query = query.eq("payment_status", paymentStatus as RegistrationRow["payment_status"]);
  }
  if (category && CATEGORIES.includes(category as MarathonCategory)) {
    query = query.eq("category", category as MarathonCategory);
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: "Failed to load registrations." }, { status: 500 });
  }

  return NextResponse.json({
    registrations: data ?? [],
    total: count ?? 0,
    page,
    pageSize: PAGE_SIZE,
  });
}
