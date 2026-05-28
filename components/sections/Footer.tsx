import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";

const quickLinks = [
  { label: "About CM", href: "/about" },
  { label: "Vision & Mission", href: "/vision" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Gallery", href: "/gallery" },
  { label: "News & Updates", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

const importantLinks = [
  { label: "Government Portal", href: "#" },
  { label: "Press Releases", href: "#" },
  { label: "Speeches", href: "#" },
  { label: "Downloads", href: "#" },
  { label: "Public Grievance", href: "#" },
];

const getInvolvedLinks = [
  { label: "Volunteer", href: "/join" },
  { label: "Share Your Ideas", href: "/contact" },
  { label: "Events", href: "#" },
  { label: "Support the Cause", href: "/join" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="container-max py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-orange">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                  <path d="M20 4C20 4 14 10 14 18C14 22.4 16.8 26 20 26C23.2 26 26 22.4 26 18C26 10 20 4 20 4Z" fill="white"/>
                  <path d="M20 18C20 18 16 21 16 25C16 27.2 17.8 29 20 29C22.2 29 24 27.2 24 25C24 21 20 18 20 18Z" fill="white" opacity="0.7"/>
                  <path d="M12 32L20 28L28 32" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 36L20 30L32 36" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-poppins font-black text-base text-white leading-tight">MY CM</p>
                <p className="font-poppins font-black text-base text-primary leading-tight">MY PRIDE</p>
              </div>
            </Link>

            {/* Tagline */}
            <div className="space-y-1.5">
              <p className="text-white/70 text-sm font-inter leading-relaxed">
                A vision of progress. A promise of prosperity.
              </p>
              <p className="text-white/70 text-sm font-inter">
                A commitment to every citizen.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-primary hover:bg-primary flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm tracking-wider text-white/90 uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary text-sm font-inter transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm tracking-wider text-white/90 uppercase mb-5">
              Important Links
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary text-sm font-inter transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved + Stay Connected */}
          <div className="space-y-8">
            <div>
              <h4 className="font-poppins font-bold text-sm tracking-wider text-white/90 uppercase mb-5">
                Get Involved
              </h4>
              <ul className="space-y-3">
                {getInvolvedLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-primary text-sm font-inter transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-poppins font-bold text-sm tracking-wider text-white/90 uppercase mb-3">
                Stay Connected
              </h4>
              <p className="text-white/60 text-sm font-inter">
                Follow us on social media for the latest updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-inter">
            © 2024 My CM My Pride. All Rights Reserved.
          </p>
          <p className="text-white/50 text-xs font-inter flex items-center gap-1">
            Designed with{" "}
            <Heart size={11} className="text-primary fill-primary" />
            {" "}for our people
          </p>
        </div>
      </div>
    </footer>
  );
}
