import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Download, MapPin, Calendar } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
} from "@/types/marathon";

export const metadata: Metadata = {
  title: `Entry Pass | ${MARATHON_EVENT_NAME}`,
  robots: { index: false, follow: false },
};

async function getRegistration(registrationId: string) {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase
    .from("registrations")
    .select("*")
    .eq("registration_id", registrationId)
    .eq("participant_type", "physical")
    .eq("payment_status", "paid")
    .maybeSingle();
  return data;
}

export default async function EntryPassPage({
  params,
}: {
  params: Promise<{ registrationId: string }>;
}) {
  const { registrationId } = await params;
  const registration = await getRegistration(registrationId);

  if (!registration) notFound();

  return (
    <section className="container-max py-10 sm:py-14 max-w-md">
      <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-navy/10">
        <div className="bg-gradient-to-br from-maroon-600 to-primary px-6 py-8 text-center relative">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gold-400" />
          <p className="font-poppins font-bold text-xs text-gold-300 uppercase tracking-widest mb-1">
            Entry Pass
          </p>
          <h1 className="font-poppins font-black text-lg text-white">{MARATHON_EVENT_NAME}</h1>
        </div>

        <div className="p-6 sm:p-8 text-center">
          {registration.qr_code_url && (
            <div className="mx-auto w-52 h-52 relative mb-5">
              <Image
                src={registration.qr_code_url}
                alt={`QR code for ${registration.registration_id}`}
                fill
                className="object-contain"
              />
            </div>
          )}

          <h2 className="font-poppins font-black text-xl text-navy mb-1">{registration.full_name}</h2>
          <p className="font-poppins font-semibold text-sm text-maroon-600 mb-6">
            {registration.registration_id}
          </p>

          <dl className="text-left space-y-2.5 mb-6 border-t border-navy/10 pt-5">
            <div className="flex justify-between">
              <dt className="font-inter text-sm text-navy/55">T-Shirt Size</dt>
              <dd className="font-poppins font-semibold text-sm text-navy">{registration.tshirt_size}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-inter text-sm text-navy/55">Blood Group</dt>
              <dd className="font-poppins font-semibold text-sm text-navy">{registration.blood_group}</dd>
            </div>
            <div className="flex items-center gap-1.5 justify-between">
              <dt className="font-inter text-sm text-navy/55 flex items-center gap-1.5">
                <Calendar size={13} /> Event Date
              </dt>
              <dd className="font-poppins font-semibold text-sm text-navy">{MARATHON_EVENT_DATE_DISPLAY}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-inter text-sm text-navy/55 flex items-center gap-1.5">
                <MapPin size={13} /> Venue
              </dt>
              <dd className="font-poppins font-semibold text-sm text-navy text-right">{MARATHON_VENUE}</dd>
            </div>
          </dl>

          {registration.entry_pass_url && (
            <a
              href={registration.entry_pass_url}
              download
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
            >
              <Download size={16} />
              Download Entry Pass
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
