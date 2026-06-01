"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export interface ComingSoonPageProps {
  title: string;
  description: string;
}

/* ── Inline SVG illustration ─────────────────────────────────────────── */
function PageIllustration() {
  return (
    <div className="relative w-72 h-56 mx-auto select-none" aria-hidden="true">
      {/* Soft glow blobs behind the card */}
      <div className="absolute -top-4 -right-4 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-70" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-50 rounded-full blur-2xl" />

      {/* Card */}
      <motion.div
        initial={{ y: 8 }}
        animate={{ y: -8 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-6 bg-white rounded-2xl shadow-[0_12px_48px_rgba(7,27,42,0.10)] overflow-hidden"
      >
        {/* Orange header bar */}
        <div className="h-11 bg-gradient-to-r from-primary to-orange-400 flex items-center gap-2 px-4">
          <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        </div>

        {/* Skeleton content lines */}
        <div className="p-5 space-y-3">
          <div className="h-2.5 bg-navy/10 rounded-full w-3/4" />
          <div className="h-2 bg-navy/[0.07] rounded-full w-1/2" />
          <div className="h-2 bg-navy/[0.07] rounded-full w-2/3" />
          <div className="pt-3 border-t border-navy/[0.05] space-y-2">
            <div className="h-2 bg-navy/[0.05] rounded-full w-full" />
            <div className="h-2 bg-navy/[0.05] rounded-full w-5/6" />
            <div className="h-2 bg-navy/[0.05] rounded-full w-4/5" />
          </div>
        </div>
      </motion.div>

      {/* Floating clock badge */}
      <motion.div
        initial={{ scale: 0.92 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute bottom-2 right-2 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-[0_6px_24px_rgba(249,115,22,0.45)]"
      >
        <Clock size={24} className="text-white" strokeWidth={2} />
      </motion.div>

      {/* Small decorative dots */}
      <div className="absolute top-6 left-0 flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="pt-16 md:pt-20 flex-1 flex flex-col">
        <section className="flex-1 flex items-center justify-center px-4 py-20 overflow-hidden relative">
          {/* Page-level background decoration */}
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
            {/* Illustration */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12"
            >
              <PageIllustration />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-primary font-poppins font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Coming Soon
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mb-4"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-inter text-navy/60 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-10"
            >
              {description}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 bg-primary hover:bg-orange-600 text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-lg shadow-orange hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ArrowLeft size={15} />
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
