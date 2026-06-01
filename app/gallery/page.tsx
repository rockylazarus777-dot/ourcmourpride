import type { Metadata } from "next";
import ComingSoonPage from "@/components/common/ComingSoonPage";

export const metadata: Metadata = {
  title: "Gallery | Our CM Our Pride",
  description: "Photo and media galleries will be available soon.",
};

export default function GalleryPage() {
  return (
    <ComingSoonPage
      title="Gallery"
      description="Photo and media galleries will be available soon."
    />
  );
}
