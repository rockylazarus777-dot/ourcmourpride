import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | Our CM Our Pride",
  description:
    "Important disclaimer regarding the content, purpose, and limitations of the Our CM Our Pride civic platform.",
};

const sections = [
  {
    number: "01",
    title: "General Information Disclaimer",
    content: [
      `The information contained on the Our CM Our Pride website ("the Website") is provided for general informational and civic engagement purposes only. While we make every effort to ensure the accuracy and currency of the content we publish, we make no representations or warranties of any kind — express or implied — about the completeness, accuracy, reliability, suitability, or availability of the information, services, events, or related graphics contained on the Website.`,
      "Any reliance you place on the information contained on the Website is strictly at your own risk. We reserve the right to modify, update, or remove any content at any time without notice.",
    ],
  },
  {
    number: "02",
    title: "Accuracy of Information",
    content: [
      "Our CM Our Pride makes reasonable efforts to ensure that the information on this Website is accurate and up to date. However, errors or omissions may occur, and information may become outdated. We do not guarantee that:",
    ],
    list: [
      "All content is complete, accurate, or current at the time of reading.",
      "The Website is free from technical errors, typographical mistakes, or factual inaccuracies.",
      "Statistical data, figures, or reports cited on the Website reflect the most recent available figures.",
    ],
    content2: [
      "If you identify any inaccuracy in the content on our Website, we welcome you to notify us at infoourcmourpride@gmail.com so that we may review and correct it promptly.",
    ],
  },
  {
    number: "03",
    title: "No Professional or Legal Advice",
    content: [
      "The content on this Website is provided for general informational purposes only and does not constitute professional advice of any kind — including but not limited to legal, financial, medical, political, administrative, or governmental advice.",
      "Nothing on this Website should be interpreted as:",
    ],
    list: [
      "Official government guidance, policy, or a statement on behalf of any government body or ministry.",
      "Legal advice regarding eligibility for government schemes, welfare programmes, or entitlements.",
      "Financial advice concerning government grants, subsidies, or public funds.",
      "Medical guidance regarding any health initiatives, programmes, or public health campaigns.",
    ],
    content2: [
      "For authoritative information on government schemes, welfare programmes, or official policies, please refer directly to the relevant government departments, official Tamil Nadu state government portals, or consult a qualified professional.",
    ],
  },
  {
    number: "04",
    title: "Civic and Community Nature of the Platform",
    content: [
      "Our CM Our Pride is a civic engagement and community development platform. The content published on this Website is intended to celebrate public initiatives, community programmes, and the collective progress of Tamil Nadu's citizens.",
      "While the platform celebrates the leadership of Chief Minister C. Joseph Vijay, it is operated independently as a civic initiative and does not represent, speak on behalf of, or function as an official communication channel for the Government of Tamil Nadu, the office of the Chief Minister, or any government department or statutory body.",
      "Content published on this platform — including news updates, event announcements, and community stories — reflects the views and activities of Our CM Our Pride and its contributors. It does not constitute official government communication, policy announcements, or political messaging sanctioned by any government authority.",
    ],
  },
  {
    number: "05",
    title: "External Links Disclaimer",
    content: [
      "This Website may contain links to external websites, government portals, news sources, social media platforms, and other third-party resources. These links are provided for your convenience and to enhance the informational value of our content.",
      "Our CM Our Pride does not endorse, control, or accept responsibility for the content, accuracy, privacy practices, or availability of any external website linked to or from this Website. The inclusion of any link does not imply our endorsement of that website or any association with its operators.",
      "Accessing any external website through a link on our platform is entirely at your own discretion and risk.",
    ],
  },
  {
    number: "06",
    title: "Technical Disclaimer",
    content: [
      "Our CM Our Pride makes every reasonable effort to maintain the availability and performance of this Website. However, we do not guarantee that the Website will be:",
    ],
    list: [
      "Available at all times or uninterrupted.",
      "Free from technical errors, bugs, or security vulnerabilities.",
      "Compatible with all devices, browsers, or operating systems.",
    ],
    content2: [
      "We accept no liability for any loss or inconvenience caused by temporary unavailability of the Website due to technical issues, maintenance, or factors beyond our control.",
    ],
  },
  {
    number: "07",
    title: "Event and Programme Information",
    content: [
      "Information about events, community programmes, marathons, and civic initiatives published on this Website is subject to change without prior notice. Dates, venues, registration details, and programme content may be updated, postponed, or cancelled due to circumstances outside our control.",
      "We strongly recommend that you verify current event details directly with our team before making travel arrangements or commitments. Contact us at infoourcmourpride@gmail.com or call +91 63822 07898 to confirm current information.",
    ],
  },
  {
    number: "08",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by the laws of India, Our CM Our Pride, its officers, volunteers, contributors, and associates shall not be held liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:",
    ],
    list: [
      "Your use of, or inability to use, this Website or its content.",
      "Any errors or omissions in the content of the Website.",
      "Reliance on any information provided on the Website.",
      "Any unauthorised access to or use of our servers and any personal information stored therein.",
      "Any interruption or cessation of transmission to or from the Website.",
    ],
  },
  {
    number: "09",
    title: "Jurisdictional Notice",
    content: [
      "This Website is operated from Chennai, Tamil Nadu, India. The laws of India govern this Disclaimer and your use of this Website. If you are accessing this Website from outside India, you do so at your own risk and are responsible for compliance with the local laws of your jurisdiction.",
      "We make no representation that the content on this Website is appropriate or available for use in locations outside India.",
    ],
  },
  {
    number: "10",
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or feedback regarding this Disclaimer or any content on our Website, please reach out to us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: 41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function DisclaimerPage() {
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
              Disclaimer
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">June 18, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Please read this Disclaimer carefully. It sets out important limitations about the
              nature and purpose of content published on the Our CM Our Pride platform.
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
                  <strong className="text-navy">Our platform, our purpose:</strong> Our CM Our
                  Pride exists to inspire civic engagement and celebrate community progress. We are
                  committed to transparency, accuracy, and the responsible use of information in
                  service of Tamil Nadu's citizens.
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
