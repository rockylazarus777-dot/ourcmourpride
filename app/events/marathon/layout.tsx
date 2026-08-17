import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { MarathonRegistrationProvider } from "@/components/marathon/MarathonRegistrationProvider";

export default function MarathonLayout({ children }: { children: React.ReactNode }) {
  return (
    <MarathonRegistrationProvider>
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 md:pt-20 min-h-[70vh]">{children}</div>
        <Footer />
      </main>
    </MarathonRegistrationProvider>
  );
}
