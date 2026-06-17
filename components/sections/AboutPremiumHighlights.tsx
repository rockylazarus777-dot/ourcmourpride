"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Leaf,
  Lightbulb,
  Award,
  Globe2,
  Shield,
  Sparkles,
  Handshake,
} from "lucide-react";

const coreValues = [
  {
    title: "People First",
    description: "Ensuring every citizen has access to opportunities and essential services.",
    icon: Users,
  },
  {
    title: "Inclusive Growth",
    description: "Promoting development that benefits urban and rural communities alike.",
    icon: TrendingUp,
  },
  {
    title: "Transparency",
    description: "Encouraging accountable governance and citizen participation.",
    icon: ShieldCheck,
  },
  {
    title: "Sustainability",
    description: "Balancing economic progress with environmental responsibility.",
    icon: Leaf,
  },
  {
    title: "Innovation",
    description: "Embracing technology and modern solutions for better governance.",
    icon: Lightbulb,
  },
];

const quickHighlights = [
  {
    label: "Years of Public Service",
    value: 25,
    suffix: "+",
    icon: Award,
  },
  {
    label: "Major Policy Initiatives",
    value: 150,
    suffix: "+",
    icon: Globe2,
  },
  {
    label: "Welfare Programs Introduced",
    value: 75,
    suffix: "+",
    icon: Shield,
  },
  {
    label: "Districts Reached",
    value: 38,
    suffix: "",
    icon: Sparkles,
  },
  {
    label: "Community Projects Supported",
    value: 500,
    suffix: "+",
    icon: Handshake,
  },
];

export default function AboutPremiumHighlights() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [counterValues, setCounterValues] = useState<number[]>(
    quickHighlights.map(() => 0)
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    const start = performance.now();
    const duration = 1200;
    let frame = 0;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCounterValues(
        quickHighlights.map((stat) => Math.round(stat.value * progress))
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section
      ref={ref}
      aria-labelledby="premium-highlights-heading"
      className="bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <p className="text-sm font-poppins font-bold tracking-[0.32em] uppercase text-primary/90 mb-3">
            CORE VALUES
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The principles that guide our vision, leadership, and commitment to the
            people of Tamil Nadu.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-[#F8FAFC]"
                tabIndex={0}
                role="article"
                aria-labelledby={`cv-${index}-title`}
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15 group-hover:text-primary">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3
                  id={`cv-${index}-title`}
                  className="text-xl font-semibold text-navy mb-3"
                >
                  {value.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">
                  {value.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-3xl mx-auto mt-20 mb-8"
        >
          <p className="text-sm font-poppins font-bold tracking-[0.32em] uppercase text-primary/90 mb-3">
            QUICK HIGHLIGHTS
          </p>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A snapshot of leadership, service, and impact across communities.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {quickHighlights.map((stat, index) => {
            const Icon = stat.icon;
            const displayValue = `${counterValues[index]}${stat.suffix}`;

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.14 + index * 0.07 }}
                className="group rounded-[28px] border border-slate-200 border-t-4 border-primary bg-gradient-to-b from-white via-slate-50 to-slate-100 p-6 shadow-[0_18px_34px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1.5 focus-within:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-[#F8FAFC]"
                tabIndex={0}
                role="region"
                aria-labelledby={`qh-${index}-title`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="block h-1 w-16 rounded-full bg-primary/40" aria-hidden="true" />
                </div>
                <p className="text-4xl md:text-5xl font-black tracking-tight text-navy">
                  {displayValue}
                </p>
                <p
                  id={`qh-${index}-title`}
                  className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-500"
                >
                  {stat.label}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
