import type { Metadata } from "next";
import { Poppins, Inter, Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OUR CM OUR PRIDE | Strong Leadership. Brighter Future.",
  description:
    "A visionary leader dedicated to the people, progress and prosperity of our state. Join the movement for a stronger and better tomorrow.",
  keywords: [
    "Chief Minister",
    "Government",
    "Leadership",
    "People First",
    "Progress",
    "Development",
    "Welfare",
    "Vision",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "OUR CM OUR PRIDE | Strong Leadership. Brighter Future.",
    description:
      "A visionary leader dedicated to the people, progress and prosperity of our state.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/icon-1024x1024.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OUR CM OUR PRIDE",
    description: "Strong Leadership. Brighter Future.",
    images: ["/images/icon-1024x1024.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} ${poppins.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
