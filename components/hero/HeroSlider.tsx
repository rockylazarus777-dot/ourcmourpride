"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface HeroSlide {
  id: number;
  imageSrc: string;
  alt: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    imageSrc: "/images/our_cm_1600x650.png",
    alt: "My CM My Pride Banner 1",
  },
  {
    id: 2,
    imageSrc: "/images/cm1.png",
    alt: "My CM My Pride Banner 2",
  }
];

interface HeroSliderProps {
  variant?: "default" | "minimal" | "fullscreen";
  slides?: HeroSlide[];
}

export default function HeroSlider({
  variant = "default",
  slides = defaultSlides,
}: HeroSliderProps) {
  const sectionClasses =
    variant === "minimal"
      ? "relative w-full overflow-x-hidden"
      : variant === "fullscreen"
      ? "relative w-full overflow-hidden"
      : "relative w-full overflow-x-hidden bg-slate-50 pb-14 md:pb-20";

  // Default variant: the slide images are ultra-wide banners (~2.35:1)
  // with the subject on one side and text baked into the other. A
  // viewport-height-driven box (the old h-[55vh]) has nowhere near that
  // aspect ratio on a narrow phone, so object-cover had to crop away
  // most of the image width — cutting off the person and the text at
  // opposite edges. Matching the container's ratio to the image on
  // mobile removes the mismatch instead of just picking a crop that
  // loses less. md/lg keep the original viewport-height treatment
  // untouched, so desktop is visually unchanged.
  const sliderHeightClass =
    variant === "fullscreen"
      ? "h-[calc(100vh-80px)]"
      : "aspect-[2.35/1] md:aspect-auto md:h-[72vh] lg:h-[70vh]";

  return (
    <section className={sectionClasses}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
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
                className="object-cover object-[center_56%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Registration CTA — deliberately placed below the banner rather
          than overlaid on it: both slide images are densely packed
          edge-to-edge (title, date/time/location, a full-width icon
          strip along the bottom, the person on the left), so there is
          no crop-safe zone at any breakpoint to place a button over
          without covering real content. A single static CTA here also
          avoids flicker as the slider auto-rotates between images. */}
      {variant === "default" && (
        <div className="flex justify-center px-4 mt-4 sm:mt-6 md:mt-8">
          <Link
            href="/events/marathon/register"
            className="inline-flex items-center justify-center max-w-[calc(100%-32px)] rounded-lg sm:rounded-xl bg-primary px-5 py-2.5 sm:px-7 sm:py-3.5 font-poppins font-bold text-xs sm:text-sm md:text-base text-white text-center shadow-orange transition-all duration-200 hover:bg-orange-600 hover:scale-[1.02] active:scale-95"
          >
            Register for Mega Marathon 2026
          </Link>
        </div>
      )}
    </section>
  );
}