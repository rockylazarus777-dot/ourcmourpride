export default function EventsIntroSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              Welfare Initiatives
            </span>
            <div className="w-10 h-px bg-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
            52nd Birthday <div className="inline-block"></div>.{" "}
            <span className="text-primary">52   Public Welfare</span>{" "}
            Initiatives
          </h2>

          {/* Divider */}
          <div className="w-16 h-1 bg-primary mx-auto mb-6 rounded-sm" />

          {/* Body */}
          <p className="font-inter text-base md:text-lg text-navy/65 leading-relaxed">
            Our CM Our Pride is committed to serving communities through impactful programs focused on
            education, healthcare, environmental sustainability, youth empowerment, women&apos;s welfare,
            public awareness, and social development. These initiatives are designed to create meaningful
            change and strengthen community participation across Tamil Nadu.
          </p>
        </div>
      </div>
    </section>
  );
}
