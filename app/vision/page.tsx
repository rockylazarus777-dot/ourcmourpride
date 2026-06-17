import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import VisionHeroSlider from "@/components/hero/VisionHeroSlider";
import VisionIntro from "@/components/sections/VisionIntro";
import VisionPillars from "@/components/sections/VisionPillars";
import VisionRoadmap from "@/components/sections/VisionRoadmap";
import StrategicPriorities from "@/components/sections/StrategicPriorities";
import VisionQuote from "@/components/sections/VisionQuote";

export const metadata: Metadata = {
  title: "Vision | Our CM Our Pride",
  description:
    "Our vision for Tamil Nadu: Building a future rooted in clean, green, healthy, wealthy, and safe communities through collective effort and shared responsibility.",
};

export default function VisionPage() {
  return (
    <>
      <Navbar />
      <VisionHeroSlider />

      <main className="flex-1 bg-white">
        <VisionIntro />
        <VisionPillars />
        <VisionRoadmap />
        <StrategicPriorities />
        <VisionQuote />
      </main>

      <Footer />
    </>
  );
}
