"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function AboutCM() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 mt-12 md:mt-14 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

        {/* Left: leadership profile */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.35 }}
              className="group overflow-hidden rounded-[24px] bg-white shadow-card border border-slate-100 w-full flex flex-col h-full"
            style={{ alignSelf: "start" }}
          >
              <div className="relative flex-1 min-h-0 overflow-hidden">
              <Image
                src="/images/cm5.png"
                alt="Chief Minister C. Joseph Vijay portrait"
                fill
                className="object-cover object-[center_25%] transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 420px"
              />
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[20px] border-l-4 border-primary bg-white p-7 shadow-sm flex-[0.95] flex flex-col justify-center w-full"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <Quote size={26} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.30em] text-primary/90">
                  Leadership Message
                </p>
              </div>
            </div>
            <p className="mt-6 text-base leading-8 text-slate-700 font-inter">
              "Together, we can build a stronger, more inclusive, and prosperous Tamil Nadu where every citizen has the
              opportunity to thrive."
            </p>
            <p className="mt-6 text-sm font-semibold text-navy">— Chief Minister C. Joseph Vijay</p>
          </motion.article>
        </div>

        {/* Right: content */}
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="h-full">
            <p className="text-xs md:text-sm font-bold font-poppins tracking-widest text-navy/70 uppercase mb-2">
              ABOUT CM
            </p>
            <p className="text-sm text-navy/60 font-medium mb-4">Leadership • Governance • Progress</p>

            <h1 className="font-poppins font-black text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-navy leading-snug mb-4 max-w-2xl">
              ABOUT CM – OUR CHIEF MINISTER C. JOSEPH VIJAY
            </h1>

            <p className="font-poppins text-base md:text-lg text-primary font-semibold leading-relaxed mb-6 max-w-prose">
              Leadership with Vision, Governance with Compassion, Progress for Every Citizen.
            </p>

            <div className="prose prose-slate max-w-none text-navy/90 space-y-6">
              <p>
                Our Chief Minister C. Joseph Vijay is a people-centric initiative dedicated to celebrating visionary leadership,
                inclusive governance, and the collective aspirations of the people of Tamil Nadu. The platform serves as a bridge
                between citizens, communities, and public policy, highlighting developmental efforts, social welfare initiatives,
                youth empowerment, environmental sustainability, and economic growth across the state.
              </p>

              <p>
                Inspired by the leadership of Chief Minister C. Joseph Vijay, this movement promotes active citizen participation,
                transparency, innovation, and social responsibility. We believe that the progress of Tamil Nadu is built upon the
                partnership between the government and its people, creating opportunities for every individual to contribute to the
                state's growth and prosperity.
              </p>

              <p>
                Our mission is to showcase success stories, encourage civic engagement, support community-driven development, and
                strengthen the vision of a Clean, Green, Healthy, Wealthy, and Safe Tamil Nadu. Through awareness campaigns, public
                outreach programs, policy dialogues, social initiatives, and community collaborations, we strive to transform
                aspirations into meaningful action.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
