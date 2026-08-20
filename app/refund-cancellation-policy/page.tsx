import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Our CM Our Pride",
  description:
    "Cancellation and refund policy for Our CM Our Pride – Mega Marathon 2026 registrations, covering Physical Participant and E-Participant fees.",
};

const sections = [
  {
    number: "01",
    title: "Applicability",
    content: [
      `This Cancellation & Refund Policy ("Policy") applies to registrations made for the Our CM Our Pride – Mega Marathon 2026, organised by Great Indian Movement, through the registration flow available at /events/marathon/register. It covers both the Physical Participant registration fee of ₹399 and the E-Participant registration fee of ₹52.`,
      "This Policy should be read together with our Terms and Conditions, which govern event registration more generally. Where this Policy is silent on a point, the Terms and Conditions will apply.",
    ],
  },
  {
    number: "02",
    title: "Registration Cancellation by a Participant",
    content: [
      "If you wish to cancel a registration you have made, please contact us using the details in the Contact Information section below, quoting your registration ID and the email address used at registration.",
      "Refund eligibility for a participant-initiated cancellation will be determined in accordance with the applicable event cancellation and refund terms communicated by Great Indian Movement at the time of your request. Because registration fees fund event kits, T-shirts, medals, certificates and on-ground arrangements that are procured in advance, cancellation requests made closer to the event date may have limited or no refund eligibility.",
    ],
  },
  {
    number: "03",
    title: "Refund Eligibility",
    content: [
      "Refund eligibility depends on the circumstances of the request — for example, whether the request relates to a genuine payment error, a duplicate charge, an event-side cancellation or postponement, or a participant's own change of plans.",
      "Refund eligibility will be determined in accordance with the applicable event cancellation and refund terms communicated by Great Indian Movement, and reviewed by our team on a case-by-case basis where the situation is not expressly covered by this Policy.",
    ],
  },
  {
    number: "04",
    title: "Non-Refundable Situations",
    content: [
      "The following situations are generally not eligible for a refund, unless otherwise decided by the organizer:",
    ],
    list: [
      "A participant's decision not to attend the event after successfully completing registration and payment.",
      "Registration cancelled or refused due to inaccurate, incomplete or fraudulent information provided at the time of registration.",
      "Failure to complete the check-in process at the venue on the event day (for Physical Participants).",
      "Requests made after any cancellation window communicated by the organizer has closed.",
    ],
  },
  {
    number: "05",
    title: "Event Cancellation",
    content: [
      "If Great Indian Movement cancels the Mega Marathon 2026 in its entirety, participants will be notified by email and/or through the Website, and refund arrangements (if any) will be communicated at that time, in accordance with the applicable event cancellation and refund terms.",
    ],
  },
  {
    number: "06",
    title: "Event Postponement",
    content: [
      "If the event date is postponed or rescheduled, existing registrations will generally continue to be valid for the new date, unless the organizer communicates otherwise. Participants who are unable to attend the rescheduled date may contact us to discuss available options, which will be considered in accordance with the applicable event terms.",
    ],
  },
  {
    number: "07",
    title: "Failed Payments",
    content: [
      "If a payment attempt fails, is declined, or is interrupted before completion, no registration is created and no amount should be charged. If your bank or payment method shows a deduction for a payment that our system did not confirm as successful, please contact us with your transaction reference so that we can investigate with our payment gateway.",
    ],
  },
  {
    number: "08",
    title: "Duplicate Payments",
    content: [
      "If you are charged more than once for the same registration due to a technical error, page refresh, or repeated submission, please contact us with both transaction references. Verified duplicate successful charges for the same registration will be reviewed, and the duplicate amount will be considered for refund once confirmed by our team and our payment gateway.",
    ],
  },
  {
    number: "09",
    title: "Incorrect or Incomplete Registration",
    content: [
      "If you believe you have registered with incorrect details (for example, the wrong participation category or a typographical error in your name or contact information), please contact us as soon as possible. Where feasible, we will assist with correcting the details on your registration record. Correction requests do not automatically entitle a participant to a refund or re-registration under a different category unless expressly agreed by the organizer.",
    ],
  },
  {
    number: "10",
    title: "Refund Processing",
    content: [
      "Where a refund is approved, it will be processed to the original payment method used for the transaction, through our payment gateway. Processing timelines depend on the payment method used and the policies of the relevant bank or payment provider, and are not fully within our control.",
      "We will make reasonable efforts to keep you informed of the status of an approved refund, but exact credit timelines should be confirmed with your bank or card issuer.",
    ],
  },
  {
    number: "11",
    title: "How to Request a Refund",
    content: [
      "To request a refund or raise a payment-related concern, please email us with the following information:",
    ],
    list: [
      "Your full name as used at registration.",
      "Your registration ID (if available).",
      "The email address and mobile number used at registration.",
      "The payment/transaction reference or order ID.",
      "A brief description of the issue (for example: duplicate payment, failed payment showing as deducted, or cancellation request).",
    ],
    content2: [
      "We aim to acknowledge refund and cancellation requests promptly and to work towards a resolution in accordance with this Policy.",
    ],
  },
  {
    number: "12",
    title: "Contact Information",
    content: [
      "For any registration, payment, cancellation, or refund query relating to the Mega Marathon 2026, please contact us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: NO; 73A, 13th Street Ram Nagar South, Madipakkam, Chennai - 600091",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function RefundCancellationPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        {/* Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-28 pb-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at top left, rgba(249, 115, 22, 0.10), transparent 30%), radial-gradient(circle at bottom right, rgba(251, 146, 60, 0.08), transparent 22%)",
            }}
          />
          <div className="container-max relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-primary mb-5">
              Legal Information
            </span>
            <h1 className="font-poppins font-black text-4xl sm:text-5xl text-navy leading-tight mb-4 max-w-2xl">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">August 9, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              This policy explains how cancellation and refund requests are handled for Our CM Our
              Pride – Mega Marathon 2026 registrations, covering both Physical Participant (₹399)
              and E-Participant (₹52) registrations.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="container-max">
            <div className="max-w-3xl">
              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div key={section.number}>
                    <div className="flex items-start gap-4 mb-4">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-xs font-bold font-poppins mt-0.5">
                        {section.number}
                      </span>
                      <h2 className="font-poppins font-bold text-xl text-navy leading-snug">
                        {section.title}
                      </h2>
                    </div>

                    <div className="ml-12 space-y-4 text-sm leading-8 text-slate-600">
                      {section.content.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}

                      {section.list && (
                        <ul className="space-y-2.5 pl-4">
                          {section.list.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.content2?.map((para, j) => (
                        <p key={`c2-${j}`}>{para}</p>
                      ))}
                    </div>

                    {i < sections.length - 1 && (
                      <div className="mt-10 border-t border-slate-100" />
                    )}
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-12 rounded-[1.5rem] border border-primary/15 bg-orange-50/60 p-6">
                <p className="text-sm text-slate-600 leading-7">
                  <strong className="text-navy">A fair process:</strong> Refund eligibility is
                  determined in accordance with the event terms set by Great Indian Movement. We
                  are committed to reviewing every genuine request promptly and transparently.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
