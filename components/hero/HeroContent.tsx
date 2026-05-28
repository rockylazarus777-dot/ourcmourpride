import React from "react";
import Link from "next/link";
import { FileText, ChevronRight as ArrowRight } from "lucide-react";

export default function HeroContent({ slide }: { slide: any }) {
  return (
    <div className="space-y-5" style={{ maxWidth: '45%' }}>
      <div className="flex items-center gap-3">
        <span className="w-12 h-0.5 bg-primary rounded-full" />
        <p className="text-xs md:text-sm font-bold font-poppins tracking-widest text-navy/70 uppercase">
          {slide.tagline}
        </p>
        <span className="w-12 h-0.5 bg-primary rounded-full" />
      </div>

      <div>
        <h1 className="font-poppins font-black text-6xl md:text-7xl lg:text-8xl leading-tight text-navy">
          {slide.heading}
        </h1>
        <h2 className="font-poppins font-black text-6xl md:text-7xl lg:text-8xl leading-tight text-primary">
          {slide.headingHighlight}
        </h2>
      </div>

      <p className="text-base md:text-lg text-navy/80 font-inter leading-relaxed max-w-md">
        {slide.description}
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Link href={slide.ctaPrimary.href} className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold font-poppins text-sm tracking-wider px-6 py-3 rounded-md shadow-orange transition-all duration-200 active:scale-95">
          {slide.ctaPrimary.label}
          <ArrowRight size={14} />
        </Link>
        <Link href={slide.ctaSecondary.href} className="flex items-center gap-2 bg-white/90 hover:bg-white border-2 border-navy/10 text-navy font-bold font-poppins text-sm tracking-wider px-5 py-3 rounded-md hover:shadow-md transition-all duration-200 active:scale-95 backdrop-blur-sm">
          <FileText size={14} />
          {slide.ctaSecondary.label}
        </Link>
      </div>
    </div>
  );
}
