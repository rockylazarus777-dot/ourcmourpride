"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import StepProgress from "./StepProgress";

const PLEDGE_POINTS = [
  "I pledge to make fitness a part of my daily life.",
  "I pledge to protect and preserve a clean, green Tamil Nadu.",
  "I pledge to respect every individual and promote unity among all communities.",
  "I pledge to inspire my family and friends to lead a healthy lifestyle.",
  "I pledge to uphold discipline, honesty, and responsibility in everything I do.",
  "I pledge to support road safety and follow traffic rules at all times.",
  "I pledge to care for nature by reducing waste and conserving resources.",
  "I pledge to encourage sports, physical activity, and positive living in my community.",
  "I pledge to contribute towards building a stronger, healthier, and more empowered Tamil Nadu.",
  "I pledge to stand united with pride, serving my people and my state with dedication.",
];

export default function PledgeView() {
  const router = useRouter();
  const { draft, updateDraft, hydrated } = useMarathonRegistration();

  useEffect(() => {
    if (hydrated && !draft.participantType) {
      router.replace("/events/marathon/register");
    }
  }, [hydrated, draft.participantType, router]);

  if (!draft.participantType) return null;

  return (
    <>
      <StepProgress current={2} />
      <section className="container-max py-10 sm:py-14 max-w-2xl">
        <div className="text-center mb-8">
          <p className="font-poppins font-bold text-xs text-maroon-600 uppercase tracking-widest mb-2">
            Our CM Our Pride
          </p>
          <h1 className="font-poppins font-black text-2xl sm:text-3xl text-navy">The Marathon Pledge</h1>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-5 sm:p-7 mb-6 border border-primary/15 max-h-96 overflow-y-auto overscroll-contain">
          <ul className="space-y-3.5" aria-label="Pledge points">
            {PLEDGE_POINTS.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-6 h-6 bg-primary/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <span className="text-primary font-bold font-poppins text-xs leading-none">{i + 1}</span>
                </div>
                <span className="font-inter text-navy/75 text-sm leading-relaxed">{point}</span>
              </motion.li>
            ))}
          </ul>
          <p className="font-poppins font-bold text-sm text-maroon-600 text-center mt-5 pt-5 border-t border-primary/10">
            Together We Run. Together We Rise. Together We Build a Stronger Tamil Nadu. 🏃🇮🇳
          </p>
        </div>

        <button
          type="button"
          role="checkbox"
          aria-checked={draft.pledgeAccepted}
          onClick={() => updateDraft({ pledgeAccepted: !draft.pledgeAccepted })}
          className={[
            "w-full flex items-center gap-3 p-4 rounded-xl border-2 mb-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            draft.pledgeAccepted ? "border-primary bg-orange-50" : "border-navy/20 bg-white hover:border-primary/30",
          ].join(" ")}
        >
          <div
            className={[
              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
              draft.pledgeAccepted ? "bg-primary border-primary" : "border-navy/30 bg-white",
            ].join(" ")}
            aria-hidden="true"
          >
            {draft.pledgeAccepted && <Check size={11} className="text-white" strokeWidth={3} />}
          </div>
          <span className="font-poppins font-semibold text-sm text-navy text-left">I Agree</span>
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/events/marathon/register")}
            className="flex-1 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300"
          >
            Back
          </button>
          <button
            type="button"
            disabled={!draft.pledgeAccepted}
            onClick={() => router.push("/events/marathon/verify-email")}
            className="flex-[2] bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </section>
    </>
  );
}
