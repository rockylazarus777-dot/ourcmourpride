"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const roadmapStages = [
  {
    year: "Today",
    title: "Awareness & Participation",
    description: "Citizen participation and awareness building across all districts.",
  },
  {
    year: "2027",
    title: "Expanded Outreach",
    description: "Expanded outreach and district-level engagement initiatives.",
  },
  {
    year: "2028",
    title: "Community-Led Growth",
    description: "Community-led development initiatives and local solutions.",
  },
  {
    year: "2029",
    title: "Scaled Impact",
    description: "Large-scale sustainable impact programs and measurable outcomes.",
  },
  {
    year: "2030",
    title: "Future-Ready TN",
    description: "Future-ready Tamil Nadu with measurable progress and achievements.",
  },
];

export default function VisionRoadmap() {
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
            Timeline
          </p>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight max-w-2xl mx-auto">
            Roadmap to <span className="text-primary">2030</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Background animated line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
            className="absolute top-14 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary to-primary-200 origin-left rounded-full"
          />

          {/* Timeline Items */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {roadmapStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                className="relative"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: 0.4 + index * 0.1,
                  }}
                  className="absolute top-8 left-1/2 -translate-x-1/2 z-10"
                >
                  <div className="w-9 h-9 rounded-full bg-white border-4 border-primary shadow-lg flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ translateY: -8 }}
                  className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-6 pt-20 border border-primary-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                >
                  <p className="text-primary font-poppins font-bold text-sm tracking-widest uppercase mb-2">
                    {stage.year}
                  </p>
                  <h4 className="font-poppins font-bold text-lg text-slate-900 mb-3 line-clamp-2">
                    {stage.title}
                  </h4>
                  <p className="font-inter text-sm text-slate-600 leading-relaxed flex-1">
                    {stage.description}
                  </p>

                  {/* Progress indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
                    }}
                    className="mt-4 h-1 bg-gradient-to-r from-primary/70 to-primary rounded-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 px-4 py-8 bg-gradient-to-r from-primary-100 to-primary-50 rounded-2xl border border-primary-200"
        >
          <p className="font-inter text-base md:text-lg text-slate-700">
            Together, we'll transform{" "}
            <span className="font-bold text-primary">
              vision into action
            </span>{" "}
            and build a brighter future for Tamil Nadu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
