"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface EventsHeroProps {
  onRegisterClick: () => void;
}

export default function EventsHero({ onRegisterClick }: EventsHeroProps) {
  const scrollToAbout = () => {
    document.getElementById("about-marathon")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-pink-700 to-rose-500" />

      {/* Subtle radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,182,193,0.25)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.3)_0%,transparent_60%)]" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-400/20 blur-[80px] -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-rose-300/15 blur-[60px] translate-y-1/4 -translate-x-1/4" />

      {/* Floating ribbon SVGs */}
      <motion.svg
        viewBox="0 0 80 80"
        fill="none"
        className="absolute top-24 right-[8%] w-16 h-16 sm:w-20 sm:h-20 text-pink-300/25"
        animate={{ rotate: 360, y: [0, -12, 0] }}
        transition={{ rotate: { duration: 24, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <path d="M40 8C40 8 20 24 20 44C20 56 29 64 40 64C51 64 60 56 60 44C60 24 40 8 40 8Z" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M40 44C40 44 28 52 28 60C28 68 33.6 72 40 72C46.4 72 52 68 52 60C52 52 40 44 40 44Z" fill="currentColor" opacity="0.4" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 60 60"
        fill="none"
        className="absolute bottom-36 left-[6%] w-12 h-12 sm:w-16 sm:h-16 text-pink-200/20"
        animate={{ rotate: -360, y: [0, 10, 0] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, y: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
      >
        <path d="M30 6C30 6 15 18 15 33C15 42 21.8 48 30 48C38.2 48 45 42 45 33C45 18 30 6 30 6Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M30 33C30 33 21 39 21 45C21 51 25.2 54 30 54C34.8 54 39 51 39 45C39 39 30 33 30 33Z" fill="currentColor" opacity="0.35" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 50 50"
        fill="none"
        className="absolute top-1/3 left-[3%] w-10 h-10 text-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="25" cy="25" r="10" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-pink-300 rounded-full animate-pulse" />
            <span className="font-poppins font-semibold text-xs sm:text-sm text-white tracking-wider uppercase">
              Breast Cancer Awareness Initiative
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white mb-5"
          >
            Mega{" "}
            <span className="text-pink-200 drop-shadow-[0_2px_20px_rgba(255,182,193,0.6)]">
              Pink
            </span>{" "}
            <br className="hidden sm:block" />
            Marathon
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-poppins font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-pink-100 mb-6 tracking-wide"
          >
            Run for Awareness.&nbsp; Run for Hope.&nbsp; Run for Life.
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-inter text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            A powerful people&apos;s movement dedicated to creating a Breast Cancer Free Tamil Nadu
            by 2030 through awareness, early detection, education, and community participation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-2 bg-white text-pink-700 font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:bg-pink-50 transition-all duration-300 min-w-[180px]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Register Now
            </motion.button>

            <motion.button
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/50 text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 min-w-[180px]"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/90 transition-colors duration-300 focus:outline-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down to learn more"
      >
        <span className="font-inter text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  );
}
