import { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Events | OUR CM OUR PRIDE",
  description:
    "Join the Mega Pink Marathon — a powerful people's movement dedicated to creating a Breast Cancer Free Tamil Nadu by 2030.",
};

export default function EventsPage() {
  return <EventsPageClient />;
}
