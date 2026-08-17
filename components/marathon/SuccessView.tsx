"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowRight } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import { PARTICIPANT_LABELS } from "@/types/marathon";

export default function SuccessView() {
  const router = useRouter();
  const { draft, resetDraft, hydrated } = useMarathonRegistration();

  useEffect(() => {
    if (hydrated && !draft.registrationId) {
      router.replace("/events/marathon/register");
    }
  }, [hydrated, draft.registrationId, router]);

  if (!draft.registrationId || !draft.participantType) return null;

  const isPhysical = draft.participantType === "physical";
  const downloadHref = isPhysical
    ? `/events/marathon/pass/${draft.registrationId}`
    : `/events/marathon/certificate/${draft.certificateId}`;

  return (
    <section className="container-max py-14 sm:py-20 max-w-lg text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative w-24 h-24 mx-auto mb-6"
      >
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 size={52} className="text-green-500" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 1.2, repeat: 2, ease: "easeOut" }}
        />
      </motion.div>

      <h1 className="font-poppins font-black text-2xl sm:text-3xl text-navy mb-3">
        Registration Successful!
      </h1>
      <p className="font-inter text-navy/65 text-sm sm:text-base mb-1">
        Thank you for joining as a{" "}
        <span className="font-semibold text-maroon-600">{PARTICIPANT_LABELS[draft.participantType]}</span>.
      </p>
      <p className="font-inter text-navy/65 text-sm sm:text-base mb-8">
        A confirmation email has been sent to <span className="font-semibold text-navy">{draft.email}</span>.
      </p>

      <div className="bg-gradient-to-br from-orange-50 to-white border border-primary/15 rounded-2xl p-5 mb-4">
        <p className="font-poppins font-semibold text-xs text-navy/50 uppercase tracking-widest mb-2">
          Registration ID
        </p>
        <p className="font-poppins font-black text-xl text-maroon-600 tracking-wide">{draft.registrationId}</p>
      </div>

      {draft.certificateId && (
        <div className="bg-gradient-to-br from-orange-50 to-white border border-primary/15 rounded-2xl p-5 mb-4">
          <p className="font-poppins font-semibold text-xs text-navy/50 uppercase tracking-widest mb-2">
            Certificate ID
          </p>
          <p className="font-poppins font-black text-xl text-maroon-600 tracking-wide">{draft.certificateId}</p>
        </div>
      )}

      {draft.paymentId && (
        <div className="bg-white border border-navy/10 rounded-2xl p-5 mb-8 text-left">
          <p className="font-poppins font-semibold text-xs text-navy/50 uppercase tracking-widest mb-3 text-center">
            Payment Details
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-navy/55">Status</dt>
              <dd className="font-semibold text-green-600">Paid</dd>
            </div>
            {draft.paymentAmount !== null && (
              <div className="flex justify-between gap-3">
                <dt className="text-navy/55">Amount</dt>
                <dd className="font-semibold text-navy">₹{draft.paymentAmount}</dd>
              </div>
            )}
            <div className="flex justify-between gap-3">
              <dt className="text-navy/55">Payment ID</dt>
              <dd className="font-semibold text-navy break-all text-right">{draft.paymentId}</dd>
            </div>
            {draft.razorpayOrderId && (
              <div className="flex justify-between gap-3">
                <dt className="text-navy/55">Order ID</dt>
                <dd className="font-semibold text-navy break-all text-right">{draft.razorpayOrderId}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={downloadHref}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
        >
          <Download size={16} />
          {isPhysical ? "Download Entry Pass" : "Download Certificate"}
        </Link>
        <button
          type="button"
          onClick={() => {
            resetDraft();
            router.push("/events");
          }}
          className="inline-flex items-center justify-center gap-2 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300"
        >
          Back to Events
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
