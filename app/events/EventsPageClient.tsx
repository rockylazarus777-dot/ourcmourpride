"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import EventsHeroSlider from "@/components/events/EventsHeroSlider";
import EventsIntroSection from "@/components/events/EventsIntroSection";
import EventsStatsSection from "@/components/events/EventsStatsSection";
import EventsGridSection from "@/components/events/EventsGridSection";
import EventCategoriesSection from "@/components/events/EventCategoriesSection";
import EventsCTASection from "@/components/events/EventsCTASection";

export default function EventsPageClient() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-16 md:pt-20">
        <EventsHeroSlider />
        <EventsIntroSection />
        <EventsStatsSection />
        <EventsGridSection />
        <EventCategoriesSection />
        <EventsCTASection />
      </div>
      <Footer />
    </main>
  );
}
