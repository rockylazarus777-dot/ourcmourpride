"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return; // guard against double-click/double-submit

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          company: data.get("company"), // honeypot — always empty for real users
        }),
      });
      const body = await res.json().catch(() => null);

      if (!res.ok || !body?.success) {
        setErrorMessage(body?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-green-50 border border-green-200 p-8 text-center">
        <p className="text-lg font-semibold text-green-800">Message sent — thank you!</p>
        <p className="mt-2 text-sm text-green-700">Our team will follow up as soon as possible.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-green-300 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-green-800 transition hover:bg-green-100"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — hidden from real users via CSS, bots that fill every field trip it. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Your name"
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email address</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Subject</span>
        <input
          type="text"
          name="subject"
          required
          minLength={2}
          maxLength={200}
          placeholder="What would you like to discuss?"
          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Share your request, feedback, or question here."
          className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-orange/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
