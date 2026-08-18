"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ArrowRight, Loader2, XCircle } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import { PARTICIPANT_LABELS } from "@/types/marathon";
import type {
  RegistrationStatusRequest,
  RegistrationStatusResponse,
  ApiErrorResponse,
} from "@/types/marathon";

const POLL_INTERVAL_MS = 4000;
const MAX_POLL_MS = 3 * 60 * 1000; // keep actively polling for 3 minutes before asking for a manual check

type StatusState = "checking" | "pending" | "timeout" | "paid" | "failed" | "error";

/**
 * Payment status here is never taken from client-side draft state or
 * from a returning ?query param — both are just UX signals a browser
 * could echo back regardless of what actually happened. The only
 * source of truth is /api/marathon/registration-status, gated by the
 * signed statusToken issued at registration time.
 */
export default function SuccessView() {
  const router = useRouter();
  const { draft, resetDraft, hydrated } = useMarathonRegistration();
  const [status, setStatus] = useState<StatusState>("checking");
  const [confirmed, setConfirmed] = useState<{ registrationId: string | null; certificateId: string | null }>({
    registrationId: null,
    certificateId: null,
  });
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedAt = useRef<number>(Date.now());

  useEffect(() => {
    if (!hydrated) return;
    if (!draft.draftId || !draft.statusToken || !draft.participantType) {
      router.replace("/events/marathon/register");
    }
  }, [hydrated, draft.draftId, draft.statusToken, draft.participantType, router]);

  const checkStatus = useCallback(async () => {
    if (!draft.draftId || !draft.statusToken) return;

    try {
      const res = await fetch("/api/marathon/registration-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId: draft.draftId,
          statusToken: draft.statusToken,
        } satisfies RegistrationStatusRequest),
      });
      const data = (await res.json()) as RegistrationStatusResponse | ApiErrorResponse;

      if (!res.ok || !("paymentStatus" in data)) {
        setStatus("error");
        return;
      }

      if (data.paymentStatus === "paid") {
        setConfirmed({ registrationId: data.registrationId, certificateId: data.certificateId });
        setStatus("paid");
        return;
      }

      if (data.paymentStatus === "failed") {
        setStatus("failed");
        return;
      }

      if (Date.now() - startedAt.current >= MAX_POLL_MS) {
        setStatus("timeout");
        return;
      }

      setStatus("pending");
      pollTimer.current = setTimeout(checkStatus, POLL_INTERVAL_MS);
    } catch {
      setStatus("error");
    }
  }, [draft.draftId, draft.statusToken]);

  useEffect(() => {
    if (!hydrated || !draft.draftId || !draft.statusToken) return;
    checkStatus();
    return () => {
      if (pollTimer.current) clearTimeout(pollTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, draft.draftId, draft.statusToken]);

  const retry = () => {
    startedAt.current = Date.now();
    setStatus("checking");
    checkStatus();
  };

  if (!hydrated || !draft.draftId || !draft.participantType) return null;

  const isPhysical = draft.participantType === "physical";

  if (status === "checking" || status === "pending") {
    return (
      <section className="container-max py-20 sm:py-28 max-w-md text-center">
        <Loader2 size={40} className="animate-spin text-primary mx-auto mb-6" />
        <h1 className="font-poppins font-black text-xl text-navy mb-2">Confirming your payment…</h1>
        <p className="font-inter text-navy/60 text-sm">This usually takes a few seconds. Please don&apos;t close this page.</p>
      </section>
    );
  }

  if (status === "timeout") {
    return (
      <section className="container-max py-20 sm:py-28 max-w-md text-center">
        <Loader2 size={40} className="text-primary mx-auto mb-6" />
        <h1 className="font-poppins font-black text-xl text-navy mb-2">Still confirming your payment…</h1>
        <p className="font-inter text-navy/60 text-sm mb-6">
          This is taking longer than usual. If you completed the payment, this will resolve shortly — you can check
          again, or wait for the confirmation email.
        </p>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
        >
          Check Again
        </button>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="container-max py-20 sm:py-28 max-w-md text-center">
        <XCircle size={40} className="text-red-500 mx-auto mb-6" />
        <h1 className="font-poppins font-black text-xl text-navy mb-2">Couldn&apos;t confirm your payment</h1>
        <p className="font-inter text-navy/60 text-sm mb-6">
          We couldn&apos;t reach our server to confirm your registration. Please check your connection and try again.
        </p>
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
        >
          Check Again
        </button>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="container-max py-20 sm:py-28 max-w-md text-center">
        <XCircle size={40} className="text-red-500 mx-auto mb-6" />
        <h1 className="font-poppins font-black text-xl text-navy mb-2">Payment Not Completed</h1>
        <p className="font-inter text-navy/60 text-sm mb-6">
          Your payment wasn&apos;t successful. You can try again from the payment step.
        </p>
        <button
          type="button"
          onClick={() => router.push("/events/marathon/payment")}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange"
        >
          Try Again
        </button>
      </section>
    );
  }

  // status === "paid" — server-confirmed, safe to show the pass/certificate.
  const registrationId = confirmed.registrationId;
  const certificateId = confirmed.certificateId;
  const downloadHref = isPhysical
    ? `/events/marathon/pass/${registrationId}`
    : `/events/marathon/certificate/${certificateId}`;

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
        <p className="font-poppins font-black text-xl text-maroon-600 tracking-wide">{registrationId}</p>
      </div>

      {certificateId && (
        <div className="bg-gradient-to-br from-orange-50 to-white border border-primary/15 rounded-2xl p-5 mb-4">
          <p className="font-poppins font-semibold text-xs text-navy/50 uppercase tracking-widest mb-2">
            Certificate ID
          </p>
          <p className="font-poppins font-black text-xl text-maroon-600 tracking-wide">{certificateId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
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
