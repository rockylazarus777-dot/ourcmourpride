export default function TeamHeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-navy h-[260px] sm:h-[320px] md:h-[400px] lg:h-[460px]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#071B2A] via-[#0D2B40] to-[#051422]" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #F97316 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Decorative rings */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full border border-primary/10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />

      {/* Orange top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-600 to-primary" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                Our CM Our Pride
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-raleway font-black text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-4">
              Our Team
            </h1>

            {/* Orange underline */}
            <div className="w-14 h-1 bg-primary rounded-sm mb-5" />

            {/* Subtitle */}
            <p className="font-inter text-sm md:text-base text-white/70 leading-relaxed max-w-lg">
              Dedicated individuals working together to support community welfare, public service,
              and the vision of Our CM Our Pride.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
