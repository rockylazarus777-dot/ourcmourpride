"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Sparkles,
  Leaf,
  Heart,
  TrendingUp,
  ShieldCheck,
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  Landmark,
} from "lucide-react";

const pillars = [
  { label: "Clean",   icon: Sparkles,   color: "#3B82F6", bg: "#DBEAFE" },
  { label: "Green",   icon: Leaf,       color: "#22C55E", bg: "#DCFCE7" },
  { label: "Healthy", icon: Heart,      color: "#EF4444", bg: "#FEE2E2" },
  { label: "Wealthy", icon: TrendingUp, color: "#F59E0B", bg: "#FEF3C7" },
  { label: "Safe",    icon: ShieldCheck,color: "#8B5CF6", bg: "#EDE9FE" },
];

const founders = [
  { label: "Grassroots Leaders",   icon: Users       },
  { label: "Social Activists",     icon: Heart       },
  { label: "Professionals",        icon: Briefcase   },
  { label: "Industry Experts",     icon: Building2   },
  { label: "Academicians",         icon: GraduationCap},
  { label: "Govt. Advisory Bodies",icon: Landmark    },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-gradient-to-b from-orange-50/40 via-white to-white">
      <div className="container-max">

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary font-poppins font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
            About Us
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-0.5 bg-primary/30 rounded-full" />
            <h2 className="font-poppins font-black text-2xl md:text-3xl lg:text-4xl text-navy leading-tight">
              Our CM <span className="text-primary">Our Pride</span>
            </h2>
            <span className="w-10 h-0.5 bg-primary/30 rounded-full" />
          </div>
        </motion.div>

        {/* ── Two-column body ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: five pillars */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 space-y-4"
          >
            <p className="font-poppins font-bold text-xs tracking-widest text-navy/40 uppercase">
              Five Commitments
            </p>
            <div className="space-y-2.5">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl px-5 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: p.bg }}
                    >
                      <Icon size={17} style={{ color: p.color }} />
                    </div>
                    <span className="font-poppins font-semibold text-sm text-navy">
                      {p.label}{" "}
                      <span className="font-normal text-navy/50">Neighborhoods</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: paragraphs + founding voices */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 space-y-7"
          >
            {/* Orange accent rule */}
            <div className="w-14 h-1 bg-primary rounded-full" />

            {/* Paragraph 1 — exact content, key phrases bolded */}
            <p className="text-base md:text-[17px] text-navy/75 font-inter leading-[1.85]">
              <span className="font-semibold text-navy">Our CM Our Pride</span> is a
              people-centric movement and an initiative of the{" "}
              <span className="font-semibold text-navy">Great Indian Movement</span>,
              dedicated to creating{" "}
              <span className="font-semibold text-primary">
                Clean, Green, Healthy, Wealthy, and Safe Neighborhoods
              </span>{" "}
              across Tamil Nadu through active citizen participation and collaborative
              governance.
            </p>

            {/* Paragraph 2 — exact content */}
            <p className="text-base md:text-[17px] text-navy/75 font-inter leading-[1.85]">
              Founded by a distinguished group of eminent personalities from diverse
              backgrounds—including{" "}
              <span className="font-medium text-navy">
                grassroots leaders, social activists, professionals, industry experts,
                academicians
              </span>
              , and members associated with government advisory bodies—the movement
              serves as a{" "}
              <span className="font-medium text-navy">
                constructive bridge between citizens and policymakers
              </span>
              , ensuring that public aspirations are translated into meaningful action
              for the benefit of the State and its people.
            </p>

            {/* Founding voices */}
            <div className="pt-1">
              <p className="font-poppins font-bold text-xs tracking-widest text-navy/40 uppercase mb-3">
                Founding Voices
              </p>
              <div className="flex flex-wrap gap-2">
                {founders.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.span
                      key={f.label}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.45 + i * 0.07 }}
                      className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-navy/70 font-inter text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      <Icon size={11} className="text-primary flex-shrink-0" />
                      {f.label}
                    </motion.span>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
