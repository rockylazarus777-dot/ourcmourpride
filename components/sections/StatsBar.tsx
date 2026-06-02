"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Users, BarChart3, Handshake, Lightbulb } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    iconBg: "#F97316",
    value: "2.5 Cr+",
    numericTarget: 2.5,
    suffix: " Cr+",
    label: "People Benefited",
  },
  {
    id: 2,
    icon: BarChart3,
    iconBg: "#22C55E",
    value: "1000+",
    numericTarget: 1000,
    suffix: "+",
    label: "Development Projects",
  },
  {
    id: 3,
    icon: Handshake,
    iconBg: "#3B82F6",
    value: "50+",
    numericTarget: 50,
    suffix: "+",
    label: "Welfare Schemes",
  },
  {
    id: 4,
    icon: Lightbulb,
    iconBg: "#F59E0B",
    value: "1 Vision",
    numericTarget: 1,
    suffix: " Vision",
    label: "Better Tomorrow",
  },
];

function AnimatedCounter({
  target,
  suffix,
  duration = 2000,
  isFloat = false,
  triggered,
}: {
  target: number;
  suffix: string;
  duration?: number;
  isFloat?: boolean;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggered, target, duration, isFloat]);

  const display = isFloat
    ? count === target
      ? `${target}${suffix}`
      : `${count.toFixed(1)}${suffix}`
    : `${count}${suffix}`;

  return <span>{display}</span>;
}

export default function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative z-20 -mt-14 md:-mt-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isFloat = stat.numericTarget < 10 && String(stat.numericTarget).includes(".");
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center gap-4 px-6 py-6 md:py-8 ${
                    index < stats.length - 1
                      ? "border-b lg:border-b-0 lg:border-r border-white/10"
                      : ""
                  } ${index % 2 === 0 && index < stats.length - 1 ? "border-r lg:border-r-0" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                    style={{ backgroundColor: stat.iconBg }}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-white font-poppins font-black text-xl md:text-2xl leading-tight">
                      <AnimatedCounter
                        target={stat.numericTarget}
                        suffix={stat.suffix}
                        isFloat={isFloat}
                        triggered={inView}
                      />
                    </p>
                    <p className="text-white/60 text-xs md:text-sm font-inter mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
