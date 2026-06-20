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
    imageSrc: "/images/cm13.png",
    alt: "Events and Public Welfare Initiatives – Our CM Our Pride",
    imagePosition: "object-center",
  },
  {
    id: 2,
    imageSrc: "/images/our_cm_1600x650.png",
    alt: "Empowering Communities – Our CM Our Pride",
    imagePosition: "object-center",
  },
  {
    id: 3,
    imageSrc: "/images/cm%20event.png",
    alt: "Community Events – Our CM Our Pride",
    imagePosition: "object-[center_30%]",
  },
];

export default function EventsHeroSlider() {
  return (
    <section className="relative w-full overflow-hidden events-hero-slider">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[500px] xl:h-[520px]"
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
                className={`object-obtain `}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
