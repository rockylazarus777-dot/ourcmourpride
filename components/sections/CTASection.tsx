"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronRight, CheckCircle, AlertCircle } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    // Simulate API call — replace with Supabase insert in Phase 2
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F97316 0%, #EA580C 45%, #C2410C 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle top-left */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
        {/* Medium circle bottom-right */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Raising hands SVG — right side */}
        <div className="absolute right-0 bottom-0 w-64 md:w-80 lg:w-96 opacity-20">
          <svg viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Multiple raised hands silhouettes */}
            {[
              { x: 20, h: 180, delay: 0 },
              { x: 55, h: 220, delay: 1 },
              { x: 90, h: 200, delay: 2 },
              { x: 125, h: 240, delay: 0.5 },
              { x: 160, h: 180, delay: 1.5 },
              { x: 195, h: 210, delay: 0.8 },
              { x: 230, h: 190, delay: 1.2 },
              { x: 265, h: 230, delay: 0.3 },
              { x: 300, h: 200, delay: 1.8 },
              { x: 335, h: 170, delay: 0.6 },
              { x: 370, h: 220, delay: 1.4 },
            ].map(({ x, h }, i) => (
              <g key={i}>
                {/* Arm */}
                <rect x={x} y={280 - h} width={16} height={h} rx={8} fill="white" />
                {/* Hand */}
                <ellipse cx={x + 8} cy={280 - h} rx={9} ry={14} fill="white" />
                {/* Fingers */}
                {[0, 1, 2, 3].map((f) => (
                  <rect
                    key={f}
                    x={x + 1 + f * 4}
                    y={280 - h - 18}
                    width={3}
                    height={10}
                    rx={1.5}
                    fill="white"
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="flex gap-3">
              {/* Big quote mark */}
              <span className="text-white/40 font-serif text-8xl leading-none mt-[-16px] flex-shrink-0">
                &ldquo;
              </span>
              <div>
                <p className="text-white/80 font-poppins font-medium text-base md:text-lg leading-relaxed italic">
                  Together, let&apos;s build a state we are proud of.
                </p>
                <p className="text-white font-poppins font-bold text-base md:text-lg mt-2">
                  Together, My CM, My Pride!
                </p>
                {/* Signature */}
                <div className="mt-4">
                  <svg
                    viewBox="0 0 160 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-36 opacity-80"
                  >
                    <path
                      d="M10 30 Q30 10 50 25 Q70 40 90 15 Q110 0 130 20 Q145 30 155 20"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M20 35 Q50 30 80 35 Q110 40 140 30"
                      stroke="white"
                      strokeWidth="1"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center: CTA Content + Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8"
          >
            <div className="text-center lg:text-left">
              <h2 className="font-poppins font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-3">
                BE A PART OF
                <br />
                THE CHANGE
              </h2>
              <p className="text-white/80 font-inter text-sm md:text-base mb-8">
                Join the movement and contribute towards a brighter future.
              </p>

              {/* Email Form */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4 max-w-lg mx-auto lg:mx-0"
                >
                  <CheckCircle size={24} className="text-white flex-shrink-0" />
                  <div>
                    <p className="text-white font-poppins font-bold text-sm">
                      You&apos;re now part of the movement!
                    </p>
                    <p className="text-white/80 text-xs mt-0.5">
                      We&apos;ll keep you updated with the latest news and initiatives.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0"
                  noValidate
                >
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg("");
                      }}
                      placeholder="Enter your email address"
                      className="w-full px-5 py-3.5 rounded-xl bg-white text-navy placeholder:text-gray-400 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                      aria-label="Email address"
                    />
                    {errorMsg && (
                      <p className="flex items-center gap-1.5 text-xs text-white/90 mt-1.5 pl-1">
                        <AlertCircle size={12} />
                        {errorMsg}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 bg-navy hover:bg-navy/80 disabled:bg-navy/60 text-white font-poppins font-bold text-sm tracking-wider px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap shadow-lg"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        JOINING...
                      </span>
                    ) : (
                      <>
                        JOIN NOW
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
