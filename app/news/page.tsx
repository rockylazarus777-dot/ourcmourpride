import type { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";

export const metadata: Metadata = {
  title: "News & Updates | Our CM Our Pride",
  description: "Latest updates and announcements will be published here soon.",
};

export default function NewsPage() {
  return (
    <ComingSoonPage
      title="News & Updates"
      description="Latest updates and announcements will be published here soon."
    />
  );
}
