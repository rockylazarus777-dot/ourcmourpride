"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  Leaf,
  BookOpen,
  Users,
} from "lucide-react";

const futureVisions = [
  {
    icon: Building2,
    title: "Smart Cities",
    description: "Modern infrastructure with technology-enabled urban development.",
    image: "/images/vision-smart-cities.jpg",
    color: "#3B82F6",
    bgLight: "#DBEAFE",
  },
  {
    icon: Leaf,
    title: "Green Environment",
    description: "Sustainable ecosystems and environmental conservation.",
    image: "/images/vision-green-env.jpg",
    color: "#22C55E",
    bgLight: "#DCFCE7",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    description: "World-class learning opportunities for every child.",
    image: "/images/vision-education.jpg",
    color: "#F59E0B",
    bgLight: "#FEF3C7",
  },
  {
    icon: Users,
    title: "Strong Communities",
    description: "Empowered, connected, and thriving communities.",
    image: "/images/vision-communities.jpg",
    color: "#EC4899",
    bgLight: "#FCE7F3",
  },
];

export default function FutureOfTN() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-poppins font-bold text-xs tracking-widest uppercase mb-3">
            Future Vision
          </p>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-2xl mx-auto">
            Envisioning the <span className="text-primary">Future</span>
          </h2>
          <p className="font-inter text-base md:text-lg text-slate-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Our aspiration is to build a Tamil Nadu where innovation drives growth, sustainability protects resources, healthcare improves well-being, education empowers every child, and communities thrive together.
          </p>
        </motion.div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {futureVisions.map((vision, index) => {
            const Icon = vision.icon;
            return (
              <motion.div
                key={vision.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-80"
              >
                {/* Background Image */}
                <Image
                  src={vision.image}
                  alt={vision.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white"
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: vision.bgLight }}
                  >
                    <Icon size={28} style={{ color: vision.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="font-raleway font-black text-2xl md:text-3xl mb-2 group-hover:translate-x-2 transition-transform">
                    {vision.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm md:text-base text-white/90 leading-relaxed">
                    {vision.description}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="mt-4 h-1 w-12 bg-gradient-to-r from-primary/70 to-primary rounded-full origin-left"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
