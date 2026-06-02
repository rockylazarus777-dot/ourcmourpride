"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Leaf,
  Activity,
  BookOpen,
  Zap,
  Users,
  MapPin,
  User,
  Landmark,
  Globe,
  Building2,
  Plus,
} from "lucide-react";

const pillars = [
  {
    label: "Environmental Conservation",
    icon: Leaf,
    color: "#22C55E",
    bg: "rgba(34, 197, 94, 0.18)",
  },
  {
    label: "Public Health Initiatives",
    icon: Activity,
    color: "#F87171",
    bg: "rgba(248, 113, 113, 0.18)",
  },
  {
    label: "Education",
    icon: BookOpen,
    color: "#60A5FA",
    bg: "rgba(96, 165, 250, 0.18)",
  },
  {
    label: "Skill Development",
    icon: Zap,
    color: "#FBBF24",
    bg: "rgba(251, 191, 36, 0.18)",
  },
  {
    label: "Social Welfare Programs",
    icon: Users,
    color: "#C084FC",
    bg: "rgba(192, 132, 252, 0.18)",
  },
  {
    label: "Community-Led Projects",
    icon: MapPin,
    color: "#F97316",
    bg: "rgba(249, 115, 22, 0.18)",
  },
];

const stakeholders = [
  { label: "Citizens",                      icon: User       },
  { label: "Government Institutions",       icon: Landmark   },
  { label: "Civil Society Organizations",   icon: Globe      },
  { label: "Industry Stakeholders",         icon: Building2  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function MissionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-padding bg-navy-gradient relative overflow-hidden"
    >
      {/* Subtle background texture rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #F97316 0%, transparent 70%)" }}
      />

      <div className="container-max relative">

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-primary font-poppins font-bold text-xs md:text-sm tracking-widest uppercase mb-3">
            Our Mission
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-10 h-0.5 bg-primary/40 rounded-full" />
            <h2 className="font-poppins font-black text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
              What We <span className="text-primary">Stand For</span>
            </h2>
            <span className="w-10 h-0.5 bg-primary/40 rounded-full" />
          </div>

          {/* Mission statement — exact content, constrained for readability */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-3xl mx-auto"
          >
            <div className="w-14 h-1 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-base md:text-[17px] text-white/75 font-inter leading-[1.9] text-left md:text-center">
              Our mission is to{" "}
              <span className="font-semibold text-white">empower communities</span>,{" "}
              <span className="font-semibold text-white">strengthen civic engagement</span>, and{" "}
              <span className="font-semibold text-white">drive sustainable development</span>{" "}
              through environmental conservation, public health initiatives, education, skill
              development, social welfare programs, and community-led projects. By bringing
              together citizens, government institutions, civil society organizations, and
              industry stakeholders, we aim to build{" "}
              <span className="font-semibold text-primary">
                stronger and more resilient communities
              </span>
              .
            </p>
          </motion.div>
        </motion.div>

        {/* ── Six mission pillars ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 md:mb-14">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.09)" }}
                className="flex items-center gap-4 bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 cursor-default transition-colors duration-200"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: p.bg }}
                >
                  <Icon size={19} style={{ color: p.color }} />
                </div>
                <span className="font-poppins font-semibold text-sm text-white/90 leading-snug">
                  {p.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Stakeholders strip ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="border-t border-white/10 pt-10"
        >
          <p className="font-poppins font-bold text-xs tracking-widest text-white/35 uppercase text-center mb-5">
            Building Together
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stakeholders.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 font-inter text-xs font-medium px-4 py-2 rounded-full hover:bg-white/15 transition-colors duration-200"
                  >
                    <Icon size={13} className="text-primary flex-shrink-0" />
                    {s.label}
                  </motion.span>
                  {i < stakeholders.length - 1 && (
                    <Plus size={13} className="text-primary/60 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
