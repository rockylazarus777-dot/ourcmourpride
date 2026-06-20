export default function TeamIntroSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — heading */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-primary" />
              <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
                Who We Are
              </span>
            </div>

            <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy leading-tight mb-6">
              Leadership &amp;{" "}
              <span className="text-primary">Team</span>
            </h2>

            {/* Orange rule */}
            <div className="w-14 h-1 bg-primary rounded-sm" />
          </div>

          {/* Right — body */}
          <div>
            <p className="font-inter text-base md:text-lg text-navy/65 leading-relaxed mb-6">
              Our team consists of passionate individuals committed to serving communities,
              organising welfare initiatives, coordinating public outreach programs, and
              strengthening citizen engagement across Tamil Nadu.
            </p>

            {/* Inline stats row */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-gray-100">
              {[
                { value: "52+", label: "Initiatives" },
                { value: "1000+", label: "Volunteers" },
                { value: "8", label: "Departments" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-raleway font-black text-2xl text-primary leading-none">
                    {s.value}
                  </p>
                  <p className="font-inter text-xs text-navy/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
