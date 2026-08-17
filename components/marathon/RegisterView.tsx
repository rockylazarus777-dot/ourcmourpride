"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Medal, Laptop } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_REG_CLOSE_DATE_DISPLAY,
  MARATHON_VENUE,
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-marathon-gradient">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/running 2.png" alt="" fill priority className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />

        <div className="container-max relative z-10 py-16 sm:py-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-5"
          >
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            <span className="font-poppins font-semibold text-xs text-white tracking-wide">
              Registrations Open
            </span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-poppins font-black text-3xl sm:text-5xl text-white leading-tight max-w-3xl mx-auto"
          >
            {MARATHON_EVENT_NAME}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-white/85 text-sm sm:text-base mt-4 max-w-xl mx-auto"
          >
            A flagship 5 KM community run by the Great Indian Movement (GIM) — celebrating
            fitness, unity, and pride in Tamil Nadu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-7"
          >
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-poppins font-semibold px-3.5 py-2 rounded-full border border-white/20">
              <Calendar size={13} />
              {MARATHON_EVENT_DATE_DISPLAY}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-poppins font-semibold px-3.5 py-2 rounded-full border border-white/20">
              <MapPin size={13} />
              {MARATHON_VENUE}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gold-400 text-navy text-xs font-poppins font-bold px-3.5 py-2 rounded-full">
              5 KM Run
            </span>
          </motion.div>
        </div>
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
