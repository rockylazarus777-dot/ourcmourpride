import { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";

export const metadata: Metadata = {
  title: "Our Team | OUR CM OUR PRIDE",
  description:
    "Meet the dedicated team behind Our CM Our Pride — passionate individuals committed to community welfare, public outreach, and citizen-focused initiatives across Tamil Nadu.",
  keywords: [
    "Our CM Our Pride team",
    "community leaders Tamil Nadu",
    "welfare team",
    "public service",
    "team members",
  ],
  openGraph: {
    title: "Our Team | OUR CM OUR PRIDE",
    description:
      "Dedicated individuals working together to support community welfare, public service, and the vision of Our CM Our Pride.",
    type: "website",
  },
};

export default function TeamPage() {
  return <TeamPageClient />;
}
