"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

export interface HeroSlide {
  id: number;
  imageSrc: string;
  alt: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    imageSrc: "/images/cm1.png",
    alt: "My CM My Pride Banner 1",
  },
];

interface HeroSliderProps {
  variant?: "default" | "minimal" | "fullscreen";
  slides?: HeroSlide[];
  showNavigation?: boolean;
}

export default function HeroSlider({
  variant = "default",
  slides = defaultSlides,
  showNavigation = true,
}: HeroSliderProps) {
  const sectionClasses =
    variant === "minimal"
      ? "relative w-full overflow-x-hidden"
      : variant === "fullscreen"
      ? "relative w-full overflow-hidden"
      : "relative w-full overflow-x-hidden bg-slate-50 pb-14 md:pb-20";

  const sliderHeightClass =
    variant === "fullscreen"
      ? "h-[calc(100vh-80px)]"
      : "h-[55vh] md:h-[72vh] lg:h-[70vh]";

  return (
    <section className={sectionClasses}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        slidesPerView={1}
        loop
        effect="fade"
        navigation={showNavigation}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        className={`w-full ${sliderHeightClass}`}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[center_54%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}