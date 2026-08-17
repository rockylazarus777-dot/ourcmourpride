import { Metadata } from "next";
import PledgeView from "@/components/marathon/PledgeView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | The Marathon Pledge`,
  description: "Take the Our CM Our Pride Mega Marathon 2026 pledge before continuing your registration.",
};

export default function MarathonPledgePage() {
  return <PledgeView />;
}
