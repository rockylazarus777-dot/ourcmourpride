import type { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";

export const metadata: Metadata = {
  title: "Vision | Our CM Our Pride",
  description:
    "Our vision section is currently under development and will be published shortly.",
};

export default function VisionPage() {
  return (
    <ComingSoonPage
      title="Vision"
      description="Our vision section is currently under development and will be published shortly."
    />
  );
}
