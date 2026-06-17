"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Leaf, Heart, TrendingUp, ShieldCheck } from "lucide-react";

const pillarsData = [
  {
    id: 1,
    title: "Clean Tamil Nadu",
    description:
      "Promoting sanitation, waste management awareness, and cleaner public spaces that contribute to healthier communities.",
    icon: Sparkles,
    color: "#3B82F6",
    bgLight: "#DBEAFE",
    bgGradient: "from-blue-50 to-blue-100",
  },
  {
    id: 2,
    title: "Green Tamil Nadu",
    description:
      "Encouraging environmental conservation, water preservation, afforestation, and sustainable development practices.",
    icon: Leaf,
    color: "#22C55E",
    bgLight: "#DCFCE7",
    bgGradient: "from-green-50 to-green-100",
  },
  {
    id: 3,
    title: "Healthy Tamil Nadu",
    description:
      "Supporting wellness initiatives, healthcare accessibility, preventive care, and healthier lifestyles.",
    icon: Heart,
    color: "#EF4444",
    bgLight: "#FEE2E2",
    bgGradient: "from-red-50 to-red-100",
  },
  {
    id: 4,
    title: "Wealthy Tamil Nadu",
    description:
      "Fostering entrepreneurship, skill development, innovation, and economic opportunities for all.",
    icon: TrendingUp,
    color: "#F59E0B",
    bgLight: "#FEF3C7",
    bgGradient: "from-amber-50 to-amber-100",
  },
  {
    id: 5,
    title: "Safe Tamil Nadu",
    description:
      "Creating secure communities through civic responsibility, awareness, and social harmony.",
    icon: ShieldCheck,
    color: "#8B5CF6",
    bgLight: "#EDE9FE",
    bgGradient: "from-purple-50 to-purple-100",
  },
];

export default function VisionPillars() {
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
            Development Goals
          </p>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-2xl mx-auto">
            Five Pillars in <span className="text-primary">Action</span>
          </h2>
        </motion.div>

        {/* Pillars Cards */}
        <div className="space-y-12">
          {pillarsData.map((pillar, index) => {
            const Icon = pillar.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
              >
                {/* Image/Icon Section */}
                <motion.div
                  initial={isEven ? { opacity: 0, x: -40 } : { opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                  className={isEven ? "order-1" : "order-1 lg:order-2"}
                >
                  <div
                    className={`relative h-80 rounded-2xl bg-gradient-to-br ${pillar.bgGradient} overflow-hidden shadow-lg flex items-center justify-center group`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-32 h-32 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: pillar.bgLight }}
                    >
                      <Icon size={64} style={{ color: pillar.color }} />
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={isEven ? { opacity: 0, x: 40 } : { opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.15 }}
                  className={isEven ? "order-2" : "order-2 lg:order-1"}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: pillar.bgLight }}
                    >
                      <Icon size={24} style={{ color: pillar.color }} />
                    </div>
                    <h3
                      className="font-raleway font-black text-2xl md:text-3xl"
                      style={{ color: pillar.color }}
                    >
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="font-inter text-base md:text-lg text-slate-700 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Action stats or divider */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: pillar.color }}
                    />
                    <p className="text-sm font-poppins font-semibold text-slate-600">
                      Ongoing Initiatives • Community Driven
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
