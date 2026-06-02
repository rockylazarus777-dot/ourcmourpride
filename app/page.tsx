import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AboutSection from "@/components/sections/AboutSection";
import MissionSection from "@/components/sections/MissionSection";
import VisionSection from "@/components/sections/VisionSection";
import InitiativesSection from "@/components/sections/InitiativesSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Carousel — full-screen */}
      <Hero />

      {/* Floating Stats Bar — overlaps hero bottom */}
      <StatsBar />

      {/* About Us */}
      <AboutSection />

      {/* Our Mission */}
      <MissionSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Initiatives Horizontal Slider */}
      <InitiativesSection />

      {/* CTA — Email Capture */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
