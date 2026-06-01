"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

interface EventCardProps {
  onRegisterClick: () => void;
}

export default function EventCard({ onRegisterClick }: EventCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="section-padding bg-[#F8F8F8]">
      <div className="container-max">
        {/* Section heading */}
        <div className="text-center mb-12">
          <SectionHeading
            label="Featured Event"
            title="Upcoming"
            titleHighlight="Events"
            align="center"
          />
        </div>

        {/* Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 group">
            {/* Banner */}
            <div className="relative h-60 sm:h-72 overflow-hidden bg-gradient-to-br from-pink-800 via-pink-600 to-rose-400">
              {/* Background rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border-2 border-white/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-2 border-white/10" />
              </div>
              <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-black/10" />

              {/* Center content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center">
                <span className="text-5xl mb-3 select-none" role="img" aria-label="Runner">🎽</span>
                <p className="font-poppins font-black text-base sm:text-lg tracking-wider opacity-90 uppercase">
                  Mega Pink Marathon
                </p>
                <p className="font-inter text-xs text-pink-200 mt-1 tracking-widest uppercase">
                  Breast Cancer Awareness Run
                </p>
              </div>

              {/* Status badge */}
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="font-poppins font-semibold text-xs text-white">Registrations Open</span>
              </span>

              {/* Bottom fade */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-poppins font-black text-xl sm:text-2xl text-navy group-hover:text-pink-600 transition-colors duration-300">
                    Mega Pink Marathon
                  </h3>
                  <p className="font-inter text-navy/55 text-sm mt-0.5">
                    A People&apos;s Movement for a Healthier Tamil Nadu
                  </p>
                </div>
              </div>

              <p className="font-inter text-navy/70 text-sm leading-relaxed mb-6">
                Join thousands of participants in this powerful movement to spread breast cancer
                awareness, honour survivors, and build a cancer-aware Tamil Nadu by 2030.
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-3 mb-7">
                <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 text-xs font-poppins font-semibold px-3 py-1.5 rounded-full">
                  <Calendar size={12} />
                  Tamil Nadu
                </span>
                <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-700 text-xs font-poppins font-semibold px-3 py-1.5 rounded-full">
                  <MapPin size={12} />
                  All Districts
                </span>
              </div>

              {/* CTA */}
              <motion.button
                onClick={onRegisterClick}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 px-6 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-[0_4px_20px_rgba(236,72,153,0.35)] hover:shadow-[0_6px_28px_rgba(236,72,153,0.45)] group/btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
                <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-200" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
