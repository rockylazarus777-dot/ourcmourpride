import { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events & Public Welfare Initiatives | OUR CM OUR PRIDE",
  description:
    "Explore community welfare, healthcare, education, environment, and social development initiatives by Our CM Our Pride across Tamil Nadu.",
  keywords: [
    "Tamil Nadu welfare programs",
    "community initiatives",
    "public welfare",
    "healthcare camps",
    "education programs",
    "social development",
    "Our CM Our Pride events",
  ],
  openGraph: {
    title: "Events & Public Welfare Initiatives | OUR CM OUR PRIDE",
    description:
      "52+ community initiatives covering healthcare, education, women empowerment, environment, and more across Tamil Nadu.",
    type: "website",
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}
