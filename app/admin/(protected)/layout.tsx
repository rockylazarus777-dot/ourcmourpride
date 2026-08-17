import { requireAdminSession } from "@/lib/admin/requireSession";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();
  return <div className="min-h-screen bg-[#F8F8F8]">{children}</div>;
}
