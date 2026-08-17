import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Download, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `Certificate | ${MARATHON_EVENT_NAME}`,
  robots: { index: false, follow: false },
};

async function getRegistration(certificateId: string) {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("registrations")
    .select("*")
    .eq("certificate_id", certificateId)
    .eq("payment_status", "paid")
    .maybeSingle();
  return data;
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  const registration = await getRegistration(certificateId);

  if (!registration || !registration.certificate_url) notFound();

  return (
    <section className="container-max py-10 sm:py-14 max-w-md">
      <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-navy/10 text-center">
        <div className="bg-gradient-to-br from-navy to-navy-light px-6 py-8">
          <p className="font-poppins font-bold text-xs text-gold-300 uppercase tracking-widest mb-1">
            E-Participant Certificate
          </p>
          <h1 className="font-poppins font-black text-lg text-white">{MARATHON_EVENT_NAME}</h1>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="font-poppins font-black text-xl text-navy mb-1">{registration.full_name}</h2>
          <p className="font-poppins font-semibold text-sm text-maroon-600 mb-6">{registration.certificate_id}</p>

          <a
            href={registration.certificate_url}
            download
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange mb-4"
          >
            <Download size={16} />
            Download Certificate
          </a>

          <Link
            href={`/verify/${registration.certificate_id}`}
            className="inline-flex items-center justify-center gap-1.5 font-inter text-sm text-navy/55 hover:text-primary transition-colors"
          >
            <ShieldCheck size={14} />
            Verify this certificate
          </Link>
        </div>
      </div>
    </section>
  );
}
