import type { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";

export const metadata: Metadata = {
  title: "About CM | Our CM Our Pride",
  description:
    "Content for this section is currently being prepared and will be available soon.",
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      title="About CM"
      description="Content for this section is currently being prepared and will be available soon."
    />
  );
}
