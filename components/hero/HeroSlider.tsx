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
    imageSrc: "/images/cm1.png",
    alt: "My CM My Pride Banner 1",
  },
  {
    id: 2,
    imageSrc: "/images/our_cm_1600x650.png",
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
        {slides.map((slide) => {
          const image = (
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_56%]"
            />
          );

          // Only the Mega Marathon banner is clickable — it links straight
          // to registration. Other slides render as before (plain, non-link).
          const isMarathonBanner = slide.imageSrc === "/images/our_cm_1600x650.png";

          return (
            <SwiperSlide key={slide.id}>
              {isMarathonBanner ? (
                <Link
                  href="/events/marathon/register"
                  className="relative block w-full h-full cursor-pointer"
                  aria-label="Register for Our CM Our Pride Mega Marathon 2026"
                >
                  {image}
                </Link>
              ) : (
                <div className="relative w-full h-full">{image}</div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}