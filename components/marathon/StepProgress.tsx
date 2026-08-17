"use client";

const STEPS = ["Register", "Pledge", "Verify Email", "Details", "Payment"] as const;

export default function StepProgress({ current }: { current: number }) {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6" aria-label="Registration progress">
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => {
          const stepNum = i + 1;
          const isActive = stepNum <= current;
          return (
            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={[
                  "w-full h-1.5 rounded-full transition-all duration-500",
                  isActive ? "bg-gradient-to-r from-maroon-500 to-primary" : "bg-navy/10",
                ].join(" ")}
                role="progressbar"
                aria-valuenow={isActive ? 100 : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Step ${stepNum}: ${label}`}
              />
              <span
                className={[
                  "font-inter text-[10px] sm:text-xs transition-colors hidden sm:block text-center",
                  isActive ? "text-maroon-600 font-semibold" : "text-navy/35",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
