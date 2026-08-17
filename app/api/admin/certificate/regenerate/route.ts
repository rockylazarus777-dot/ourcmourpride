import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";
import { generateQrPngBuffer } from "@/lib/marathon/qr";
import { generateCertificatePdf } from "@/lib/marathon/certificate";
import { uploadMarathonAsset } from "@/lib/marathon/storage";
import { sendEmail } from "@/lib/email/send";
import { eParticipantConfirmationTemplate } from "@/lib/email/templates";
import { MARATHON_EVENT_NAME, PARTICIPANT_LABELS } from "@/types/marathon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ourcmourpride.com";

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const registrationId = typeof body?.registrationId === "string" ? body.registrationId : "";
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
    return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  }
  if (row.participant_type !== "e_participant" || !row.certificate_id) {
    return NextResponse.json({ error: "This registration has no certificate to regenerate." }, { status: 400 });
  }

  const qrPayload = {
    registrationId: row.registration_id!,
    name: row.full_name,
    category: PARTICIPANT_LABELS[row.participant_type],
    event: MARATHON_EVENT_NAME,
    date: "19-09-2026",
  };
  const qrBuffer = await generateQrPngBuffer(qrPayload);
  const verifyUrl = `${SITE_URL}/verify/${row.certificate_id}`;

  const certPdf = await generateCertificatePdf({
    fullName: row.full_name,
    certificateId: row.certificate_id,
    qrPngBuffer: qrBuffer,
    verifyUrl,
  });
  const certificateUrl = await uploadMarathonAsset(`certificates/${row.certificate_id}.pdf`, certPdf, "application/pdf");

  await supabase.from("registrations").update({ certificate_url: certificateUrl }).eq("id", row.id);

  try {
    await sendEmail({
      to: row.email,
      subject: `Your E-Participant Certificate — ${row.certificate_id}`,
      html: eParticipantConfirmationTemplate({
        fullName: row.full_name,
        registrationId: row.registration_id!,
        certificateId: row.certificate_id,
        certificateUrl: `${SITE_URL}/events/marathon/certificate/${row.certificate_id}`,
        verifyUrl,
      }),
    });
  } catch {
    // Regeneration still succeeded even if the re-send email fails.
  }

  return NextResponse.json({ certificateUrl });
}
