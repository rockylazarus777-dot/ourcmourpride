"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Minimal Smart Slider-like hero using banner images that already contain text/composition.
const slides = [
  { id: 1, imageSrc: "/images/cm1.png", alt: "My CM - My Pride campaign banner 1" },
  { id: 2, imageSrc: "/images/cm4.png", alt: "My CM - My Pride campaign banner 2" },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-16 md:pt-20" style={{ minHeight: 800 }}>
      <div className="w-full max-w-full mx-auto h-full" style={{ height: 800 }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          slidesPerView={1}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          effect="fade"
          className="w-full"
          style={{ height: "100%" }}
        >
          {slides.map((s) => (
            <SwiperSlide key={s.id} className="relative w-full" style={{ height: "100%" }}>
              {/* banner image fills the slide; composition must come from image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={s.imageSrc}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                />
              </div>

              {/* Minimal CTA overlay — positioned lower-left, responsive scaling, avoiding PNG composition */}
              <div className="absolute left-4 sm:left-6 md:left-12 lg:left-20 bottom-8 sm:bottom-10 md:bottom-16 lg:bottom-20 z-30 flex gap-2 sm:gap-3">
                <Link href="/about" className="inline-flex items-center gap-1 sm:gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-md transition-colors duration-200">
                  Know More
                </Link>
                <Link href="/news" className="inline-flex items-center gap-1 sm:gap-2 bg-white hover:bg-gray-50 text-gray-900 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-md border border-gray-300 transition-colors duration-200">
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
