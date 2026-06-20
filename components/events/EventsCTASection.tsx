import Link from "next/link";

export default function EventsCTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-navy">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-100 via-navy to-navy/90" />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, #F97316, transparent)" }}
      />

      {/* Orange top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-600 to-primary" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-px bg-primary/60" />
          <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Get Involved
          </span>
          <div className="w-10 h-px bg-primary/60" />
        </div>

        {/* Heading */}
        <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight mb-6 max-w-3xl mx-auto">
          Together We Can Create{" "}
          <span className="text-primary">Greater Impact</span>
        </h2>

        {/* Divider */}
        <div className="w-14 h-1 bg-primary mx-auto mb-7 rounded-sm" />

        {/* Body */}
        <p className="font-inter text-sm md:text-base lg:text-lg text-white/65 leading-relaxed max-w-2xl mx-auto mb-10">
          Community participation is the foundation of meaningful change. Join hands in supporting
          initiatives that uplift lives, strengthen communities, and build a better future for all.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="
            inline-flex items-center gap-2 px-10 py-4 rounded
            bg-primary hover:bg-primary-600
            text-white font-inter font-semibold text-sm tracking-wide
            transition-all duration-300 hover:-translate-y-0.5 hover:shadow-orange
          "
        >
          Join The Movement
          <span className="text-base leading-none">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
