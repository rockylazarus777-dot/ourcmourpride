"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Sprout,
  Building2,
  Heart,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Stethoscope,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const initiatives = [
  {
    id: 1,
    title: "Education for All",
    description: "Quality education and better opportunities for every child.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80",
    icon: GraduationCap,
    iconBg: "#3B82F6",
  },
  {
    id: 2,
    title: "Agriculture & Farmers",
    description: "Supporting farmers with better schemes, tools and resources.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80",
    icon: Sprout,
    iconBg: "#22C55E",
  },
  {
    id: 3,
    title: "Infrastructure Development",
    description: "Modern roads, smart cities and world-class facilities.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
    icon: Building2,
    iconBg: "#071B2A",
  },
  {
    id: 4,
    title: "Women Empowerment",
    description: "Empowering women through opportunities, safety and financial independence.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
    icon: Heart,
    iconBg: "#EC4899",
  },
  {
    id: 5,
    title: "Youth & Employment",
    description: "Creating jobs, encouraging startups and building a skilled future.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
    icon: Briefcase,
    iconBg: "#8B5CF6",
  },
  {
    id: 6,
    title: "Clean Water Access",
    description: "Ensuring safe and clean drinking water for all communities.",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=500&q=80",
    icon: Droplets,
    iconBg: "#06B6D4",
  },
  {
    id: 7,
    title: "Healthcare for All",
    description: "Accessible, affordable and quality healthcare reaching every home.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&q=80",
    icon: Stethoscope,
    iconBg: "#F97316",
  },
];

export default function InitiativesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const updateScrollButtons = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.querySelector("[data-card]")?.clientWidth ?? 280;
    sliderRef.current.scrollBy({ left: dir === "left" ? -cardWidth - 20 : cardWidth + 20, behavior: "smooth" });
    setTimeout(updateScrollButtons, 400);
  };

  return (
    <section ref={ref} className="section-padding bg-[#F8F8F8]">
      <div className="container-max">
        {/* Header Row */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              label="OUR INITIATIVES"
              title="Transforming Lives,"
              titleHighlight="Empowering Future"
            />
          </motion.div>

          {/* Arrow buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary flex items-center justify-center text-navy hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary flex items-center justify-center text-navy hover:text-primary transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div
            ref={sliderRef}
            onScroll={updateScrollButtons}
            className="flex gap-5 overflow-x-auto slider-scroll pb-4"
          >
            {initiatives.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  data-card
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="flex-shrink-0 w-56 sm:w-64 md:w-72 bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Floating Icon Badge */}
                    <div
                      className="absolute bottom-3 left-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="font-poppins font-bold text-base text-navy mb-2 group-hover:text-primary transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-navy/60 font-inter leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[#F8F8F8] to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
