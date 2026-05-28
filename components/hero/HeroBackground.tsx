import React from "react";

export default function HeroBackground({ accent = "#FFB74D" }: { accent?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(255,248,231,0.98) 0%, rgba(255,236,210,0.95) 45%, rgba(255,214,170,0.96) 100%)`,
        }}
      />

      {/* radial glow */}
      <div
        className="absolute top-0 right-0 w-3/4 h-full rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle at 70% 40%, ${accent}33, transparent 55%)` }}
      />

      {/* subtle architecture silhouette */}
      <svg className="absolute left-0 bottom-0 w-full opacity-18 blur-sm" viewBox="0 0 1440 180" preserveAspectRatio="none">
        <path d="M0,140 C200,60 400,160 720,120 C1040,80 1240,160 1440,100 L1440,180 L0,180 Z" fill="#071B2A" />
      </svg>

      {/* blurred crowd texture */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-12"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(7,27,42,0.95) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          filter: "blur(6px)",
          transform: 'translateY(20px) scale(1.02)'
        }}
      />

      {/* subtle atmosphere overlay (soft beige haze) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,245,235,0.25) 45%, rgba(255,245,235,0.6) 100%)', mixBlendMode: 'normal' }} />
    </div>
  );
}
