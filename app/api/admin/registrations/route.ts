import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";
import type { ParticipantType, MarathonCategory } from "@/types/marathon";
import type { RegistrationRow } from "@/types/supabase";

const PAGE_SIZE = 25;

const PARTICIPANT_TYPES: ParticipantType[] = ["physical", "e_participant"];
const PAYMENT_STATUSES: RegistrationRow["payment_status"][] = ["pending", "paid", "failed"];
const CATEGORIES: MarathonCategory[] = ["student", "public", "government_employee"];

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.trim() ?? "";
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
    query = query.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,registration_id.ilike.%${search}%`
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
