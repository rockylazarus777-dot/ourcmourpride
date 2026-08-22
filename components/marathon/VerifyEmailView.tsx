"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { useMarathonRegistration } from "./MarathonRegistrationProvider";
import StepProgress from "./StepProgress";
import { FieldError, TextInput } from "./FormFields";
import type { ApiErrorResponse, OtpSendResponse, OtpVerifyResponse } from "@/types/marathon";

export default function VerifyEmailView() {
  const router = useRouter();
  const { draft, updateDraft, hydrated } = useMarathonRegistration();

  const [stage, setStage] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(draft.email);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sendInFlightRef = useRef(false);
  const verifyInFlightRef = useRef(false);

  useEffect(() => {
    if (hydrated && !draft.participantType) {
      router.replace("/events/marathon/register");
    }
  }, [hydrated, draft.participantType, router]);

  useEffect(() => {
    if (draft.emailVerifiedToken && draft.email) {
      router.replace("/events/marathon/details");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    // Guards a fast double-click / Enter-key repeat that fires before the
    // `loading` state re-render commits — server-side rate limiting is the
    // real gate, this just avoids firing an obviously-redundant request.
    if (sendInFlightRef.current || cooldown > 0) return;
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    sendInFlightRef.current = true;
    setLoading(true);
    try {
      const res = await fetch("/api/marathon/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as OtpSendResponse | ApiErrorResponse;

      if (res.status === 429 && "retryAfter" in data && typeof data.retryAfter === "number") {
        setError(data.message ?? data.error ?? "Please wait before requesting another code.");
        startCooldown(data.retryAfter);
        return;
      }

      if (!res.ok || data.success !== true) {
        setError("error" in data ? data.error : "Failed to send code.");
        return;
      }
      updateDraft({ email });
      setStage("otp");
      startCooldown(30);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
      sendInFlightRef.current = false;
    }
  };

  const verifyOtp = async () => {
    if (verifyInFlightRef.current) return;
    setError("");
    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the 6-digit code.");
      return;
    }
    verifyInFlightRef.current = true;
    setLoading(true);
    try {
      const res = await fetch("/api/marathon/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = (await res.json()) as OtpVerifyResponse | ApiErrorResponse;
      if (!res.ok || data.success !== true) {
        setError("error" in data ? data.error : "Invalid code.");
        return;
      }
      updateDraft({ email, emailVerifiedToken: data.emailVerifiedToken });
      router.push("/events/marathon/details");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
      verifyInFlightRef.current = false;
    }
  };

  if (!draft.participantType) return null;

  return (
    <>
      <StepProgress current={3} />
      <section className="container-max py-10 sm:py-14 max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            {stage === "email" ? <Mail size={24} className="text-primary" /> : <ShieldCheck size={24} className="text-primary" />}
          </div>
          <h1 className="font-poppins font-black text-2xl text-navy mb-1.5">
            {stage === "email" ? "Verify Your Email" : "Enter Verification Code"}
          </h1>
          <p className="font-inter text-navy/55 text-sm">
              {stage === "email" ? (
                "We'll send a 6-digit code to confirm your email address."
              ) : (
                <>
                  We sent a code to {email}.{" "}
                  <strong className="font-bold text-primary bg-primary/10 px-1 rounded">
                    Please Check your spam folder if you don&apos;t see it in your inbox.
                  </strong>
                </>
              )}
          </p>
        </div>

        {stage === "email" ? (
          <div className="space-y-4">
            <div>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                hasError={!!error}
                autoComplete="email"
              />
              <FieldError message={error} />
            </div>
            <button
              type="button"
              onClick={sendOtp}
              disabled={loading || cooldown > 0}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              {cooldown > 0 ? `Wait ${cooldown}s` : "Send Code"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <TextInput
                id="otp"
                type="text"
                value={otp}
                onChange={(v) => setOtp(v.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                hasError={!!error}
                autoComplete="one-time-code"
              />
              <FieldError message={error} />
            </div>
            <button
              type="button"
              onClick={verifyOtp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-70"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Verify &amp; Continue
            </button>
            <button
              type="button"
              onClick={sendOtp}
              disabled={cooldown > 0 || loading}
              className="w-full text-center font-inter text-sm text-navy/60 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-navy/60"
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => router.push("/events/marathon/pledge")}
          className="w-full mt-6 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300"
        >
          Back
        </button>
      </section>
    </>
  );
}
