"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import EventsHero from "@/components/events/EventsHero";
import AboutMarathon from "@/components/events/AboutMarathon";
import EventCard from "@/components/events/EventCard";
import RegistrationWizard from "@/components/events/RegistrationWizard";

export default function EventsPageClient() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Push content below fixed navbar */}
      <div className="pt-16 md:pt-20">
        <EventsHero onRegisterClick={() => setWizardOpen(true)} />
        <AboutMarathon />
        <EventCard onRegisterClick={() => setWizardOpen(true)} />
      </div>

      <Footer />

      <RegistrationWizard isOpen={wizardOpen} onClose={() => setWizardOpen(false)} />
    </main>
  );
}
