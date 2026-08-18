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

  const insert: RegistrationInsert = {
    participant_type: data.participantType,
    full_name: data.fullName,
    age: data.age,
    gender: data.gender,
    blood_group: data.bloodGroup,
    phone: data.phone,
    email: data.email,
    city: data.city,
    category: data.category,
    tshirt_size: data.tshirtSize,
    emergency_contact_name: data.emergencyContactName,
    emergency_contact_phone: data.emergencyContactPhone,
    pledge_accepted: true,
    otp_verified: true,
    payment_amount: amount,
    payment_status: "pending",
  };

  const supabase = createSupabaseAdminClient();
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
