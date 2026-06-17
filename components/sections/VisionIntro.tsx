"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

export default function VisionIntro() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-b from-white via-primary-50/40 to-white"
    >
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/vision-intro.png"
                alt="Our Vision for Tamil Nadu"
                fill
                className="object-cover object-[center_80%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/20 rounded-3xl opacity-10 blur-3xl"
            />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-4">
              <p className="text-primary font-poppins font-bold text-xs tracking-widest uppercase">
                Our Vision
              </p>
            </div>

            <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight mb-6">
              Our Vision for{" "}
              <span className="text-primary">Tamil Nadu</span>
            </h2>

            <div className="space-y-5 mb-8">
              <p className="font-inter text-base md:text-lg text-slate-700 leading-relaxed">
                Tamil Nadu has always stood as a symbol of resilience, innovation, culture, and progress. Our vision is to build upon these strengths by fostering inclusive growth, empowering communities, encouraging sustainable development, and creating opportunities that improve the quality of life for every citizen.
              </p>

              <p className="font-inter text-base md:text-lg text-slate-700 leading-relaxed">
                Through collective effort and shared responsibility, we aspire to create a future-ready Tamil Nadu that leads the nation in education, healthcare, economic development, environmental stewardship, and social well-being.
              </p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ x: 8 }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-700 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 font-inter group"
            >
              Learn More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
