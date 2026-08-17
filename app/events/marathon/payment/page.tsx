import { Metadata } from "next";
import PaymentView from "@/components/marathon/PaymentView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | Payment`,
  description: "Complete your secure payment to confirm your Mega Marathon 2026 registration.",
};

export default function MarathonPaymentPage() {
  return <PaymentView />;
}
