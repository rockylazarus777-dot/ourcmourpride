"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Copy } from "lucide-react";
import { useState } from "react";

interface SuccessScreenProps {
  registrationId: string;
  email: string;
  onBack: () => void;
}

export default function SuccessScreen({ registrationId, email, onBack }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const copyId = async () => {
    await navigator.clipboard.writeText(registrationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="p-8 sm:p-10 text-center"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 18 }}
        className="flex items-center justify-center mb-6"
      >
        <div className="relative">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 size={52} className="text-green-500" />
          </div>
          {/* Ping rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-400"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 1.2, repeat: 2, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-poppins font-black text-2xl sm:text-3xl text-navy mb-3">
          Registration Submitted Successfully
        </h2>

        <p className="font-inter text-navy/65 text-sm sm:text-base leading-relaxed mb-2">
          Thank you for registering for the{" "}
          <span className="font-semibold text-pink-600">Mega Pink Marathon</span>.
        </p>
        <p className="font-inter text-navy/65 text-sm sm:text-base leading-relaxed mb-8">
          A confirmation email has been sent to{" "}
          <span className="font-semibold text-navy">{email}</span>.
        </p>

        {/* Registration ID */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-5 mb-8 inline-block w-full max-w-xs">
          <p className="font-poppins font-semibold text-xs text-navy/50 uppercase tracking-widest mb-2">
            Your Registration ID
          </p>
          <div className="flex items-center justify-center gap-2">
            <p className="font-poppins font-black text-xl text-pink-700 tracking-wide">
              {registrationId}
            </p>
            <button
              type="button"
              onClick={copyId}
              aria-label="Copy registration ID"
              className="text-pink-400 hover:text-pink-600 transition-colors p-1"
            >
              {copied ? (
                <CheckCircle2 size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <p className="font-inter text-xs text-navy/40 mt-2">
            Keep this ID for your reference
          </p>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-[0_4px_20px_rgba(236,72,153,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          <ArrowLeft size={16} />
          Back to Events
        </button>
      </motion.div>
    </motion.div>
  );
}
