import type { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";

export const metadata: Metadata = {
  title: "Contact | Our CM Our Pride",
  description:
    "Contact information and communication channels will be available shortly.",
};

export default function ContactPage() {
  return (
    <ComingSoonPage
      title="Contact"
      description="Contact information and communication channels will be available shortly."
    />
  );
}
