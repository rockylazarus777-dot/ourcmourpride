"use client";

import {
  Stethoscope,
  Leaf,
  Shield,
  Eye,
  Heart,
  HeartPulse,
  GraduationCap,
  BookOpen,
  Package,
  Brain,
  Wrench,
  Briefcase,
  Lightbulb,
  Globe,
  Trash2,
  Droplet,
  Sparkles,
  CheckCircle2,
  Accessibility,
  Users,
  Home,
  BookMarked,
  Users2,
  Droplets,
  Scale,
  AlertTriangle,
  Car,
  Lock,
  Vote,
  ShoppingBag,
  Sprout,
  Wheat,
  PawPrint,
  Fish,
  Pill,
  Apple,
  Activity,
  Smile,
  Target,
  Library,
  Book,
  Music,
  Trophy,
  Medal,
  AlertOctagon,
  Flame,
  Zap,
  Monitor,
  Building2,
  MessageSquare,
  Flag,
  Award,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { events, categoryConfig } from "./eventsData";

type IconComponent = React.ComponentType<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Stethoscope,
  Leaf,
  Shield,
  Eye,
  Heart,
  HeartPulse,
  GraduationCap,
  BookOpen,
  Package,
  Brain,
  Wrench,
  Briefcase,
  Lightbulb,
  Globe,
  Trash2,
  Droplet,
  Sparkles,
  CheckCircle2,
  Accessibility,
  Users,
  Home,
  BookMarked,
  Users2,
  Droplets,
  Scale,
  AlertTriangle,
  Car,
  Lock,
  Vote,
  ShoppingBag,
  Sprout,
  Wheat,
  PawPrint,
  Fish,
  Pill,
  Apple,
  Activity,
  Smile,
  Target,
  Library,
  Book,
  Music,
  Trophy,
  Medal,
  AlertOctagon,
  Flame,
  Zap,
  Monitor,
  Building2,
  MessageSquare,
  Flag,
  Award,
};

function EventCard({
  event,
  delay,
  parentInView,
}: {
  event: (typeof events)[0];
  delay: number;
  parentInView: boolean;
}) {
  const config = categoryConfig[event.category];
  const IconComponent = iconMap[event.iconName] ?? Heart;

  return (
    <article
      className={`
        group relative bg-white border border-gray-100 rounded-sm
        shadow-card hover:shadow-card-hover
        transition-all duration-500 hover:-translate-y-1.5
        flex flex-col overflow-hidden
        ${parentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top color accent */}
      <div className={`h-0.5 w-full ${config.iconBg}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`
              w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0
              ${config.iconBg} transition-transform duration-300 group-hover:scale-110
            `}
          >
            <IconComponent size={20} className={config.iconColor} />
          </div>

          <span
            className={`
              inline-flex items-center px-2.5 py-0.5 rounded-sm text-[10px] font-inter font-semibold
              leading-relaxed tracking-wide text-right max-w-[130px]
              ${config.badgeColor}
            `}
          >
            {event.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-raleway font-bold text-navy text-sm md:text-[15px] leading-snug mb-2 flex-grow-0">
          {event.title}
        </h3>

        {/* Description */}
        <p className="font-inter text-xs text-navy/55 leading-relaxed mt-auto pt-3 border-t border-gray-50">
          {event.description}
        </p>
      </div>
    </article>
  );
}

export default function EventsGridSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="events-grid" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Programmes
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy mb-4 leading-tight">
            Our <span className="text-primary">Initiatives</span>
          </h2>
          <p className="font-inter text-sm md:text-base text-navy/60 max-w-2xl mx-auto leading-relaxed">
            A wide range of welfare, awareness, educational, environmental, healthcare, and community
            development programs serving citizens across Tamil Nadu.
          </p>
        </div>

        {/* Events grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {events.map((event, idx) => (
            <EventCard
              key={event.id}
              event={event}
              delay={Math.min(idx * 40, 400)}
              parentInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
