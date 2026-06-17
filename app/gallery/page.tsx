import { Metadata } from "next";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery | Our CM Our Pride",
  description:
    "A premium event gallery showcasing citizen-first initiatives and community moments.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
