import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const registrationId = typeof body?.registrationId === "string" ? body.registrationId.trim() : "";
  if (!registrationId) {
    return NextResponse.json({ error: "registrationId is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data: row } = await supabase
    .from("registrations")
    .select("*")
    .eq("registration_id", registrationId)
    .maybeSingle();

  if (!row) {
    return NextResponse.json({ error: "No registration found with this ID." }, { status: 404 });
  }

  if (row.payment_status !== "paid") {
    return NextResponse.json({ error: "This registration has not completed payment.", registration: row }, { status: 409 });
  }

  if (row.check_in_status) {
    return NextResponse.json(
      { error: "This participant has already been checked in.", registration: row, alreadyCheckedIn: true },
      { status: 409 }
    );
  }

  const checkInTime = new Date().toISOString();
  const { data: updated, error } = await supabase
    .from("registrations")
    .update({ check_in_status: true, check_in_time: checkInTime })
    .eq("id", row.id)
    .select("*")
    .single();

  if (error || !updated) {
    return NextResponse.json({ error: "Failed to mark attendance." }, { status: 500 });
  }

  return NextResponse.json({ registration: updated });
}
