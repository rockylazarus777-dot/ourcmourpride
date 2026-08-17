import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const supabase = createSupabaseAdminClient();

  const [{ count: total }, { count: physical }, { count: eParticipant }, { count: checkedIn }, { data: paidRows }] =
    await Promise.all([
      supabase.from("registrations").select("*", { count: "exact", head: true }).eq("payment_status", "paid"),
      supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "paid")
        .eq("participant_type", "physical"),
      supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("payment_status", "paid")
        .eq("participant_type", "e_participant"),
      supabase
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("check_in_status", true),
      supabase.from("registrations").select("payment_amount").eq("payment_status", "paid"),
    ]);

  const revenue = (paidRows ?? []).reduce((sum, r) => sum + Number(r.payment_amount), 0);

  return NextResponse.json({
    totalRegistrations: total ?? 0,
    physicalCount: physical ?? 0,
    eParticipantCount: eParticipant ?? 0,
    checkedInCount: checkedIn ?? 0,
    revenue,
  });
}
