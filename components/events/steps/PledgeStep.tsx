"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const pledgePoints = [
  "Promote awareness about breast cancer and encourage early detection for healthier communities.",
  "Support equal access to healthcare, screenings, and medical guidance for every woman.",
  "Encourage regular self-examinations and preventive health practices.",
  "Stand with breast cancer patients, survivors, and caregivers with compassion and respect.",
  "Help remove stigma, fear, and misinformation surrounding breast cancer.",
  "Promote healthy lifestyles that contribute to long-term well-being and disease prevention.",
  "Participate in awareness campaigns and community health initiatives.",
  "Encourage families and communities to prioritize women's health and wellness.",
  "Inspire hope, strength, and unity in the fight against breast cancer.",
  "Contribute towards building a healthier, more aware, and sustainable future for all.",
];

interface PledgeStepProps {
  accepted: boolean;
  onAccept: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  error: string;
}

export default function PledgeStep({ accepted, onAccept, onNext, onBack, error }: PledgeStepProps) {
  return (
    <motion.div
      key="pledge-step"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.38 }}
      className="p-6 sm:p-8"
    >
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="font-poppins font-black text-2xl sm:text-3xl text-navy mb-2">
          Pink Marathon Pledge
        </h2>
        <p className="font-poppins font-semibold text-sm text-pink-600 uppercase tracking-wider">
          I Promise To
        </p>
      </div>

      {/* Pledge list */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 sm:p-6 mb-5 border border-pink-100 max-h-72 overflow-y-auto overscroll-contain">
        <ul className="space-y-3.5" aria-label="Pledge points">
          {pledgePoints.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <span className="text-pink-700 font-bold font-poppins text-xs leading-none">
                  {i + 1}
                </span>
              </div>
              <span className="font-inter text-navy/70 text-sm leading-relaxed">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Pledge checkbox */}
      <button
        type="button"
        role="checkbox"
        aria-checked={accepted}
        onClick={() => onAccept(!accepted)}
        className={[
          "w-full flex items-center gap-3 p-4 rounded-xl border-2 mb-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
          accepted
            ? "border-pink-500 bg-pink-50"
            : "border-navy/20 bg-white hover:border-pink-300",
        ].join(" ")}
      >
        <div
          className={[
            "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
            accepted ? "bg-pink-500 border-pink-500" : "border-navy/30 bg-white",
          ].join(" ")}
          aria-hidden="true"
        >
          {accepted && <Check size={11} className="text-white" strokeWidth={3} />}
        </div>
        <span className="font-poppins font-semibold text-sm text-navy text-left">
          I Take This Pledge
        </span>
      </button>

      {error && (
        <p role="alert" className="text-red-500 text-xs font-inter mb-4 text-center">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-[2] bg-gradient-to-r from-pink-600 to-rose-600 text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-[0_4px_16px_rgba(236,72,153,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          I Pledge
        </button>
      </div>
    </motion.div>
  );
}
