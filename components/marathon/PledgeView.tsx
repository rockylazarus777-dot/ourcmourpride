"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import StepProgress from "./StepProgress";

const PLEDGE_INTRO_LINES = [
  "I Run for a Healthy Tamil Nadu",
  "I Run for a United Tamil Nadu",
  "I Run for a Stronger Democracy",
];

const PLEDGE_POINTS = [
  "I pledge to be a responsible and active citizen of our society.",
  "I will respect Democracy, the Constitution, Equality and Human Dignity.",
  "I will stand for Unity, Peace and Social Harmony, and respect every individual irrespective of their background.",
  "I pledge to create awareness about Government Welfare Schemes and help ensure that eligible people receive the benefits meant for them.",
  "I will actively support people-centric welfare, education, healthcare, women empowerment, youth development, environmental protection and social responsibility.",
  "I will listen to the needs of my community and contribute my time, knowledge and effort towards finding positive solutions.",
  "I pledge to keep my surroundings Clean, Green, Healthy and Safe.",
  "I will promote fitness, healthy living, road safety and responsible citizenship.",
  "I will never spread hatred, discrimination or misinformation.",
  "I believe that democracy becomes stronger when citizens participate, care and serve.",
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
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="font-poppins font-bold text-base sm:text-lg text-navy text-center mb-4"
          >
            I Pledge Today
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.03 }}
            className="text-center mb-5"
          >
            {PLEDGE_INTRO_LINES.map((line, i) => (
              <p key={i} className="font-inter text-navy/80 text-sm leading-relaxed">
                {line}
              </p>
            ))}
          </motion.div>

          <div className="space-y-3.5" aria-label="Pledge">
            {PLEDGE_POINTS.map((point, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.06 + i * 0.03 }}
                className="font-inter text-navy/75 text-sm leading-relaxed"
              >
                {point}
              </motion.p>
            ))}
          </div>

          <div className="text-center mt-5 pt-5 border-t border-primary/10">
            <p className="font-inter text-navy/75 text-sm leading-relaxed mb-1">Together, let us build a</p>
            <p className="font-poppins font-bold text-sm text-maroon-600 mb-3">
              HEALTHY • UNITED • RESPONSIBLE TAMIL NADU
            </p>
            <p className="font-inter text-navy/75 text-sm italic leading-relaxed">
              “My Voice Matters. My Responsibility Matters. My Nation Matters.”
            </p>
          </div>
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
