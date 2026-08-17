"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
  PARTICIPANT_FEES,
} from "@/types/marathon";

export default function EventCard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-[#F8F8F8]">
      <div className="container-max">
        <div className="text-center mb-12">
          <SectionHeading label="Featured Event" title="Upcoming" titleHighlight="Marathon" align="center" />
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 group">
            {/* Banner */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-marathon-gradient">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-2 border-white/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-white/10" />
              </div>
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-black/10" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center">
                <span className="text-5xl mb-3 select-none" role="img" aria-label="Runner">
                  🏃
                </span>
                <p className="font-poppins font-black text-base sm:text-lg tracking-wider opacity-95 uppercase">
                  {MARATHON_EVENT_NAME}
                </p>
                <p className="font-inter text-xs text-gold-200 mt-1 tracking-widest uppercase">
                  5 KM Run — Napier Bridge, Chennai
                </p>
              </div>

              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="font-poppins font-semibold text-xs text-white">Registrations Open</span>
              </span>

              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                <h3 className="font-poppins font-black text-xl sm:text-2xl text-navy group-hover:text-primary transition-colors duration-300">
                  {MARATHON_EVENT_NAME}
                </h3>
                <p className="font-inter text-navy/55 text-sm mt-0.5">A Great Indian Movement (GIM) Initiative</p>
              </div>

              <p className="font-inter text-navy/70 text-sm leading-relaxed mb-6">
                Join thousands of participants — in person or virtually — in this flagship 5 KM run
                celebrating fitness, unity, and pride in Tamil Nadu.
              </p>

              <div className="flex flex-wrap gap-3 mb-7">
                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-primary text-xs font-poppins font-semibold px-3 py-1.5 rounded-full">
                  <Calendar size={12} />
                  {MARATHON_EVENT_DATE_DISPLAY}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-primary text-xs font-poppins font-semibold px-3 py-1.5 rounded-full">
                  <MapPin size={12} />
                  {MARATHON_VENUE}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  href="/events/marathon/register?type=physical"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange group/btn"
                >
                  Register Now · ₹{PARTICIPANT_FEES.physical}
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                </Link>
                <Link
                  href="/events/marathon/register?type=e_participant"
                  className="w-full inline-flex items-center justify-center gap-2 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300"
                >
                  Join Virtually · ₹{PARTICIPANT_FEES.e_participant}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
