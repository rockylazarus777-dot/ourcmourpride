import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F97316",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
        navy: {
          DEFAULT: "#071B2A",
          50: "#0C2D47",
          100: "#071B2A",
          200: "#051422",
          light: "#0D2B40",
        },
        background: "#F8F8F8",
        maroon: {
          DEFAULT: "#7A1F2B",
          50: "#FBEDEE",
          100: "#F0D0D3",
          200: "#DE9DA3",
          300: "#C96A74",
          400: "#A83B48",
          500: "#7A1F2B",
          600: "#651A24",
          700: "#4F141C",
          800: "#3A0F15",
          900: "#25090D",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FBF6E7",
          100: "#F5E9C2",
          200: "#EBD588",
          300: "#E0C158",
          400: "#D4AF37",
          500: "#B8952A",
          600: "#93761E",
          700: "#6E5817",
          800: "#4A3A0F",
          900: "#271F08",
        },
      },
      fontFamily: {
        raleway: ["var(--font-raleway)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 30%, #FFD180 60%, #FFAB40 100%)",
        "cta-gradient":
          "linear-gradient(135deg, #F97316 0%, #EA580C 40%, #C2410C 100%)",
        "navy-gradient":
          "linear-gradient(135deg, #071B2A 0%, #0D2B40 100%)",
        "marathon-gradient":
          "linear-gradient(135deg, #7A1F2B 0%, #A83B48 35%, #F97316 75%, #D4AF37 100%)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.15)",
        orange: "0 4px 20px rgba(249, 115, 22, 0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-left": "slideLeft 0.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
