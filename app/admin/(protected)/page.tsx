import { Metadata } from "next";
import AdminDashboardView from "@/components/admin/AdminDashboardView";

export const metadata: Metadata = {
  title: "Admin Dashboard | Mega Marathon 2026",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return <AdminDashboardView />;
}
