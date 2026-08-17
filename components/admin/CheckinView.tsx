"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, XCircle, ScanLine } from "lucide-react";
import type { RegistrationRow } from "@/types/supabase";
import { CATEGORY_LABELS, PARTICIPANT_LABELS } from "@/types/marathon";

interface CheckinResult {
  registration?: RegistrationRow;
  error?: string;
  alreadyCheckedIn?: boolean;
}

export default function CheckinView() {
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerInstanceRef = useRef<{ clear: () => Promise<void> } | null>(null);
  const [manualId, setManualId] = useState("");
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [scannerError, setScannerError] = useState(false);

  const submitCheckin = async (registrationId: string) => {
    if (!registrationId.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId: registrationId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error, registration: data.registration, alreadyCheckedIn: data.alreadyCheckedIn });
      } else {
        setResult({ registration: data.registration });
      }
    } catch {
      setResult({ error: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    import("html5-qrcode")
      .then(({ Html5QrcodeScanner }) => {
        if (cancelled || !scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
          "mm2026-qr-reader",
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );

        scanner.render(
          (decodedText: string) => {
            try {
              const parsed = JSON.parse(decodedText);
              if (parsed.registrationId) {
                submitCheckin(parsed.registrationId);
              }
            } catch {
              submitCheckin(decodedText);
            }
          },
          () => {
            /* ignore per-frame scan failures — expected while aiming */
          }
        );

        scannerInstanceRef.current = scanner;
      })
      .catch(() => setScannerError(true));

    return () => {
      cancelled = true;
      scannerInstanceRef.current?.clear().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-max py-8 max-w-lg">
      <div className="flex items-center gap-2 mb-6">
        <ScanLine size={22} className="text-primary" />
        <h1 className="font-poppins font-black text-xl text-navy">Check-in Scanner</h1>
      </div>

      {!scannerError ? (
        <div id="mm2026-qr-reader" ref={scannerRef} className="rounded-2xl overflow-hidden mb-6" />
      ) : (
        <p className="font-inter text-sm text-navy/50 mb-6">
          Camera scanner unavailable — use manual entry below.
        </p>
      )}

      <div className="bg-white rounded-2xl shadow-card p-4 mb-6">
        <label className="block font-poppins font-semibold text-xs text-navy uppercase tracking-wider mb-2">
          Manual Registration ID Entry
        </label>
        <div className="flex gap-2">
          <input
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="OCOP-MM-2026-000001"
            onKeyDown={(e) => e.key === "Enter" && submitCheckin(manualId)}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-navy/15 font-inter text-sm outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => submitCheckin(manualId)}
            disabled={loading}
            className="bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm px-5 rounded-xl disabled:opacity-60"
          >
            Check In
          </button>
        </div>
      </div>

      {result && (
        <div
          className={[
            "rounded-2xl p-5 border-2",
            result.error ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50",
          ].join(" ")}
        >
          <div className="flex items-center gap-2 mb-3">
            {result.error ? (
              <XCircle size={20} className="text-red-500" />
            ) : (
              <CheckCircle2 size={20} className="text-green-500" />
            )}
            <p className="font-poppins font-bold text-sm text-navy">
              {result.error ?? "Checked in successfully"}
            </p>
          </div>

          {result.registration && (
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-navy/55">Name</dt>
                <dd className="font-semibold text-navy">{result.registration.full_name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/55">Registration ID</dt>
                <dd className="font-semibold text-navy">{result.registration.registration_id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/55">Category</dt>
                <dd className="font-semibold text-navy">
                  {PARTICIPANT_LABELS[result.registration.participant_type]} •{" "}
                  {CATEGORY_LABELS[result.registration.category]}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/55">T-Shirt Size</dt>
                <dd className="font-semibold text-navy">{result.registration.tshirt_size}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/55">Blood Group</dt>
                <dd className="font-semibold text-navy">{result.registration.blood_group}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy/55">Payment Status</dt>
                <dd className="font-semibold text-navy capitalize">{result.registration.payment_status}</dd>
              </div>
            </dl>
          )}
        </div>
      )}
    </div>
  );
}
