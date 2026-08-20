import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Our CM Our Pride",
  description:
    "How registration confirmations, QR entry passes, digital certificates, and event materials are delivered for Our CM Our Pride – Mega Marathon 2026.",
};

const sections = [
  {
    number: "01",
    title: "Applicability",
    content: [
      `This Shipping & Delivery Policy explains how registration confirmations, digital entry passes, digital certificates, and physical event materials are delivered to participants of the Our CM Our Pride – Mega Marathon 2026, organised by Great Indian Movement.`,
      "Because event registration is a service rather than a physical product shipped through standard e-commerce channels, delivery of most registration outputs is digital, as described below. This Policy should be read together with our Terms and Conditions.",
    ],
  },
  {
    number: "02",
    title: "Physical Participant – Digital Delivery",
    content: [
      "For Physical Participant registrations (₹399), the following are delivered digitally, by email, once payment is successfully verified:",
    ],
    list: [
      "Registration confirmation, including your unique registration ID.",
      "A QR-based digital entry pass, which may be downloaded from the Website or presented from your email/device at the venue.",
      "Event details, including the venue, reporting instructions and any pre-event communication shared by the organizer.",
    ],
  },
  {
    number: "03",
    title: "Physical Participant – Event Kit, T-Shirt and Medal",
    content: [
      "The event kit, T-shirt and finisher medal associated with Physical Participant registration are physical items connected to your on-ground participation in the event, rather than items shipped to a home address.",
      "Distribution arrangements — including collection points, timings, or on-event distribution — will be communicated by the organizer closer to the event date through email and/or the Website. Please refer to those official communications for the applicable collection or distribution process for the Mega Marathon 2026.",
    ],
  },
  {
    number: "04",
    title: "E-Participant – Digital Delivery",
    content: [
      "For E-Participant registrations (₹52), the following are delivered digitally, by email, once payment is successfully verified:",
    ],
    list: [
      "Registration confirmation, including your unique registration ID.",
      "A digital participation certificate, generated electronically and made available for download.",
      "A QR code associated with your certificate, which can be used together with the certificate verification page to confirm authenticity.",
    ],
    content2: [
      "Your digital certificate may contain your participant name, a unique certificate ID, and QR verification information. It does not require any physical shipping.",
    ],
  },
  {
    number: "05",
    title: "Email Delivery",
    content: [
      "Registration confirmations, entry passes and certificates are sent to the email address provided at the time of registration. Delivery times may vary slightly depending on your email provider. If you do not receive an expected email within a reasonable time, please check your spam/junk folder before contacting us.",
    ],
  },
  {
    number: "06",
    title: "Responsibility for Correct Email Address",
    content: [
      "Participants are responsible for providing an accurate and actively monitored email address at the time of registration. We are not responsible for non-delivery of registration confirmations, entry passes or certificates caused by an incorrect, mistyped, or inactive email address supplied by the participant.",
      "If you notice an error in your email address after registration, please contact us as soon as possible so that we can assist where feasible.",
    ],
  },
  {
    number: "07",
    title: "Certificate Reissue and Support",
    content: [
      "If you are unable to locate your digital certificate or entry pass, or believe there is an error on it (for example, a misspelt name), please contact us with your registration ID or certificate ID. Where the request is genuine and verifiable, we will assist with reissuing the relevant document.",
    ],
  },
  {
    number: "08",
    title: "Delays Outside Our Control",
    content: [
      "While we aim to deliver digital confirmations, entry passes and certificates promptly after successful payment verification, delivery may occasionally be delayed due to factors outside our reasonable control, including email service outages, internet connectivity issues, or delays at the payment gateway in confirming a transaction. We will make reasonable efforts to resolve such delays as quickly as possible.",
    ],
  },
  {
    number: "09",
    title: "Contact Information",
    content: [
      "For any query relating to delivery of your registration confirmation, entry pass, certificate, or event kit/T-shirt/medal distribution, please contact us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: NO; 73A, 13th Street Ram Nagar South, Madipakkam, Chennai - 600091",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function ShippingDeliveryPolicyPage() {
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
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">August 9, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              This policy explains how registration confirmations, digital entry passes,
              certificates, and event materials are delivered for Mega Marathon 2026 registrations.
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
                  <strong className="text-navy">Digital-first delivery:</strong> Most registration
                  outputs for the Mega Marathon 2026 are delivered electronically. Official
                  communications from Great Indian Movement will confirm any on-ground collection
                  or distribution arrangements.
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
