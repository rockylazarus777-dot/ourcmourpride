import type { Metadata } from "next";
import AboutCM from "@/components/sections/AboutCM";
import AboutPremiumHighlights from "@/components/sections/AboutPremiumHighlights";
import AboutHeroSlider from "@/components/hero/AboutHeroSlider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "About CM | Our CM Our Pride",
  description:
    "Content for this section is currently being prepared and will be available soon.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutHeroSlider />

      <main className="flex-1 bg-white">
        <AboutCM />
        <AboutPremiumHighlights />
      </main>

      <Footer />
    </>
  );
}
