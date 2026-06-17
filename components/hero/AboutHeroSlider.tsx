"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    imageSrc: "/images/about cm 1.png",
    alt: "Chief Minister C. Joseph Vijay portrait for About CM hero slide 1",
  },
  {
    id: 3,
    imageSrc: "/images/about cm 3.png",
    alt: "Chief Minister C. Joseph Vijay portrait for About CM hero slide 3",
  },
];

export default function AboutHeroSlider() {
  return (
    <section className="relative w-full mt-20 overflow-hidden bg-slate-50">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="w-full h-[55vh] md:h-[72vh] lg:h-[70vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.imageSrc}
                alt={slide.alt}
                fill
                priority={slide.id === 1}
                sizes="100vw"
                className="object-cover object-[center_5%]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}