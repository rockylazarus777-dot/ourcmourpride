"use client";

import {
  Stethoscope,
  GraduationCap,
  Shield,
  Leaf,
  Users,
  Sprout,
  AlertTriangle,
  Trophy,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useInView } from "react-intersection-observer";

type IconComponent = React.ComponentType<LucideProps>;

interface Category {
  title: string;
  Icon: IconComponent;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

const categories: Category[] = [
  {
    title: "Healthcare & Wellness",
    Icon: Stethoscope,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    borderColor: "hover:border-rose-200",
  },
  {
    title: "Education & Youth Development",
    Icon: GraduationCap,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "hover:border-blue-200",
  },
  {
    title: "Women Empowerment",
    Icon: Shield,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "hover:border-purple-200",
  },
  {
    title: "Environment & Sustainability",
    Icon: Leaf,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "hover:border-emerald-200",
  },
  {
    title: "Community Welfare",
    Icon: Users,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    borderColor: "hover:border-teal-200",
  },
  {
    title: "Agriculture & Rural Development",
    Icon: Sprout,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    borderColor: "hover:border-amber-200",
  },
  {
    title: "Public Awareness & Safety",
    Icon: AlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    borderColor: "hover:border-orange-200",
  },
  {
    title: "Culture & Sports",
    Icon: Trophy,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    borderColor: "hover:border-indigo-200",
  },
];

export default function EventCategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Categories
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy mb-4 leading-tight">
            Initiative <span className="text-primary">Categories</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Our programs span eight key areas of community development, each designed to address
            the specific needs and aspirations of citizens across Tamil Nadu.
          </p>
        </div>

        {/* Category grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5"
        >
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`
                group bg-white border border-gray-100 ${cat.borderColor}
                rounded-sm px-5 py-7 text-center
                shadow-card hover:shadow-card-hover
                transition-all duration-500 hover:-translate-y-1.5
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              {/* Icon */}
              <div
                className={`
                  w-14 h-14 ${cat.iconBg} rounded-sm flex items-center justify-center mx-auto mb-4
                  transition-transform duration-300 group-hover:scale-110
                `}
              >
                <cat.Icon size={24} className={cat.iconColor} />
              </div>

              {/* Title */}
              <p className="font-raleway font-bold text-navy text-sm leading-snug">
                {cat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
