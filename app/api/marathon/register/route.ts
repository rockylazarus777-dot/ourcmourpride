import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { validateRegisterRequest } from "@/lib/marathon/validation";
import { verifyEmailVerifiedToken, createRegistrationStatusToken } from "@/lib/admin/session";
import { PARTICIPANT_FEES } from "@/types/marathon";
import type { RegisterResponse, ApiErrorResponse } from "@/types/marathon";
import type { RegistrationInsert } from "@/types/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { errors, data } = validateRegisterRequest(body);

  if (!data) {
    return NextResponse.json<ApiErrorResponse>({ error: errors.join(" ") }, { status: 400 });
  }

  if (!verifyEmailVerifiedToken(data.emailVerifiedToken, data.email)) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Email verification has expired. Please verify your email again." },
      { status: 401 }
    );
  }

  const amount = PARTICIPANT_FEES[data.participantType];
  const supabase = createSupabaseAdminClient();

  const fields = {
    participant_type: data.participantType,
    full_name: data.fullName,
    age: data.age,
    gender: data.gender,
    blood_group: data.bloodGroup,
    phone: data.phone,
    city: data.city,
    category: data.category,
    tshirt_size: data.tshirtSize,
    emergency_contact_name: data.emergencyContactName,
    emergency_contact_phone: data.emergencyContactPhone,
    interested_in_upcoming_events: data.interestedInUpcomingEvents,
    pledge_accepted: true,
    otp_verified: true,
    payment_amount: amount,
  };

  // A pending registration for this email already exists (e.g. the
  // participant re-submitted the form, or retried after an earlier
  // abandoned attempt) — reuse it instead of creating a duplicate row.
  // Payment matching keys off (email, participant_type), so a second
  // draft for the same address would just fragment that lookup.
  const { data: existingRows } = await supabase
    .from("registrations")
    .select("id")
    .eq("email", data.email)
    .eq("payment_status", "pending")
    .order("created_at", { ascending: false })
    .limit(1);
  const existing = existingRows?.[0] ?? null;

  if (existing) {
    const { error } = await supabase.from("registrations").update(fields).eq("id", existing.id);
    if (error) {
      return NextResponse.json<ApiErrorResponse>({ error: "Failed to update registration. Please try again." }, { status: 500 });
    }
    return NextResponse.json<RegisterResponse>({
      draftId: existing.id,
      amount,
      statusToken: createRegistrationStatusToken(existing.id),
    });
  }

  const insert: RegistrationInsert = { ...fields, email: data.email, payment_status: "pending" };
  const { data: row, error } = await supabase
    .from("registrations")
    .insert(insert)
    .select("id")
    .single();

  if (error || !row) {
    return NextResponse.json<ApiErrorResponse>({ error: "Failed to create registration. Please try again." }, { status: 500 });
  }

  return NextResponse.json<RegisterResponse>({
    draftId: row.id,
    amount,
    statusToken: createRegistrationStatusToken(row.id),
  });
}
