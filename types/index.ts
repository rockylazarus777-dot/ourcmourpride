export interface HeroSlide {
  id: number;
  heading: string;
  headingHighlight: string;
  tagline: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  image: string;
  bgGradient: string;
}

export interface Stat {
  id: number;
  value: string;
  numericValue: number;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export interface VisionCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export interface Initiative {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  iconBg: string;
}

export interface NavLink {
  label: string;
  href: string;
}
