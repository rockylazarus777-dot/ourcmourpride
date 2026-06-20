"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { teamMembers, type TeamMember } from "./teamData";

function MemberCard({
  member,
  delay,
  parentInView,
}: {
  member: TeamMember;
  delay: number;
  parentInView: boolean;
}) {
  return (
    <article
      className={`
        group bg-white rounded-lg overflow-hidden
        shadow-card hover:shadow-card-hover
        transition-all duration-500 hover:-translate-y-2
        ${parentInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Portrait — 90% of card */}
      <div className="relative h-[360px] md:h-[400px] lg:h-[440px] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle bottom gradient for name readability on hover */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Name — 10% of card */}
      <div className="px-4 py-3 text-center">
        <div className="w-8 h-0.5 bg-primary mx-auto mb-2" />
        <h3 className="font-raleway font-bold text-navy text-sm md:text-base leading-snug">
          {member.name}
        </h3>
      </div>
    </article>
  );
}

export default function TeamMembersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="team-members" className="py-16 md:py-24 bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-inter text-xs font-semibold tracking-[0.2em] uppercase text-primary">
              The People Behind The Mission
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>

          <h2 className="font-raleway font-black text-3xl md:text-4xl lg:text-5xl text-navy mb-4 leading-tight">
            Meet Our <span className="text-primary">Team</span>
          </h2>

          <p className="font-inter text-sm md:text-base text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Passionate individuals united by a shared vision of service, progress, and community
            development across Tamil Nadu.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
        >
          {teamMembers.map((member, idx) => (
            <MemberCard
              key={member.id}
              member={member}
              delay={Math.min(idx * 80, 400)}
              parentInView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
