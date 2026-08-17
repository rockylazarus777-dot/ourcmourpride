"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { INITIAL_MARATHON_DRAFT, type MarathonDraftState } from "@/types/marathon";

const STORAGE_KEY = "mm2026_draft";

interface MarathonRegistrationContextValue {
  draft: MarathonDraftState;
  updateDraft: (patch: Partial<MarathonDraftState>) => void;
  resetDraft: () => void;
  hydrated: boolean;
}

const MarathonRegistrationContext = createContext<MarathonRegistrationContextValue | null>(null);

export function MarathonRegistrationProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<MarathonDraftState>(INITIAL_MARATHON_DRAFT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setDraft({ ...INITIAL_MARATHON_DRAFT, ...JSON.parse(raw) });
    } catch {
      /* corrupt/blocked storage — fall back to initial state */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      /* storage unavailable (private browsing etc.) — non-fatal */
    }
  }, [draft, hydrated]);

  const updateDraft = useCallback((patch: Partial<MarathonDraftState>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(INITIAL_MARATHON_DRAFT);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* non-fatal */
    }
  }, []);

  return (
    <MarathonRegistrationContext.Provider value={{ draft, updateDraft, resetDraft, hydrated }}>
      {children}
    </MarathonRegistrationContext.Provider>
  );
}

export function useMarathonRegistration(): MarathonRegistrationContextValue {
  const ctx = useContext(MarathonRegistrationContext);
  if (!ctx) {
    throw new Error("useMarathonRegistration must be used within a MarathonRegistrationProvider");
  }
  return ctx;
}
