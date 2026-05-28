import Image from "next/image";

export default function HeroImage({ src = "/images/cm4.png", alt = "CM" }: { src?: string; alt?: string }) {
  return (
    <div className="absolute right-0 top-0 h-full w-1/2 lg:w-3/5 pointer-events-none overflow-visible">
      <div className="relative h-full w-full">
        {/* Radial light behind CM */}
        <div className="absolute right-0 top-1/4 w-[520px] h-[520px] rounded-full opacity-30 blur-3xl -translate-x-20" style={{ background: 'radial-gradient(circle at 40% 40%, rgba(255,240,220,0.95), rgba(255,200,140,0.0) 60%)' }} />

        {/* Flag overlay behind shoulder (lower z-index than image) */}
        <div className="hidden md:block absolute bottom-[28%] right-[18%] z-10 transform translate-x-6">
          <div className="w-36 h-20 bg-white/90 rounded-r-md flex items-center justify-center shadow-sm opacity-95">
            <div className="text-xs font-poppins font-bold text-navy text-center">MY CM<br/>MY PRIDE</div>
          </div>
        </div>

        {/* CM image container (large, overflowing) */}
        <div className="absolute bottom-0 right-8 lg:right-16 transform translate-x-12 lg:translate-x-20 z-20">
          <div className="relative w-[520px] sm:w-[620px] md:w-[760px] lg:w-[920px] h-[640px] sm:h-[720px] md:h-[820px] lg:h-[920px]">
            <Image src={src} alt={alt} fill priority style={{ objectFit: 'cover', objectPosition: '60% 40%' }} className="rounded-none" />
          </div>
        </div>

        {/* Subtle particles/confetti */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(10)].map((_, i) => (
            <span key={i} className={`absolute bg-[rgba(255,180,80,0.85)] rounded-full`} style={{ width: `${4 + (i % 3) * 3}px`, height: `${4 + (i % 3) * 3}px`, left: `${10 + i * 8}%`, top: `${8 + (i % 5) * 14}%`, opacity: 0.85 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
