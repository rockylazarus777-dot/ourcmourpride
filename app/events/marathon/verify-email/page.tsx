import { Metadata } from "next";
import VerifyEmailView from "@/components/marathon/VerifyEmailView";
import { MARATHON_EVENT_NAME } from "@/types/marathon";

export const metadata: Metadata = {
  title: `${MARATHON_EVENT_NAME} | Verify Email`,
  description: "Verify your email address to continue your Mega Marathon 2026 registration.",
};

export default function MarathonVerifyEmailPage() {
  return <VerifyEmailView />;
}
