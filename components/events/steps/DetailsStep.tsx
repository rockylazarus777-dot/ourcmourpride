"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Upload, X, Check, Loader2 } from "lucide-react";
import { AgeCategory, Gender, Prefix, RegistrationFormData } from "@/types/events";

type DetailsFields = Pick<
  RegistrationFormData,
  | "prefix"
  | "fullName"
  | "gender"
  | "dateOfBirth"
  | "phone"
  | "email"
  | "pinCode"
  | "photo"
  | "guardianName"
  | "guardianMobile"
  | "guardianConsent"
>;

interface DetailsStepProps {
  ageCategory: AgeCategory;
  formData: DetailsFields;
  onChange: (field: string, value: unknown) => void;
  onSubmit: () => void;
  onBack: () => void;
  errors: Record<string, string>;
  loading: boolean;
}

const PREFIXES: Prefix[] = ["Mr.", "Mrs.", "Ms.", "Others"];
const GENDERS: Gender[] = ["Male", "Female", "Other", "Prefer not to say"];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-poppins font-semibold text-xs text-navy uppercase tracking-wider mb-2">
      {children}
      {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p role="alert" className="text-red-500 text-xs font-inter mt-1.5">{message}</p>;
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  hasError,
  id,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  hasError?: boolean;
  id?: string;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autoComplete}
      className={[
        "w-full px-4 py-3 rounded-xl border-2 font-inter text-sm text-navy bg-white outline-none transition-all duration-200",
        hasError
          ? "border-red-400 bg-red-50/50"
          : "border-navy/15 hover:border-pink-300 focus:border-pink-500",
      ].join(" ")}
    />
  );
}

export default function DetailsStep({
  ageCategory,
  formData,
  onChange,
  onSubmit,
  onBack,
  errors,
  loading,
}: DetailsStepProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange("photo", file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    onChange("photo", null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const isBelow18 = ageCategory === "below_18";

  return (
    <motion.div
      key="details-step"
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -48 }}
      transition={{ duration: 0.38 }}
      className="p-6 sm:p-8"
    >
      <div className="text-center mb-7">
        <h2 className="font-poppins font-black text-2xl text-navy mb-1.5">Registration Details</h2>
        <p className="font-inter text-navy/55 text-sm">Fill in your personal information</p>
      </div>

      <div className="space-y-5">
        {/* ── Prefix ── */}
        <div>
          <FieldLabel required>Prefix</FieldLabel>
          <div role="group" aria-label="Prefix" className="grid grid-cols-4 gap-2">
            {PREFIXES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onChange("prefix", p)}
                aria-pressed={formData.prefix === p}
                className={[
                  "py-2.5 rounded-lg border-2 font-poppins font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
                  formData.prefix === p
                    ? "border-pink-500 bg-pink-50 text-pink-700"
                    : "border-navy/15 text-navy/60 hover:border-pink-200",
                ].join(" ")}
              >
                {p}
              </button>
            ))}
          </div>
          <FieldError message={errors.prefix} />
        </div>

        {/* ── Full Name ── */}
        <div>
          <FieldLabel required>Full Name</FieldLabel>
          <TextInput
            id="fullName"
            value={formData.fullName}
            onChange={(v) => onChange("fullName", v)}
            placeholder="Enter your full name"
            hasError={!!errors.fullName}
            autoComplete="name"
          />
          <FieldError message={errors.fullName} />
        </div>

        {/* ── Gender ── */}
        <div>
          <FieldLabel required>Gender</FieldLabel>
          <div role="group" aria-label="Gender" className="grid grid-cols-2 gap-2">
            {GENDERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => onChange("gender", g)}
                aria-pressed={formData.gender === g}
                className={[
                  "py-2.5 px-3 rounded-lg border-2 font-inter text-sm text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
                  formData.gender === g
                    ? "border-pink-500 bg-pink-50 text-pink-700 font-semibold"
                    : "border-navy/15 text-navy/60 hover:border-pink-200",
                ].join(" ")}
              >
                {g}
              </button>
            ))}
          </div>
          <FieldError message={errors.gender} />
        </div>

        {/* ── DOB + Phone ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Date of Birth</FieldLabel>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              aria-label="Date of birth"
              className={[
                "w-full px-4 py-3 rounded-xl border-2 font-inter text-sm text-navy bg-white outline-none transition-all duration-200",
                errors.dateOfBirth
                  ? "border-red-400 bg-red-50/50"
                  : "border-navy/15 hover:border-pink-300 focus:border-pink-500",
              ].join(" ")}
            />
            <FieldError message={errors.dateOfBirth} />
          </div>

          <div>
            <FieldLabel required>Phone Number</FieldLabel>
            <TextInput
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(v) => onChange("phone", v)}
              placeholder="10-digit mobile number"
              maxLength={10}
              hasError={!!errors.phone}
              autoComplete="tel"
            />
            <FieldError message={errors.phone} />
          </div>
        </div>

        {/* ── Email + Pin Code ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel required>Email Address</FieldLabel>
            <TextInput
              id="email"
              type="email"
              value={formData.email}
              onChange={(v) => onChange("email", v)}
              placeholder="you@example.com"
              hasError={!!errors.email}
              autoComplete="email"
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <FieldLabel required>Pin Code</FieldLabel>
            <TextInput
              id="pinCode"
              value={formData.pinCode}
              onChange={(v) => onChange("pinCode", v)}
              placeholder="6-digit pin code"
              maxLength={6}
              hasError={!!errors.pinCode}
              autoComplete="postal-code"
            />
            <FieldError message={errors.pinCode} />
          </div>
        </div>

        {/* ── Photo Upload ── */}
        <div>
          <FieldLabel>
            Photo Upload{" "}
            <span className="normal-case text-navy/40 font-normal">(Optional)</span>
          </FieldLabel>

          {preview ? (
            <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border-2 border-pink-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Photo preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-pink-300 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-inter text-sm text-navy font-medium truncate">
                  {formData.photo?.name}
                </p>
                <p className="font-inter text-xs text-navy/50">
                  {formData.photo ? (formData.photo.size / 1024).toFixed(0) + " KB" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={removePhoto}
                aria-label="Remove photo"
                className="text-navy/40 hover:text-red-500 transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full flex flex-col items-center gap-2 p-6 rounded-xl border-2 border-dashed border-navy/20 hover:border-pink-400 hover:bg-pink-50/50 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <Upload size={22} className="text-navy/30 group-hover:text-pink-500 transition-colors" />
              <span className="font-inter text-sm text-navy/50">Click to upload photo</span>
              <span className="font-inter text-xs text-navy/35">JPG, PNG, WEBP — max 5 MB</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-hidden="true"
            onChange={handleFile}
          />
          <FieldError message={errors.photo} />
        </div>

        {/* ── Guardian Fields (Below 18) ── */}
        {isBelow18 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35 }}
            className="space-y-5 pt-5 border-t-2 border-pink-100"
          >
            <p className="font-poppins font-bold text-xs text-pink-600 uppercase tracking-widest">
              Parent / Guardian Details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel required>Parent / Guardian Name</FieldLabel>
                <TextInput
                  id="guardianName"
                  value={formData.guardianName}
                  onChange={(v) => onChange("guardianName", v)}
                  placeholder="Guardian full name"
                  hasError={!!errors.guardianName}
                  autoComplete="off"
                />
                <FieldError message={errors.guardianName} />
              </div>

              <div>
                <FieldLabel required>Parent / Guardian Mobile</FieldLabel>
                <TextInput
                  id="guardianMobile"
                  type="tel"
                  value={formData.guardianMobile}
                  onChange={(v) => onChange("guardianMobile", v)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  hasError={!!errors.guardianMobile}
                  autoComplete="off"
                />
                <FieldError message={errors.guardianMobile} />
              </div>
            </div>

            {/* Consent */}
            <div>
              <button
                type="button"
                role="checkbox"
                aria-checked={formData.guardianConsent}
                onClick={() => onChange("guardianConsent", !formData.guardianConsent)}
                className={[
                  "w-full flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
                  formData.guardianConsent
                    ? "border-pink-500 bg-pink-50"
                    : "border-navy/20 bg-white hover:border-pink-300",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                    formData.guardianConsent
                      ? "bg-pink-500 border-pink-500"
                      : "border-navy/30 bg-white",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {formData.guardianConsent && (
                    <Check size={11} className="text-white" strokeWidth={3} />
                  )}
                </div>
                <span className="font-inter text-sm text-navy/70 leading-relaxed">
                  I confirm that my parent/guardian has read and agreed to the participation terms
                  and conditions of the Pink Marathon.
                </span>
              </button>
              <FieldError message={errors.guardianConsent} />
            </div>
          </motion.div>
        )}

        {/* Global submit error */}
        {errors.submit && (
          <p role="alert" className="text-red-500 text-sm font-inter text-center bg-red-50 px-4 py-3 rounded-xl">
            {errors.submit}
          </p>
        )}

        {/* ── Actions ── */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 border-2 border-navy/20 text-navy font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:border-navy/40 hover:bg-navy/5 transition-all duration-300 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy/30"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className="flex-[2] bg-gradient-to-r from-pink-600 to-rose-600 text-white font-poppins font-bold text-sm tracking-wider uppercase py-4 rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-[0_4px_16px_rgba(236,72,153,0.3)] disabled:opacity-70 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Submitting…
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
