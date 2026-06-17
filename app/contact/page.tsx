import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Mail, Phone, ShieldCheck, MessageSquare, Users, Globe2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/sections/CTASection";

const contactDetails = [
  {
    icon: MapPin,
    title: "Office Location",
    description:
      "41/109, Pillayar Kovil Street, Teynampet, Chennai – 600018, Tamil Nadu, India. Visit us for program support, public feedback, and official requests.",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "+91 63822 07898 | Monday – Saturday, 9:00 AM to 6:00 PM IST.",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "infoourcmourpride@gmail.com — for civic concerns, partnership requests, and service guidance.",
  },
  {
    icon: Clock,
    title: "Citizen Response",
    description: "Your message reaches our dedicated team quickly with a focus on clear answers and faster follow-up.",
  },
];

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Trusted Guidance",
    description: "Receive factual, citizen-first responses from our office and state program specialists.",
  },
  {
    icon: MessageSquare,
    title: "Open Communication",
    description: "A transparent channel for questions, feedback, and direct updates from our leadership team.",
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "We connect every citizen with the right team for local issues and shared initiatives.",
  },
  {
    icon: Globe2,
    title: "Accessible Support",
    description: "Digital and offline contact options make it easy to reach us from anywhere across Tamil Nadu.",
  },
];

export const metadata: Metadata = {
  title: "Contact | Our CM Our Pride",
  description:
    "Contact the team behind Our CM Our Pride for support, civic engagement, and program information.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-28 pb-20">
          <div className="container-max relative">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 28%), radial-gradient(circle at bottom right, rgba(251, 146, 60, 0.10), transparent 20%)",
              }}
            />
            <div className="relative grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-primary mb-6">
                  Contact & Support
                </span>
                <h1 className="font-poppins font-black text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight max-w-3xl mb-6">
                  Connect with the team shaping a stronger, fairer future.
                </h1>
                <p className="max-w-2xl text-base md:text-lg text-navy/70 leading-relaxed mb-10">
                  Share your feedback, ask about state programs, or request support. Our office is here to listen, respond, and move with every citizen.
                </p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[28px] border border-primary/15 bg-white p-7 shadow-card">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-3">Office Location</p>
                    <p className="font-semibold text-navy text-xl mb-3">41/109, Pillayar Kovil Street</p>
                    <p className="text-sm leading-7 text-slate-600">
                      Teynampet,
                      <br />Chennai – 600018,
                      <br />Tamil Nadu, India
                    </p>
                  </div>
                  <div className="rounded-[28px] border border-primary/15 bg-white p-7 shadow-card">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary font-bold mb-3">Response Promise</p>
                    <p className="font-semibold text-navy text-xl mb-3">Trusted and timely</p>
                    <p className="text-sm leading-7 text-slate-600">
                      Every enquiry is directed to the right team with priority for clarity, care, and citizen service.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-card">
                  <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-br from-primary to-orange-500" />
                  <div className="relative p-8 pt-24">
                    <div className="mb-8">
                      <p className="text-sm uppercase tracking-[0.32em] text-white/90 mb-4">Contact Information</p>
                      <h2 className="text-3xl font-black text-white leading-tight">
                        Reach us directly.
                      </h2>
                    </div>
                    <div className="rounded-[2rem] bg-white p-6 shadow-[0_15px_40px_rgba(15,23,42,0.08)]">
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        For any civic request or support query, use the email and phone below. We are ready to assist with every citizen interaction.
                      </p>

                      <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                          <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Mail size={20} aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary mb-2">EMAIL</p>
                            <a href="mailto:infoourcmourpride@gmail.com" className="font-semibold text-slate-900 text-lg leading-8 hover:text-slate-800">
                              infoourcmourpride@gmail.com
                            </a>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Phone size={20} aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary mb-2">PHONE</p>
                            <a href="tel:+916382207898" className="font-semibold text-slate-900 text-lg leading-8 hover:text-slate-800">
                              +91 63822 07898
                            </a>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <MapPin size={20} aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-primary mb-2">ADDRESS</p>
                            <address className="not-italic font-semibold text-slate-900 text-lg leading-8">
                              41/109, Pillayar Kovil Street
                              <br />Teynampet
                              <br />Chennai – 600018
                              <br />Tamil Nadu, India
                            </address>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max">
            <SectionHeading
              label="Contact overview"
              title="Reach out with confidence"
              description="Choose the right channel for your request, whether it is a civic issue, a partnership opportunity, or program support."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_18px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-5">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-navy mb-3">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 section-padding">
          <div className="container-max">
            <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] items-start">
              <div>
                <SectionHeading
                  label="Send a message"
                  title="Direct contact form"
                  description="Use this secure form to send a message directly to our support desk. We will route it to the right office and follow up promptly."
                />

                <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
                  <form action="#" method="post" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700">Full name</span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Your name"
                          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium text-slate-700">Email address</span>
                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Subject</span>
                      <input
                        type="text"
                        name="subject"
                        placeholder="What would you like to discuss?"
                        className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm font-medium text-slate-700">Message</span>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Share your request, feedback, or question here."
                        className="mt-3 w-full rounded-[1.75rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </label>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-orange/20 transition hover:bg-orange-600"
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                      <MapPin size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-primary font-bold">Office hours</p>
                      <p className="mt-2 text-lg font-semibold text-navy">Mon – Sat, 9AM – 6PM IST</p>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">
                    Our public desk is staffed for direct responses and guidance on regional programs, services, and civic matters.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                      <Users size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-primary font-bold">Citizen support</p>
                      <p className="mt-2 text-lg font-semibold text-navy">Community-focused help</p>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600">
                    Every enquiry is treated as a partnership opportunity for better services, with feedback fed back into our programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-max">
            <SectionHeading
              label="Why contact us"
              title="Support built on transparency"
              description="Our contact experience is designed to be premium, accessible, and focused on real citizen outcomes."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-5">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-navy mb-3">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 section-padding">
          <div className="container-max">
            <SectionHeading
              label="Location"
              title="Find us in the heart of Chennai"
              description="Our main office is centrally located and accessible by public transport, with a dedicated support desk for citizen visits."
            />

            <div className="mt-12 grid gap-8 xl:grid-cols-[1.3fr_0.7fr] items-start">
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-card">
                <iframe
                  title="Teynampet, Chennai map"
                  src="https://www.google.com/maps?q=Teynampet,+Chennai+600018&output=embed"
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-card">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-primary font-bold mb-2">Visiting address</p>
                  <p className="font-semibold text-navy text-xl">41/109, Pillayar Kovil Street</p>
                </div>

                <div className="space-y-4 text-sm text-slate-600 leading-7">
                  <p>
                    Teynampet, Chennai – 600018. Our office is located in the central city district with easy access from nearby transport and civic amenities.
                  </p>
                  <p>
                    Nearby landmark: Teynampet Bus Depot and Anna Nagar West. Our welcome desk provides direct support for visitor enquiries.
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Public transit</p>
                    <p className="font-semibold text-navy">Nearest Metro: Teynampet</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Parking</p>
                    <p className="font-semibold text-navy">Local street and civic parking available near Teynampet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>

      <Footer />
    </>
  );
}
