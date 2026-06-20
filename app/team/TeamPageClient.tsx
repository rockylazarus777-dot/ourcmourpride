"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import TeamHeroBanner from "@/components/team/TeamHeroBanner";
import TeamIntroSection from "@/components/team/TeamIntroSection";
import TeamMembersSection from "@/components/team/TeamMembersSection";
import TeamValuesSection from "@/components/team/TeamValuesSection";
import TeamCTASection from "@/components/team/TeamCTASection";

export default function TeamPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <TeamHeroBanner />
        <TeamIntroSection />
        <TeamMembersSection />
        <TeamValuesSection />
        <TeamCTASection />
      </div>
      <Footer />
    </main>
  );
}
