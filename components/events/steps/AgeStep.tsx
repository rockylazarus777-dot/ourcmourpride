"use client";

import { motion } from "framer-motion";
import { AgeCategory } from "@/types/events";

interface AgeStepProps {
  selected: AgeCategory | null;
  onSelect: (cat: AgeCategory) => void;
  onNext: () => void;
  error: string;
}

const categories: { value: AgeCategory; label: string; emoji: string }[] = [
  { value: "below_18", label: "Below 18", emoji: "🌱" },
  { value: "above_18", label: "Above 18", emoji: "💪" },
];

export default function AgeStep({ selected, onSelect, onNext, error }: AgeStepProps) {
  return (
    <motion.div
      key="age-step"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.38 }}
      className="p-6 sm:p-8"
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="font-poppins font-black text-2xl sm:text-3xl text-navy mb-2">
          Ready to Make a Difference?
        </h2>
        <p className="font-inter text-navy/55 text-sm">Begin Your Pledge.</p>
      </div>

      {/* Card */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 sm:p-7 mb-6 border border-pink-100">
        <h3 className="font-poppins font-bold text-base text-navy text-center mb-1">
          Select Your Age Category
        </h3>
        <p className="font-inter text-navy/55 text-sm text-center mb-6">Are you?</p>

        <div
          role="radiogroup"
          aria-label="Age category"
          className="flex flex-col sm:flex-row gap-4"
        >
          {categories.map(({ value, label, emoji }) => {
            const isSelected = selected === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelect(value)}
                className={[
                  "flex-1 flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
                  isSelected
                    ? "border-pink-500 bg-white shadow-md"
                    : "border-pink-200 bg-white/60 hover:border-pink-300 hover:bg-white/90",
                ].join(" ")}
              >
                {/* Radio circle */}
                <div
                  className={[
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    isSelected ? "border-pink-500" : "border-navy/30",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 rounded-full bg-pink-500"
                    />
                  )}
                </div>

                <div>
                  <span className="text-xl mr-1">{emoji}</span>
                  <span className="font-poppins font-bold text-navy text-sm">{label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {error && (
          <p role="alert" className="text-red-500 text-xs font-inter mt-3 text-center">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-[0_4px_16px_rgba(236,72,153,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
      >
        Next
      </button>
    </motion.div>
  );
}
