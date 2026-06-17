"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Heart,
  Leaf,
  Zap,
  BarChart3,
  Users,
} from "lucide-react";

const priorities = [
  {
    icon: GraduationCap,
    title: "Education Excellence",
    description:
      "Preparing future generations through quality learning opportunities.",
    color: "#3B82F6",
    bgLight: "#DBEAFE",
  },
  {
    icon: Heart,
    title: "Healthcare Advancement",
    description: "Enhancing public health and accessibility for all.",
    color: "#EF4444",
    bgLight: "#FEE2E2",
  },
  {
    icon: Leaf,
    title: "Sustainable Development",
    description: "Balancing growth and environmental responsibility.",
    color: "#22C55E",
    bgLight: "#DCFCE7",
  },
  {
    icon: Zap,
    title: "Technology & Innovation",
    description: "Leveraging digital transformation for progress.",
    color: "#F59E0B",
    bgLight: "#FEF3C7",
  },
  {
    icon: BarChart3,
    title: "Economic Growth",
    description: "Supporting businesses and employment opportunities.",
    color: "#8B5CF6",
    bgLight: "#EDE9FE",
  },
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Strengthening citizen participation and social impact.",
    color: "#F97316",
    bgLight: "#FEF3C7",
  },
];

export default function StrategicPriorities() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-poppins font-bold text-xs tracking-widest uppercase mb-3">
            Key Focus Areas
          </p>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-2xl mx-auto">
            Strategic <span className="text-primary">Priorities</span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((priority, index) => {
            const Icon = priority.icon;
            return (
              <motion.div
                key={priority.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -12 }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Top border animation */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/70 to-primary origin-left"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-xl mb-5 flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: priority.bgLight }}
                >
                  <Icon size={28} style={{ color: priority.color }} />
                </motion.div>

                {/* Content */}
                <h3 className="font-poppins font-bold text-xl text-slate-900 mb-3 line-clamp-2">
                  {priority.title}
                </h3>

                <p className="font-inter text-sm text-slate-600 leading-relaxed mb-6">
                  {priority.description}
                </p>

                {/* Learn more arrow */}
                <motion.div
                  className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                >
                  <span>Explore</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>

                {/* Decorative gradient */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-5 blur-3xl"
                  style={{ backgroundColor: priority.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
