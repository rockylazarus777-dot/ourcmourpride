"use client";

import { ReactNode } from "react";

export function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="block font-poppins font-semibold text-xs text-navy uppercase tracking-wider mb-2">
      {children}
      {required && (
        <span className="text-maroon-500 ml-1" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-maroon-600 text-xs font-inter mt-1.5">
      {message}
    </p>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  hasError,
  id,
  autoComplete,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  hasError?: boolean;
  id?: string;
  autoComplete?: string;
  disabled?: boolean;
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
      disabled={disabled}
      className={[
        "w-full px-4 py-3 rounded-xl border-2 font-inter text-sm text-navy bg-white outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
        hasError ? "border-red-400 bg-red-50/50" : "border-navy/15 hover:border-primary/40 focus:border-primary",
      ].join(" ")}
    />
  );
}

export function PillGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  columns = 4,
  labels,
}: {
  options: readonly T[];
  value: T | "";
  onChange: (v: T) => void;
  ariaLabel: string;
  columns?: number;
  labels?: Record<T, string>;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={[
            "py-2.5 px-2 rounded-lg border-2 font-poppins font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            value === opt
              ? "border-primary bg-orange-50 text-primary"
              : "border-navy/15 text-navy/60 hover:border-primary/30",
          ].join(" ")}
        >
          {labels ? labels[opt] : opt}
        </button>
      ))}
    </div>
  );
}
