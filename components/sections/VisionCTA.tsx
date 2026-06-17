"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

export default function VisionCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/vision-cta-bg.jpg"
          alt="Join the movement background"
          fill
          className="object-cover"
          quality={75}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/80 to-slate-900/85" />
      </div>

      {/* Content */}
      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-raleway font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Join the Journey Towards a{" "}
            <span className="text-primary">Better Tomorrow</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-base md:text-xl text-white/90 leading-relaxed mb-8"
          >
            Together, we can contribute to a cleaner, greener, healthier, wealthier, and safer Tamil Nadu. Every action, every voice, every contribution matters.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1 w-16 bg-gradient-to-r from-primary/70 to-primary rounded-full mx-auto mb-10 origin-center"
          />

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-poppins font-bold px-8 py-4 rounded-full transition-all duration-300 group shadow-lg hover:shadow-xl text-lg"
            >
              Join the Movement
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-poppins font-bold px-8 py-4 rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 backdrop-blur-sm text-lg"
            >
              Explore Initiatives
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-inter text-sm text-white/70 mt-10"
          >
            Share your ideas • Volunteer • Participate • Make a difference
          </motion.p>
        </motion.div>

        {/* Bottom Accent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-16 pt-12 border-t border-white/10 text-center"
        >
          <p className="font-inter text-white/60 mb-4">
            Be part of the vision. Together, we build Tamil Nadu's future.
          </p>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <span className="text-primary font-poppins font-semibold text-sm">
              ↓ Scroll down to stay updated
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
