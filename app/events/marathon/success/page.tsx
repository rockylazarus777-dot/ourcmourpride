import { Metadata } from "next";
import SuccessView from "@/components/marathon/SuccessView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | Registration Successful`,
  robots: { index: false, follow: false },
};

export default function MarathonSuccessPage() {
  return <SuccessView />;
}
