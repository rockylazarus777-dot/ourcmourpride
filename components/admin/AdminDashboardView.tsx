"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Medal,
  Laptop,
  IndianRupee,
  ScanLine,
  Download,
  FileSpreadsheet,
  LogOut,
  Search,
  RefreshCw,
} from "lucide-react";
import type { RegistrationRow } from "@/types/supabase";
import { CATEGORY_LABELS, PARTICIPANT_LABELS } from "@/types/marathon";

interface Stats {
  totalRegistrations: number;
  physicalCount: number;
  eParticipantCount: number;
  checkedInCount: number;
  revenue: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-primary" />
      </div>
      <div className="min-w-0">
        <p className="font-inter text-xs text-navy/50 truncate">{label}</p>
        <p className="font-poppins font-black text-xl text-navy">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardView() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState<string | null>(null);

  const loadStats = useCallback(async () => {
    const res = await fetch("/api/admin/stats");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (res.ok) setStats(await res.json());
  }, [router]);

  const loadRegistrations = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (participantType) params.set("participantType", participantType);
    if (paymentStatus) params.set("paymentStatus", paymentStatus);
    if (category) params.set("category", category);

    const res = await fetch(`/api/admin/registrations?${params.toString()}`);
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setRegistrations(data.registrations);
      setTotal(data.total);
    }
    setLoading(false);
  }, [page, search, participantType, paymentStatus, category, router]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const regenerateCertificate = async (registrationId: string) => {
    setRegenerating(registrationId);
    try {
      await fetch("/api/admin/certificate/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationId }),
      });
    } finally {
      setRegenerating(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / 25));

  return (
    <div className="container-max py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-poppins font-black text-2xl text-navy">Mega Marathon 2026 — Admin</h1>
          <p className="font-inter text-sm text-navy/55">Registrations, revenue, and check-in overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/checkin"
            className="inline-flex items-center gap-2 bg-navy text-white font-poppins font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-navy-light transition-colors"
          >
            <ScanLine size={15} />
            Check-in Scanner
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border-2 border-navy/15 text-navy font-poppins font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-navy/5 transition-colors"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Users} label="Total Registrations" value={stats?.totalRegistrations ?? "—"} />
        <StatCard icon={Medal} label="Physical Participants" value={stats?.physicalCount ?? "—"} />
        <StatCard icon={Laptop} label="E-Participants" value={stats?.eParticipantCount ?? "—"} />
        <StatCard icon={ScanLine} label="Checked In" value={stats?.checkedInCount ?? "—"} />
        <StatCard
          icon={IndianRupee}
          label="Revenue"
          value={stats ? `₹${stats.revenue.toLocaleString("en-IN")}` : "—"}
        />
      </div>

      {/* Filters + export */}
      <div className="bg-white rounded-2xl shadow-card p-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/35" />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search name, email, phone, registration ID…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-navy/15 font-inter text-sm outline-none focus:border-primary"
          />
        </div>
        <select
          value={participantType}
          onChange={(e) => {
            setPage(1);
            setParticipantType(e.target.value);
          }}
          className="px-3 py-2.5 rounded-lg border border-navy/15 font-inter text-sm outline-none"
        >
          <option value="">All Types</option>
          <option value="physical">Physical</option>
          <option value="e_participant">E-Participant</option>
        </select>
        <select
          value={paymentStatus}
          onChange={(e) => {
            setPage(1);
            setPaymentStatus(e.target.value);
          }}
          className="px-3 py-2.5 rounded-lg border border-navy/15 font-inter text-sm outline-none"
        >
          <option value="">All Payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
          className="px-3 py-2.5 rounded-lg border border-navy/15 font-inter text-sm outline-none"
        >
          <option value="">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => loadRegistrations()}
          className="p-2.5 rounded-lg border border-navy/15 hover:bg-navy/5 transition-colors"
          aria-label="Refresh"
        >
          <RefreshCw size={15} className="text-navy/60" />
        </button>
        <a
          href="/api/admin/export?format=csv"
          className="inline-flex items-center gap-1.5 bg-navy/5 text-navy font-poppins font-semibold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg hover:bg-navy/10 transition-colors"
        >
          <Download size={14} />
          CSV
        </a>
        <a
          href="/api/admin/export?format=xlsx"
          className="inline-flex items-center gap-1.5 bg-navy/5 text-navy font-poppins font-semibold text-xs uppercase tracking-wider px-3.5 py-2.5 rounded-lg hover:bg-navy/10 transition-colors"
        >
          <FileSpreadsheet size={14} />
          Excel
        </a>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy/5 text-left">
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">ID</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Name</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Type</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Category</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Payment</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Check-in</th>
                <th className="px-4 py-3 font-poppins font-semibold text-xs text-navy/60 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-navy/40 font-inter">
                    Loading…
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-navy/40 font-inter">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((r) => (
                  <tr key={r.id} className="border-t border-navy/5">
                    <td className="px-4 py-3 font-inter text-navy/80 whitespace-nowrap">
                      {r.registration_id ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-inter text-navy font-medium whitespace-nowrap">{r.full_name}</td>
                    <td className="px-4 py-3 font-inter text-navy/70 whitespace-nowrap">
                      {PARTICIPANT_LABELS[r.participant_type]}
                    </td>
                    <td className="px-4 py-3 font-inter text-navy/70 whitespace-nowrap">
                      {CATEGORY_LABELS[r.category]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={[
                          "px-2 py-1 rounded-full text-xs font-poppins font-semibold",
                          r.payment_status === "paid"
                            ? "bg-green-50 text-green-600"
                            : r.payment_status === "failed"
                              ? "bg-red-50 text-red-600"
                              : "bg-amber-50 text-amber-600",
                        ].join(" ")}
                      >
                        {r.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-inter text-navy/70 whitespace-nowrap">
                      {r.check_in_status ? "✅ Checked in" : "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {r.participant_type === "e_participant" && r.certificate_id && (
                        <button
                          type="button"
                          onClick={() => regenerateCertificate(r.registration_id!)}
                          disabled={regenerating === r.registration_id}
                          className="text-xs font-poppins font-semibold text-primary hover:underline disabled:opacity-50"
                        >
                          {regenerating === r.registration_id ? "Regenerating…" : "Regenerate Certificate"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy/5">
            <span className="font-inter text-xs text-navy/50">
              Page {page} of {totalPages} • {total} total
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-navy/15 text-xs font-poppins font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-navy/15 text-xs font-poppins font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
