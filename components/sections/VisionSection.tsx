"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, TrendingUp, Lightbulb, Shield, UserCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const visionCards = [
  {
    id: 1,
    icon: Users,
    title: "People First",
    description:
      "Putting people's needs and well-being at the heart of every decision.",
    iconColor: "#22C55E",
    iconBg: "#DCFCE7",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Progress for All",
    description:
      "Inclusive growth that creates opportunities for every citizen.",
    iconColor: "#3B82F6",
    iconBg: "#DBEAFE",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Future Ready",
    description:
      "Building infrastructure, encouraging innovation and creating a strong foundation.",
    iconColor: "#F97316",
    iconBg: "#FFF7ED",
  },
  {
    id: 4,
    icon: Shield,
    title: "Transparent Governance",
    description:
      "Committed to honesty, accountability and people's trust.",
    iconColor: "#8B5CF6",
    iconBg: "#EDE9FE",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function VisionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-6"
          >
            <SectionHeading
              label="OUR VISION"
              title="Building a Stronger"
              titleHighlight="& Better Tomorrow"
              description="Our Hon'ble Chief Minister envisions a state where every citizen lives with dignity, every child dreams fearlessly, and every family prospers with opportunities."
            />

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 border-2 border-navy/20 hover:border-primary text-navy hover:text-primary font-poppins font-semibold text-sm px-6 py-3 rounded-lg transition-all duration-200"
              >
                <UserCircle size={16} />
                ABOUT OUR CM
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Vision Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {visionCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants}
                  whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card cursor-default transition-shadow duration-300"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: card.iconBg }}
                  >
                    <Icon size={24} style={{ color: card.iconColor }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-poppins font-bold text-base md:text-lg text-navy mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-navy/60 font-inter leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
