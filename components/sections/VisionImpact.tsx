"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Briefcase,
  Users,
  Heart,
} from "lucide-react";

const impacts = [
  {
    icon: MapPin,
    value: 38,
    suffix: "+",
    label: "District Outreach",
    color: "#3B82F6",
    bgLight: "#DBEAFE",
  },
  {
    icon: Briefcase,
    value: 500,
    suffix: "+",
    label: "Community Programs",
    color: "#22C55E",
    bgLight: "#DCFCE7",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Volunteers Engaged",
    color: "#F59E0B",
    bgLight: "#FEF3C7",
  },
  {
    icon: Heart,
    value: 1000000,
    suffix: "+",
    label: "Citizens Inspired",
    color: "#F97316",
    bgLight: "#FEF3C7",
  },
];

export default function VisionImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [counters, setCounters] = useState<number[]>(impacts.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCounters(
        impacts.map((stat) => {
          const value = Math.round(stat.value * progress);
          return value;
        })
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K";
    return num.toString();
  };

  return (
    <section ref={ref} className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vision-impact.jpg"
          alt="Impact background"
          fill
          className="object-cover"
          quality={75}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/75 to-slate-900/80" />
      </div>

      {/* Content */}
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary/70 font-poppins font-bold text-xs tracking-widest uppercase mb-3">
            Our Reach & Impact
          </p>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl mx-auto">
            Making <span className="text-primary">Real Impact</span> Across Tamil Nadu
          </h2>
        </motion.div>

        {/* Impact Counters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            const displayValue = `${formatNumber(counters[index])}${impact.suffix}`;

            return (
              <motion.div
                key={impact.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 group hover:bg-white/10"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: impact.bgLight }}
                >
                  <Icon size={32} style={{ color: impact.color }} />
                </motion.div>

                {/* Counter */}
                <motion.p
                  className="font-raleway font-black text-4xl md:text-5xl text-white mb-2"
                >
                  {displayValue}
                </motion.p>

                {/* Label */}
                <p className="font-poppins font-semibold text-sm text-white/90">
                  {impact.label}
                </p>

                {/* Progress line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="mt-4 h-1 rounded-full bg-gradient-to-r from-primary/70 to-primary origin-left"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="font-inter text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            These numbers represent our collective commitment to building a cleaner, greener, healthier, wealthier, and safer Tamil Nadu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
