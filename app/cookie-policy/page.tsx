import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | Our CM Our Pride",
  description:
    "Understand how Our CM Our Pride uses cookies and similar tracking technologies on our civic platform.",
};

const cookieTypes = [
  {
    name: "Strictly Necessary Cookies",
    purpose:
      "These cookies are essential for the Website to function correctly. They enable core functionality such as page navigation, security, and accessibility. The Website cannot function properly without these cookies.",
    canDisable: false,
    examples: [
      "Session management cookies that keep you logged in during a visit.",
      "Security cookies that help detect and prevent malicious activity.",
      "Load-balancing cookies that distribute traffic across our servers.",
    ],
  },
  {
    name: "Analytics and Performance Cookies",
    purpose:
      "These cookies collect information about how visitors use our Website — for example, which pages are visited most frequently and whether visitors receive error messages. All information collected is aggregated and anonymous.",
    canDisable: true,
    examples: [
      "Google Analytics cookies (_ga, _gid, _gat) that track page visits, session duration, and referral sources.",
      "Performance monitoring cookies that identify slow-loading pages or technical errors.",
    ],
  },
  {
    name: "Functionality Cookies",
    purpose:
      "These cookies allow the Website to remember choices you make — such as your preferred language or region — and provide enhanced, more personal features. The information these cookies collect may be anonymised.",
    canDisable: true,
    examples: [
      "Preference cookies that remember your selected settings between visits.",
      "Language and region cookies that ensure content is displayed appropriately.",
    ],
  },
  {
    name: "Social Media and Embedding Cookies",
    purpose:
      "These cookies are set by third-party social media platforms whose content — such as video embeds, share buttons, or feed widgets — appears on our Website. They may track your browsing activity across other websites.",
    canDisable: true,
    examples: [
      "Facebook and Instagram cookies set when social media buttons or embeds are present on a page.",
      "YouTube cookies set when embedded video content is displayed.",
    ],
  },
];

const sections = [
  {
    number: "01",
    title: "What Are Cookies?",
    content: [
      "Cookies are small text files that are placed on your device — computer, smartphone, or tablet — when you visit a website. They are widely used by website owners to make websites work efficiently, to provide reporting information, and to deliver a more personalised experience.",
      `Cookies set by the website owner are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website.`,
      `Cookies may be "session cookies" — which are deleted when you close your browser — or "persistent cookies" — which remain on your device for a set period or until you manually delete them.`,
    ],
  },
  {
    number: "02",
    title: "Why We Use Cookies",
    content: [
      "Our CM Our Pride uses cookies and similar tracking technologies to:",
    ],
    list: [
      "Ensure the Website functions correctly and securely.",
      "Understand how visitors interact with our content so we can improve our platform.",
      "Remember your preferences and settings to improve your browsing experience.",
      "Measure the effectiveness of our civic engagement campaigns and events.",
      "Enable social media sharing and third-party content integrations.",
    ],
    content2: [
      "We are committed to using only those cookies that are necessary for a safe and functional experience, or where we have a clear legitimate interest and have obtained your consent.",
    ],
  },
  {
    number: "03",
    title: "Types of Cookies We Use",
  },
  {
    number: "04",
    title: "Third-Party Services and Their Cookies",
    content: [
      "We use a number of third-party services that may place cookies on your device. These include:",
    ],
    list: [
      "Google Analytics: We use Google Analytics to understand how visitors use our Website. Google Analytics sets cookies to collect information such as the number of visitors, the pages they visit, and the time they spend on each page. This data is anonymised and aggregated. You can learn more about Google's privacy practices at google.com/policies/privacy, and you can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on.",
      "Google Maps: Where map embeds appear on our Website (such as our Contact page), Google may set cookies associated with the Maps service.",
      "Social Media Platforms: Facebook, Instagram, and other social media platforms may set cookies when share buttons or embedded content from those platforms appear on our pages.",
    ],
    content2: [
      "We do not control the cookies set by these third-party services. We recommend reviewing their respective privacy and cookie policies for full information.",
    ],
  },
  {
    number: "05",
    title: "Managing and Disabling Cookies",
    content: [
      "You have the right to decide whether to accept or reject non-essential cookies. Most web browsers allow you to manage your cookie preferences through the browser's settings. You can typically:",
    ],
    list: [
      "View what cookies have been set on your device and delete them.",
      "Block cookies from specific websites or all websites.",
      "Set your browser to alert you when cookies are being set.",
    ],
    content2: [
      "Please note that if you choose to disable cookies, some features of our Website may not function as intended. For example, your language preferences may not be remembered between visits.",
      "The following links provide guidance on how to manage cookies in commonly used browsers:",
    ],
    list2: [
      "Google Chrome: support.google.com/chrome",
      "Mozilla Firefox: support.mozilla.org",
      "Apple Safari: support.apple.com",
      "Microsoft Edge: support.microsoft.com",
    ],
  },
  {
    number: "06",
    title: "Do Not Track Signals",
    content: [
      `Some browsers include a "Do Not Track" feature that signals to websites you visit that you do not wish to have your online activity tracked. Our Website does not currently respond to Do Not Track signals. However, you can use the cookie management options described in Section 5 to limit tracking on our Website.`,
    ],
  },
  {
    number: "07",
    title: "Updates to This Cookie Policy",
    content: [
      `We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our operational practices. When we make changes, we will update the "Last Updated" date at the top of this page.`,
      "We encourage you to review this policy periodically to stay informed about how we use cookies.",
    ],
  },
  {
    number: "08",
    title: "Contact Us",
    content: [
      "If you have any questions or concerns about our use of cookies or this Cookie Policy, please contact us:",
    ],
    list: [
      "Email: infoourcmourpride@gmail.com",
      "Phone: +91 63822 07898",
      "Address: 41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India",
      "Office Hours: Monday – Saturday, 9:00 AM to 6:00 PM IST",
    ],
  },
];

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-sm text-slate-500 mb-5">
              Last Updated: <strong className="text-slate-700">June 18, 2026</strong>
            </p>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              This Cookie Policy explains what cookies are, how Our CM Our Pride uses them, and
              how you can manage your preferences when visiting our Website.
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
                      {section.content?.map((para, j) => (
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

                      {/* Cookie type cards for section 03 */}
                      {section.number === "03" && (
                        <div className="space-y-5 mt-4">
                          {cookieTypes.map((type) => (
                            <div
                              key={type.name}
                              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
                            >
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <h3 className="font-poppins font-semibold text-base text-navy leading-snug">
                                  {type.name}
                                </h3>
                                <span
                                  className={`shrink-0 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wider ${
                                    type.canDisable
                                      ? "bg-slate-200 text-slate-600"
                                      : "bg-primary/10 text-primary"
                                  }`}
                                >
                                  {type.canDisable ? "Optional" : "Required"}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600 leading-7 mb-3">
                                {type.purpose}
                              </p>
                              <ul className="space-y-1.5 pl-3">
                                {type.examples.map((ex, j) => (
                                  <li key={j} className="flex items-start gap-2 text-xs text-slate-500 leading-6">
                                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                                    {ex}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
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
                  <strong className="text-navy">Transparency first:</strong> We use cookies only
                  where they help us serve you better or improve our platform. We do not use
                  cookies to sell your data or track you across unrelated websites.
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
