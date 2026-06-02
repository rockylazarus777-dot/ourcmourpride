"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Minimal Smart Slider-like hero using banner images that already contain text/composition.
const slides = [
  { id: 1, imageSrc: "/images/cm1.png", alt: "My CM - My Pride campaign banner 1" },
  { id: 2, imageSrc: "/images/cm4.png", alt: "My CM - My Pride campaign banner 2" },
  { id: 3, imageSrc: "/images/cm3.png", alt: "My CM - My Pride campaign banner 3" },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-x-hidden bg-slate-50 pt-16 md:pt-20 pb-14 md:pb-20">
      <div className="w-full max-w-full mx-auto h-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          effect="fade"
          className="w-full h-[55vh] md:h-[72vh] lg:h-[70vh]"
          wrapperClass="h-full"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id} className="relative w-full h-full">
              {/* banner image fills the slide; composition must come from image */}
              <div className="absolute inset-0 w-full h-full bg-slate-100">
                <Image
                  src={s.imageSrc}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  className="md:object-cover"
                  priority
                />
              </div>

              {/* CTA overlay — sits at the safe floor (64 px above Swiper bottom = stats-bar clearance) */}
              <div className="absolute left-4 sm:left-6 md:left-12 lg:left-20 bottom-16 z-30 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href="/about" className="inline-flex w-full sm:w-auto items-center justify-center gap-1 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-md transition-colors duration-200">
                  Know More
                </Link>
                <Link href="/news" className="inline-flex w-full sm:w-auto items-center justify-center gap-1 sm:gap-2 bg-white hover:bg-gray-50 text-gray-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-md border border-gray-300 transition-colors duration-200">
                  Latest Updates
                </Link>
              </div>

              {/* Swiper navigation elements are injected by Swiper; ensure z-index so they stay visible */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
