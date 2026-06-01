"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import AgeStep from "./steps/AgeStep";
import PledgeStep from "./steps/PledgeStep";
import DetailsStep from "./steps/DetailsStep";
import SuccessScreen from "./SuccessScreen";
import { AgeCategory, Prefix, RegistrationFormData, RegistrationStep } from "@/types/events";
import type { MarathonRegistrationInsert } from "@/types/supabase";

interface RegistrationWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM: RegistrationFormData = {
  ageCategory: null,
  pledgeAccepted: false,
  prefix: "",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  pinCode: "",
  photo: null,
  guardianName: "",
  guardianMobile: "",
  guardianConsent: false,
};

function generateRegistrationId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MPM-${ts}-${rand}`;
}

const STEP_LABELS = ["Age Category", "Pledge", "Details"] as const;

export default function RegistrationWizard({ isOpen, onClose }: RegistrationWizardProps) {
  const [step, setStep] = useState<RegistrationStep>(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Keyboard: close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const resetWizard = () => {
    setStep(1);
    setFormData(INITIAL_FORM);
    setErrors({});
    setLoading(false);
    setRegistrationId("");
    setSubmitted(false);
  };

  const handleClose = () => {
    resetWizard();
    onClose();
  };

  /* ── Validators ── */
  const validateAge = (): boolean => {
    if (!formData.ageCategory) {
      setErrors({ ageCategory: "Please select your age category to continue." });
      return false;
    }
    return true;
  };

  const validatePledge = (): boolean => {
    if (!formData.pledgeAccepted) {
      setErrors({ pledge: "You must accept the pledge to continue." });
      return false;
    }
    return true;
  };

  const validateDetails = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.prefix) e.prefix = "Please select a prefix.";
    if (!formData.fullName.trim()) e.fullName = "Full name is required.";
    if (!formData.gender) e.gender = "Please select your gender.";
    if (!formData.dateOfBirth) e.dateOfBirth = "Date of birth is required.";
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone))
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address.";
    if (!formData.pinCode || !/^\d{6}$/.test(formData.pinCode))
      e.pinCode = "Enter a valid 6-digit pin code.";

    if (formData.ageCategory === "below_18") {
      if (!formData.guardianName.trim()) e.guardianName = "Guardian name is required.";
      if (!formData.guardianMobile || !/^[6-9]\d{9}$/.test(formData.guardianMobile))
        e.guardianMobile = "Enter a valid guardian mobile number.";
      if (!formData.guardianConsent) e.guardianConsent = "Guardian consent is required.";
    }

    if (formData.photo && formData.photo.size > 5 * 1024 * 1024)
      e.photo = "Photo must be less than 5 MB.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!validateDetails()) return;
    setLoading(true);
    try {
      const id = generateRegistrationId();

      /* Supabase-ready payload (snake_case column names). */
      const payload: MarathonRegistrationInsert = {
        registration_id: id,
        event_name: "Mega Pink Marathon",
        age_category: formData.ageCategory as AgeCategory,
        prefix: formData.prefix as Prefix,
        full_name: formData.fullName,
        gender: formData.gender,
        date_of_birth: formData.dateOfBirth,
        phone: formData.phone,
        email: formData.email,
        pin_code: formData.pinCode,
        pledge_accepted: formData.pledgeAccepted,
        ...(formData.ageCategory === "below_18" && {
          guardian_name: formData.guardianName,
          guardian_mobile: formData.guardianMobile,
          guardian_consent: formData.guardianConsent,
        }),
      };

      /*
       * TODO: POST to your API route, e.g.:
       * await fetch("/api/events/register", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify(payload),
       * });
       */
      void payload; // remove this line once the fetch call above is uncommented

      /* Simulated network delay — replace with real API call above */
      await new Promise((r) => setTimeout(r, 1400));

      setRegistrationId(id);
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mega Pink Marathon Registration"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal header ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100 flex-shrink-0">
              <div>
                <p className="font-poppins font-bold text-xs text-pink-500 uppercase tracking-widest">
                  Registration
                </p>
                <p className="font-poppins font-black text-base text-navy leading-tight">
                  Mega Pink Marathon
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close registration"
                className="w-9 h-9 rounded-full flex items-center justify-center text-navy/40 hover:text-navy hover:bg-navy/8 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
              >
                <X size={18} />
              </button>
            </div>

            {/* ── Progress bar ── */}
            {!submitted && (
              <div className="px-6 pt-4 pb-1 flex-shrink-0" aria-label="Registration progress">
                <div className="flex items-center gap-2">
                  {STEP_LABELS.map((label, i) => {
                    const stepNum = (i + 1) as RegistrationStep;
                    const isActive = stepNum <= step;
                    return (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                        <div
                          className={[
                            "w-full h-1.5 rounded-full transition-all duration-500",
                            isActive
                              ? "bg-gradient-to-r from-pink-500 to-rose-500"
                              : "bg-pink-100",
                          ].join(" ")}
                          role="progressbar"
                          aria-valuenow={isActive ? 100 : 0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`Step ${stepNum}: ${label}`}
                        />
                        <span
                          className={[
                            "font-inter text-xs transition-colors hidden sm:block",
                            isActive ? "text-pink-600 font-semibold" : "text-navy/35",
                          ].join(" ")}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Step content ── */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <SuccessScreen
                    key="success"
                    registrationId={registrationId}
                    email={formData.email}
                    onBack={handleClose}
                  />
                ) : step === 1 ? (
                  <AgeStep
                    key="step-1"
                    selected={formData.ageCategory}
                    onSelect={(cat) => updateField("ageCategory", cat)}
                    onNext={() => {
                      if (validateAge()) {
                        setErrors({});
                        setStep(2);
                      }
                    }}
                    error={errors.ageCategory ?? ""}
                  />
                ) : step === 2 ? (
                  <PledgeStep
                    key="step-2"
                    accepted={formData.pledgeAccepted}
                    onAccept={(val) => updateField("pledgeAccepted", val)}
                    onNext={() => {
                      if (validatePledge()) {
                        setErrors({});
                        setStep(3);
                      }
                    }}
                    onBack={() => {
                      setErrors({});
                      setStep(1);
                    }}
                    error={errors.pledge ?? ""}
                  />
                ) : (
                  <DetailsStep
                    key="step-3"
                    ageCategory={formData.ageCategory!}
                    formData={formData}
                    onChange={updateField}
                    onSubmit={handleSubmit}
                    onBack={() => {
                      setErrors({});
                      setStep(2);
                    }}
                    errors={errors}
                    loading={loading}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
