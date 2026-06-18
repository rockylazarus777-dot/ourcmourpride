import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Our CM Our Pride",
  description:
    "Read the Terms and Conditions governing your use of the Our CM Our Pride civic engagement platform.",
};

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: [
      `By accessing or using the Our CM Our Pride website ("the Website"), you confirm that you are at least 13 years of age, that you have read and understood these Terms and Conditions, and that you agree to be bound by them. If you do not agree to these terms, please discontinue use of the Website immediately.`,
      "These Terms and Conditions constitute a legally binding agreement between you and Our CM Our Pride regarding your use of the Website and any content, services, or features accessible through it.",
    ],
  },
  {
    number: "02",
    title: "About Our CM Our Pride",
    content: [
      "Our CM Our Pride is a civic engagement and community development initiative dedicated to celebrating visionary leadership, inclusive governance, and the collective aspirations of the citizens of Tamil Nadu. The platform serves as a bridge between communities and public policy, highlighting developmental efforts, social welfare initiatives, youth empowerment, environmental sustainability, and economic growth across the state.",
      "The Website is operated by Our CM Our Pride from Chennai, Tamil Nadu, India. Our registered office is located at 41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India.",
    ],
  },
  {
    number: "03",
    title: "Permitted Use of the Website",
    content: [
      "You are granted a limited, non-exclusive, non-transferable, revocable licence to access and use the Website for personal, non-commercial purposes in accordance with these Terms and Conditions.",
      "Permitted activities include:",
    ],
    list: [
      "Browsing and viewing content published on the Website.",
      "Submitting enquiries or feedback through our contact form.",
      "Registering for events and civic activities hosted or promoted by Our CM Our Pride.",
      "Sharing Website content on social media using the share functions provided, provided attribution to our platform is maintained.",
    ],
  },
  {
    number: "04",
    title: "Prohibited Activities",
    content: [
      "When using the Website, you agree not to:",
    ],
    list: [
      "Use the Website for any unlawful purpose or in violation of any applicable local, state, national, or international laws or regulations.",
      "Reproduce, duplicate, copy, sell, or exploit any portion of the Website or its content without our express written permission.",
      "Attempt to gain unauthorised access to any part of the Website, our servers, or any database connected to the Website.",
      "Transmit any unsolicited commercial communications, spam, or junk mail through our contact forms or other channels.",
      "Introduce any viruses, Trojan horses, worms, or other harmful software to the Website.",
      "Use any automated means — including bots, scrapers, or crawlers — to access the Website in a manner that imposes an unreasonable load on our infrastructure.",
      "Impersonate any person or entity, or falsely state or misrepresent your affiliation with any person or entity.",
      "Engage in any conduct that restricts or inhibits any other person's use or enjoyment of the Website.",
    ],
  },
  {
    number: "05",
    title: "Intellectual Property Rights",
    content: [
      "All content on the Website — including but not limited to text, photographs, graphics, logos, icons, audio clips, digital downloads, video clips, and the compilation of such content — is the property of Our CM Our Pride or its content suppliers and is protected by the applicable intellectual property and copyright laws of India.",
      "Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Our CM Our Pride. Unauthorised use of our intellectual property may give rise to a claim for damages and/or be a criminal offence.",
      "You are permitted to print or download extracts from the Website for your personal use only, provided that no documents or related graphics are modified, and that any copyright notice contained in the material is retained.",
    ],
  },
  {
    number: "06",
    title: "User Submissions",
    content: [
      "If you submit any material to us — including comments, feedback, suggestions, photographs, or other content — you grant Our CM Our Pride a non-exclusive, royalty-free, perpetual, irrevocable, and fully sub-licensable right to use, reproduce, modify, adapt, publish, translate, and display such material in any media.",
      "You represent and warrant that you own or otherwise control all of the rights to the content you submit, that the content is accurate, and that use of the content does not violate these Terms and Conditions or cause injury to any person or entity.",
    ],
  },
  {
    number: "07",
    title: "Third-Party Links and Resources",
    content: [
      "The Website may contain links to external websites, government portals, social media platforms, and third-party resources for your convenience and information. These links do not signify our endorsement of those websites or any association with their operators.",
      "We have no control over the content, privacy practices, or availability of external sites. We strongly encourage you to read the terms of use and privacy policies of any third-party website you visit. Your use of external sites is at your own risk.",
    ],
  },
  {
    number: "08",
    title: "Disclaimer of Warranties",
    content: [
      `The Website and all content, services, and features available through it are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, Our CM Our Pride disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
      "We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the Website.",
    ],
  },
  {
    number: "09",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, Our CM Our Pride, its officers, directors, employees, volunteers, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of, or inability to use, the Website or its content.",
      "This includes, without limitation, damages for loss of profits, goodwill, data, or other intangible losses, even if Our CM Our Pride has been advised of the possibility of such damages. Our total liability for any claim arising out of or relating to these Terms and Conditions shall not exceed one thousand Indian Rupees (₹1,000).",
    ],
  },
  {
    number: "10",
    title: "Indemnification",
    content: [
      "You agree to defend, indemnify, and hold harmless Our CM Our Pride and its officers, directors, employees, volunteers, and agents from and against any claims, liabilities, damages, losses, and expenses — including reasonable legal fees — arising out of or in any way connected with your access to or use of the Website, your violation of these Terms and Conditions, or your violation of any third-party rights.",
    ],
  },
  {
    number: "11",
    title: "Governing Law and Jurisdiction",
    content: [
      "These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or relating to these terms or the Website shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.",
    ],
  },
  {
    number: "12",
    title: "Severability",
    content: [
      "If any provision of these Terms and Conditions is found to be unlawful, void, or unenforceable for any reason, that provision shall be deemed severable from the remaining terms and shall not affect the validity and enforceability of the remaining provisions.",
    ],
  },
  {
    number: "13",
    title: "Modifications to Terms",
    content: [
      `We reserve the right to modify these Terms and Conditions at any time at our sole discretion. When we do so, we will update the "Last Updated" date at the top of this page. Your continued use of the Website following the posting of revised terms constitutes your acceptance of those changes.`,
      "We encourage you to review these Terms and Conditions periodically to stay informed of any updates.",
    ],
  },
  {
    number: "14",
    title: "Contact Us",
    content: [
      "If you have any questions about these Terms and Conditions, please contact us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: 41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function TermsAndConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">June 18, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              Please read these Terms and Conditions carefully before using the Our CM Our Pride
              website. Your continued use of the platform signifies your agreement to these terms.
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
                  <strong className="text-navy">A platform built on trust:</strong> These terms
                  exist to ensure Our CM Our Pride remains a safe, respectful, and productive space
                  for every citizen engaged in shaping a better Tamil Nadu.
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
