"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-navy-gradient flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-sm"
      >
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-5">
          <Lock size={24} className="text-primary" />
        </div>
        <h1 className="font-poppins font-black text-xl text-navy text-center mb-1.5">Admin Login</h1>
        <p className="font-inter text-navy/55 text-sm text-center mb-6">Mega Marathon 2026 Dashboard</p>

        <label className="block font-poppins font-semibold text-xs text-navy uppercase tracking-wider mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 rounded-xl border-2 border-navy/15 font-inter text-sm text-navy bg-white outline-none focus:border-primary transition-all mb-4"
        />

        {error && (
          <p role="alert" className="text-red-500 text-sm font-inter text-center bg-red-50 px-4 py-3 rounded-xl mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-maroon-600 to-primary text-white font-poppins font-bold text-sm tracking-widest uppercase py-4 rounded-xl hover:brightness-110 transition-all duration-300 shadow-orange disabled:opacity-70"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null}
          Sign In
        </button>
      </form>
    </main>
  );
}
