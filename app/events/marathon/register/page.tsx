import { Metadata } from "next";
import { Suspense } from "react";
import RegisterView from "@/components/marathon/RegisterView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | Register`,
  description:
    "Register for the Our CM Our Pride – Mega Marathon 2026, a 5 KM run at Napier Bridge, Chennai on 19 September 2026. Join as a Physical Participant or E-Participant.",
};

export default function MarathonRegisterPage() {
  return (
    <Suspense>
      <RegisterView />
    </Suspense>
  );
}
