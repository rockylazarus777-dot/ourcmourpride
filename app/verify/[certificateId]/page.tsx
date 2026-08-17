import { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { MARATHON_EVENT_NAME, MARATHON_EVENT_DATE_DISPLAY } from "@/types/marathon";

export const metadata: Metadata = {
  title: `Certificate Verification | ${MARATHON_EVENT_NAME}`,
  description: "Verify the authenticity of an Our CM Our Pride Mega Marathon 2026 E-Participant certificate.",
};

async function getRegistration(certificateId: string) {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("registrations")
    .select("full_name, certificate_id, registration_id, payment_status, created_at")
    .eq("certificate_id", certificateId)
    .maybeSingle();
  return data;
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  const registration = await getRegistration(certificateId);
  const isValid = !!registration && registration.payment_status === "paid";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <section className="container-max py-16 sm:py-24 max-w-md">
          <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-navy/10 text-center p-8">
            {isValid ? (
              <>
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} className="text-green-500" />
                </div>
                <h1 className="font-poppins font-black text-xl text-navy mb-2">Certificate Verified</h1>
                <p className="font-inter text-navy/60 text-sm mb-6">
                  This certificate is authentic and was issued for {MARATHON_EVENT_NAME}.
                </p>
                <dl className="text-left space-y-2.5 border-t border-navy/10 pt-5">
                  <div className="flex justify-between">
                    <dt className="font-inter text-sm text-navy/55">Participant</dt>
                    <dd className="font-poppins font-semibold text-sm text-navy">{registration!.full_name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-inter text-sm text-navy/55">Certificate ID</dt>
                    <dd className="font-poppins font-semibold text-sm text-navy">{registration!.certificate_id}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-inter text-sm text-navy/55">Event Date</dt>
                    <dd className="font-poppins font-semibold text-sm text-navy">{MARATHON_EVENT_DATE_DISPLAY}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <h1 className="font-poppins font-black text-xl text-navy mb-2">Certificate Not Found</h1>
                <p className="font-inter text-navy/60 text-sm">
                  No verified certificate matches this ID. Please double-check the certificate ID and try again.
                </p>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
