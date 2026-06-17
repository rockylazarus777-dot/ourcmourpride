"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT CM", href: "/about" },
  { label: "VISION", href: "/vision" },
  { label: "EVENTS", href: "/events" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NEWS", href: "/news" },
  { label: "CONTACT", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // keep active link in sync with current route
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname) return;

    if (pathname === "/") {
      setActiveLink("/");
      return;
    }

    const match = navLinks.find((l) => l.href !== "/" && pathname.startsWith(l.href));
    if (match) setActiveLink(match.href);
    else setActiveLink("");
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-white/90 backdrop-blur-sm"
        )}
      >
        <div className="container-max">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-orange">
                  {/* Flame / Star icon */}
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                    <path
                      d="M20 4C20 4 14 10 14 18C14 22.4 16.8 26 20 26C23.2 26 26 22.4 26 18C26 10 20 4 20 4Z"
                      fill="white"
                    />
                    <path
                      d="M20 18C20 18 16 21 16 25C16 27.2 17.8 29 20 29C22.2 29 24 27.2 24 25C24 21 20 18 20 18Z"
                      fill="white"
                      opacity="0.7"
                    />
                    <path
                      d="M12 32L20 28L28 32"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 36L20 30L32 36"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="leading-tight">
                <p className="font-poppins font-bold text-sm md:text-base text-navy leading-none">
                  OUR CM
                </p>
                <p className="font-poppins font-bold text-sm md:text-base text-primary leading-none">
                  OUR PRIDE
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={cn(
                      "relative px-3 py-2 text-xs font-semibold tracking-wider font-poppins transition-colors duration-200",
                      activeLink === link.href
                        ? "text-primary"
                        : "text-navy hover:text-primary"
                    )}
                  >
                    {link.label}
                    {activeLink === link.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right: Social + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social Icons */}
              <div className="flex items-center gap-1.5">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-navy hover:text-primary hover:bg-orange-50 transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href="/join"
                className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white text-xs font-bold font-poppins tracking-wider px-4 py-2.5 rounded-md shadow-orange hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                <Users size={14} />
                JOIN THE MOVEMENT
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md text-navy hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">MC</span>
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-sm text-navy leading-none">OUR CM</p>
                    <p className="font-poppins font-bold text-sm text-primary leading-none">OUR PRIDE</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors text-navy"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.href);
                          setIsMobileOpen(false);
                        }}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg text-sm font-semibold font-poppins tracking-wider transition-all duration-200",
                          activeLink === link.href
                            ? "bg-orange-50 text-primary"
                            : "text-navy hover:bg-gray-50 hover:text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Social + CTA */}
              <div className="p-5 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-navy hover:text-primary hover:border-primary transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
                <Link
                  href="/join"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white text-sm font-bold font-poppins tracking-wider px-4 py-3 rounded-lg w-full transition-all duration-200 active:scale-95"
                >
                  <Users size={15} />
                  JOIN THE MOVEMENT
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
