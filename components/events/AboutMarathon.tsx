"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Heart,
  Eye,
  MessageSquareQuote,
  Target,
  Activity,
  Users,
  Globe,
  Shield,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const focusAreas = [
  { icon: Heart, text: "Promoting breast cancer awareness among women and families" },
  { icon: Activity, text: "Encouraging early screening and preventive healthcare" },
  { icon: Users, text: "Supporting women empowerment and community wellness" },
  { icon: Globe, text: "Creating awareness in rural and underserved communities" },
  { icon: Shield, text: "Building a healthier and cancer-aware Tamil Nadu" },
];

export default function AboutMarathon() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [focusRef, focusInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about-marathon" className="section-padding bg-white">
      <div className="container-max">
        {/* ── About text ─────────────────────────────────── */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              label="About Us"
              title="Mega Pink"
              titleHighlight="Marathon"
              align="left"
            />

            <p className="font-inter text-navy/70 text-sm sm:text-base leading-relaxed mt-6 mb-5">
              Mega Pink Marathon is a powerful people&apos;s movement dedicated to creating a Breast
              Cancer Free Tamil Nadu by 2030 through awareness, early detection, education, and
              community participation.
            </p>

            <p className="font-inter text-navy/70 text-sm sm:text-base leading-relaxed">
              Our mission is to inspire women, families, youth, healthcare professionals, and
              communities to unite for a healthier future where no life is lost due to delayed
              diagnosis. We believe that{" "}
              <span className="font-semibold text-pink-600">&quot;Early Detection Saves Lives&quot;</span>,
              and through this marathon, we aim to spread the importance of regular screening,
              self-examination, and timely medical consultation across every district of Tamil Nadu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-7 sm:p-8 border border-pink-100"
          >
            <p className="font-inter text-navy/70 text-sm sm:text-base leading-relaxed">
              This initiative is more than just a marathon — it is a symbol of{" "}
              <span className="font-semibold text-navy">hope, strength, women empowerment, and social responsibility</span>.
              Thousands of participants dressed in pink come together to support breast cancer
              awareness, encourage survivors, honour fighters, and educate society about preventive
              healthcare.
            </p>

            {/* Decorative pink bar */}
            <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-400" />
          </motion.div>
        </div>

        {/* ── Focus Areas + Vision + Message ─────────────── */}
        <div ref={focusRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Focus Areas — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={focusInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-pink-100 rounded-2xl p-7 sm:p-8 shadow-card h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target size={20} className="text-pink-600" />
                </div>
                <h3 className="font-poppins font-black text-xl text-navy">Focus Areas</h3>
              </div>

              <ul className="space-y-4">
                {focusAreas.map((area, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={focusInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 * i }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-pink-100 transition-colors">
                      <area.icon size={15} className="text-pink-500" />
                    </div>
                    <span className="font-inter text-navy/70 text-sm leading-relaxed">
                      {area.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision + Message stacked */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={focusInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Vision card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-pink-700 to-rose-700 rounded-2xl p-7 text-white flex-1">
              {/* Decorative ring */}
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border-[3px] border-white/10" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full border-[3px] border-white/10" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                  <h3 className="font-poppins font-black text-xl">Vision</h3>
                </div>
                <p className="font-poppins font-semibold text-sm sm:text-base text-pink-100 leading-snug">
                  A Breast Cancer Free Tamil Nadu by 2030
                </p>
              </div>
            </div>

            {/* Message card */}
            <div className="relative overflow-hidden bg-navy rounded-2xl p-7 text-white flex-1">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <MessageSquareQuote size={20} className="text-primary" />
                  </div>
                  <h3 className="font-poppins font-black text-xl">Message</h3>
                </div>
                <p className="font-inter italic text-white/85 text-sm sm:text-base leading-relaxed mb-3">
                  &quot;Early Detection Saves Lives&quot;
                </p>
                <p className="font-inter text-white/55 text-xs leading-relaxed">
                  Together, let us run for awareness, hope, health, and a brighter future for every
                  woman in Tamil Nadu.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
