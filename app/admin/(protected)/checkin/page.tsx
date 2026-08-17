import { Metadata } from "next";
import CheckinView from "@/components/admin/CheckinView";

export const metadata: Metadata = {
  title: "Check-in Scanner | Mega Marathon 2026",
  robots: { index: false, follow: false },
};

export default function AdminCheckinPage() {
  return <CheckinView />;
}
