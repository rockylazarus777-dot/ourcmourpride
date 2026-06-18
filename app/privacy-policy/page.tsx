import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Our CM Our Pride",
  description:
    "Learn how Our CM Our Pride collects, uses, and protects your personal information on our civic engagement platform.",
};

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: [
      `Our CM Our Pride ("we", "us", or "our") is a civic engagement and community development platform dedicated to celebrating visionary leadership, inclusive governance, and the collective aspirations of the people of Tamil Nadu. We operate this website at the address you are currently visiting.`,
      "We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, why we collect it, how we use it, and what rights you have in relation to it. Please read this policy carefully. If you disagree with any part of it, please discontinue use of our website.",
    ],
  },
  {
    number: "02",
    title: "Information We Collect",
    content: [
      "We collect information you voluntarily provide to us when you interact with our platform. This includes:",
    ],
    list: [
      "Personal identification information such as your full name, email address, and phone number when you submit our contact forms or register for events.",
      "Communications you send us, including the content of messages submitted through our contact form or sent directly to our email address.",
      "Event registration details including age category and participation preferences submitted through our event registration forms.",
    ],
    content2: [
      "We also collect certain information automatically when you visit our website:",
    ],
    list2: [
      "Log and usage data such as your IP address, browser type and version, operating system, referring URLs, pages viewed, and time spent on each page.",
      "Device information including the type of device you use to access our website.",
      "Cookie and tracking data as described in our Cookie Policy.",
    ],
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: [
      "We use the personal information we collect for the following purposes:",
    ],
    list: [
      "To respond to your enquiries, feedback, and support requests in a timely and effective manner.",
      "To provide you with information about upcoming events, civic initiatives, and community programs — only where you have expressed interest or provided consent.",
      "To process event registrations and communicate relevant participation details.",
      "To analyse website usage patterns and improve the overall experience on our platform.",
      "To maintain the security and integrity of our website.",
      "To comply with applicable legal obligations and enforce our Terms and Conditions.",
    ],
    content2: [
      "We process your personal data based on your consent, our legitimate interest in operating a civic engagement platform, and our legal obligations under applicable Indian data protection laws.",
    ],
  },
  {
    number: "04",
    title: "Disclosure of Your Information",
    content: [
      "We do not sell, rent, or trade your personal information to any third party. We may share your information only in the following limited circumstances:",
    ],
    list: [
      "With trusted service providers who assist us in operating our website, such as web hosting providers, analytics platforms, and email service providers. These parties are contractually obligated to keep your information confidential and use it only for the purposes for which it was disclosed.",
      "With law enforcement, government authorities, or regulatory bodies when we are legally required to do so, or when disclosure is necessary to protect the rights, safety, or property of Our CM Our Pride, our users, or the public.",
      "In connection with any merger, acquisition, or transfer of assets, in which case we will notify you before your personal information is transferred and becomes subject to a different privacy policy.",
    ],
  },
  {
    number: "05",
    title: "Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our website, understand how visitors interact with our content, and improve our platform's performance. Cookies are small text files stored on your device when you visit a website.",
      "For detailed information about the specific cookies we use, their purpose, and how you can manage your preferences, please refer to our Cookie Policy.",
    ],
  },
  {
    number: "06",
    title: "Data Retention",
    content: [
      "We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected, including satisfying any legal, regulatory, accounting, or reporting requirements.",
      "Contact form submissions are retained for a period of up to twelve months from the date of submission, after which they are securely deleted unless ongoing correspondence requires otherwise. Event registration data is retained for the duration of the event cycle and archived for up to twenty-four months thereafter.",
    ],
  },
  {
    number: "07",
    title: "Data Security",
    content: [
      "We implement appropriate technical and organisational security measures to protect your personal information against unauthorised access, accidental loss, disclosure, alteration, or destruction. These measures are reviewed and updated regularly to reflect advances in security best practices.",
      "However, please be aware that no method of transmission over the internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.",
    ],
  },
  {
    number: "08",
    title: "Your Rights and Choices",
    content: [
      "Depending on your location and applicable laws, you may have the following rights with respect to your personal data:",
    ],
    list: [
      "Right to Access: You may request a copy of the personal information we hold about you.",
      "Right to Correction: You may request that we correct any inaccurate or incomplete personal information.",
      "Right to Deletion: You may request that we delete your personal information, subject to certain legal exceptions.",
      "Right to Withdraw Consent: Where processing is based on your consent, you may withdraw that consent at any time without affecting the lawfulness of prior processing.",
      "Right to Opt Out of Communications: You may unsubscribe from our communications at any time by contacting us at the email address below.",
    ],
    content2: [
      "To exercise any of these rights, please contact us at infoourcmourpride@gmail.com. We will respond to your request within thirty days.",
    ],
  },
  {
    number: "09",
    title: "Third-Party Links",
    content: [
      "Our website may contain links to external websites, government portals, social media platforms, and other third-party resources. This Privacy Policy does not apply to those external sites, and we have no control over their content or privacy practices. We encourage you to review the privacy policy of any website you visit.",
    ],
  },
  {
    number: "10",
    title: "Children's Privacy",
    content: [
      "Our platform is not directed to children under the age of 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information without parental consent, please contact us immediately and we will take steps to delete that information.",
    ],
  },
  {
    number: "11",
    title: "Updates to This Policy",
    content: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make material changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.`,
      "Your continued use of our website after any changes constitutes your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    number: "12",
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please do not hesitate to contact us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: 41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">June 18, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              This policy explains how Our CM Our Pride collects, uses, and safeguards your
              personal information when you interact with our civic engagement platform.
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

                      {section.list2 && (
                        <ul className="space-y-2.5 pl-4">
                          {section.list2.map((item, j) => (
                            <li key={j} className="flex items-start gap-2.5">
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
                  <strong className="text-navy">Our commitment to you:</strong> We handle your
                  personal information with the same care and respect that underpins our mission —
                  transparent governance, citizen trust, and a stronger Tamil Nadu for every person.
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
