"use client";

import { Star, Shield, Heart, Users, Eye, Flame } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface Value {
  title: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  iconBg: string;
  iconColor: string;
  borderHover: string;
}

const values: Value[] = [
  {
    title: "Leadership",
    description:
      "Guiding communities with purpose, clarity, and a long-term vision for inclusive development.",
    Icon: Star,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderHover: "hover:border-amber-200",
  },
  {
    title: "Integrity",
    description:
      "Operating with honesty and accountability in every initiative, program, and public interaction.",
    Icon: Shield,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-200",
  },
  {
    title: "Service",
    description:
      "Putting citizens first — serving communities before self in every action we take.",
    Icon: Heart,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    borderHover: "hover:border-rose-200",
  },
  {
    title: "Community Impact",
    description:
      "Creating real, measurable change that uplifts lives and strengthens Tamil Nadu's communities.",
    Icon: Users,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    borderHover: "hover:border-teal-200",
  },
  {
    title: "Transparency",
    description:
      "Maintaining open communication, clear reporting, and full visibility in all our work.",
    Icon: Eye,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderHover: "hover:border-indigo-200",
  },
  {
    title: "Dedication",
    description:
      "Committed relentlessly to welfare programs that make a lasting difference for every citizen.",
    Icon: Flame,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    borderHover: "hover:border-orange-200",
  },
];

export default function TeamValuesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              What Drives Us
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy mb-4 leading-tight">
            Our <span className="text-primary">Values</span>
          </h2>

          <p className="font-inter text-sm md:text-base text-navy/60 max-w-xl mx-auto leading-relaxed">
            The principles that guide every decision, initiative, and interaction our team
            undertakes in service of Tamil Nadu&apos;s communities.
          </p>
        </div>

        {/* Values grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {values.map((val, idx) => (
            <div
              key={val.title}
              className={`
                group bg-white border border-gray-100 ${val.borderHover} rounded-sm
                px-6 py-7 shadow-card hover:shadow-card-hover
                transition-all duration-500 hover:-translate-y-1.5
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              {/* Icon */}
              <div
                className={`
                  w-12 h-12 ${val.iconBg} rounded-sm flex items-center justify-center mb-5
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                <val.Icon size={22} className={val.iconColor} />
              </div>

              {/* Orange micro-rule */}
              <div className="w-6 h-0.5 bg-primary mb-3" />

              <h3 className="font-raleway font-bold text-navy text-lg mb-2">
                {val.title}
              </h3>

              <p className="font-inter text-xs text-navy/55 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
