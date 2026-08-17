import { Metadata } from "next";
import DetailsView from "@/components/marathon/DetailsView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | Your Details`,
  description: "Complete your participant details for the Mega Marathon 2026.",
};

export default function MarathonDetailsPage() {
  return <DetailsView />;
}
