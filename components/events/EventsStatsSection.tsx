"use client";

import { useInView } from "react-intersection-observer";

const stats = [
  {
    value: "52+",
    label: "Community Initiatives",
    description: "Wide-ranging programs across Tamil Nadu",
  },
  {
    value: "1000+",
    label: "Volunteers Engaged",
    description: "Citizens committed to public welfare",
  },
  {
    value: "50+",
    label: "Awareness Programs",
    description: "Educating communities across districts",
  },
  {
    value: "1 Vision",
    label: "Better Tomorrow",
    description: "United purpose for a stronger Tamil Nadu",
  },
];

export default function EventsStatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-16 md:py-20 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Our Impact
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-raleway font-black text-2xl md:text-3xl text-navy">
            Measurable Change Across Communities
          </h2>
        </div>

        {/* Stats grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`
                relative bg-white rounded-sm border border-gray-100
                shadow-card hover:shadow-card-hover
                px-6 py-8 text-center
                transition-all duration-500 hover:-translate-y-1
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              `}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-600 rounded-t-sm" />

              <p className="font-raleway font-black text-4xl md:text-5xl text-primary mb-2 leading-none">
                {stat.value}
              </p>
              <p className="font-poppins font-bold text-sm md:text-base text-navy mb-2">
                {stat.label}
              </p>
              <p className="font-inter text-xs text-navy/50 leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
