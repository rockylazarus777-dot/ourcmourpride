"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Medal, Laptop } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import {
  MARATHON_REG_CLOSE_DATE_DISPLAY,
  PARTICIPANT_FEES,
  type ParticipantType,
} from "@/types/marathon";

export default function RegisterView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateDraft, resetDraft, hydrated } = useMarathonRegistration();
  const [redirecting, setRedirecting] = useState(false);

  const typeParam = searchParams.get("type");

  useEffect(() => {
    if (!hydrated) return;
    if (typeParam === "physical" || typeParam === "e_participant") {
      setRedirecting(true);
      resetDraft();
      updateDraft({ participantType: typeParam });
      router.replace("/events/marathon/pledge");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, typeParam]);

  const choose = (type: ParticipantType) => {
    resetDraft();
    updateDraft({ participantType: type });
    router.push("/events/marathon/pledge");
  };

  if (redirecting) {
    return <div className="min-h-[60vh]" aria-hidden="true" />;
  }

  return (
    <>
      {/* Hero — register.png only, no text/overlay on top of it */}
      <section className="w-full overflow-hidden">
        <Image
          src="/images/register.png"
          alt="Our CM Our Pride – Mega Marathon 2026"
          width={2081}
          height={756}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />
      </section>

      {/* Cards */}
      <section className="section-padding bg-[#F8F8F8]">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-navy">
              Choose How You&apos;ll Participate
            </h2>
            <p className="font-inter text-navy/55 text-sm mt-2">
              Registrations close {MARATHON_REG_CLOSE_DATE_DISPLAY}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Physical */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-32 bg-gradient-to-br from-maroon-600 to-primary flex items-center justify-center">
                <Medal size={44} className="text-white/90" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="font-poppins font-black text-xl text-navy mb-1">🏃 Physical Participant</h3>
                <p className="font-poppins font-black text-3xl text-maroon-600 mb-4">
                  ₹{PARTICIPANT_FEES.physical}
                </p>
                <ul className="font-inter text-sm text-navy/65 space-y-1.5 mb-6 flex-1">
                  <li>• Marathon participation</li>
                  <li>• Event kit</li>
                  <li>• T-shirt</li>
                  <li>• Medal</li>
                  <li>• Certificate</li>
                  <li>• QR-based entry pass</li>
                </ul>
                <button
                  type="button"
                  onClick={() => choose("physical")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
                >
                  Register Now
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* E-Participant */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              <div className="h-32 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                <Laptop size={44} className="text-gold-400" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="font-poppins font-black text-xl text-navy mb-1">💻 E-Participant</h3>
                <p className="font-poppins font-black text-3xl text-navy mb-4">
                  ₹{PARTICIPANT_FEES.e_participant}
                </p>
                <ul className="font-inter text-sm text-navy/65 space-y-1.5 mb-6 flex-1">
                  <li>• Support the movement virtually</li>
                  <li>• Digital participation certificate</li>
                  <li>• QR verification</li>
                </ul>
                <button
                  type="button"
                  onClick={() => choose("e_participant")}
                  className="w-full inline-flex items-center justify-center gap-2 bg-navy text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-xl hover:bg-navy-light transition-all duration-300"
                >
                  Join Virtually
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
