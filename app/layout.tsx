import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    title: "OUR CM OUR PRIDE | Strong Leadership. Brighter Future.",
    description:
      "A visionary leader dedicated to the people, progress and prosperity of our state.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "OUR CM OUR PRIDE",
    description: "Strong Leadership. Brighter Future.",
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
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-white text-navy">
        {children}
      </body>
    </html>
  );
}
