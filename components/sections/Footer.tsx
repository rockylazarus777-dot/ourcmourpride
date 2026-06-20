import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const quickLinks = [
  { label: "About CM", href: "/about" },
  { label: "Vision & Mission", href: "/vision" },
  { label: "Events", href: "/events" },
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
  { label: "Events", href: "/events" },
  { label: "Support the Cause", href: "/join" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=100070522891863&sk=directory_links", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "https://www.instagram.com/ourcmourpride_off?igsh=MWQ0b3kzOWpvYWNpYg==", label: "Instagram" },
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
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Our CM Our Pride"
                width={180}
                height={52}
                className="h-12 w-auto object-contain"
              />
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
                  target="_blank"
                  rel="noopener noreferrer"
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

      {/* Legal Links */}
      <div className="border-t border-white/10">
        <div className="container-max py-4">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
            {legalLinks.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="px-3 py-1 text-xs font-inter text-white/40 transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </Link>
                {i < legalLinks.length - 1 && (
                  <span className="hidden sm:inline text-white/15 text-xs select-none" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs font-inter">
            © 2024 OUR CM OUR PRIDE. All Rights Reserved.
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
