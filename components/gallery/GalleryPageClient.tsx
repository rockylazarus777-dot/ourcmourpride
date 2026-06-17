"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Users,
  Calendar,
  Globe2,
  Leaf,
  Trophy,
  Lightbulb,
  Activity,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import SectionHeading from "@/components/ui/SectionHeading";

// ─── Types ────────────────────────────────────────────────────────────────────

type CategoryKey = "all" | "planting" | "sports" | "shaping" | "running";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORY_META = {
  planting: {
    label: "Planting the Future",
    description:
      "Green action, community gardens and sustainable progress for a cleaner Tamil Nadu.",
    Icon: Leaf,
    gradient: "from-emerald-500 to-green-600",
    coverImage: "/images/planting 1.png",
  },
  sports: {
    label: "Sports for All",
    description:
      "Inclusive sporting events bringing energy, unity and health to every citizen.",
    Icon: Trophy,
    gradient: "from-blue-500 to-indigo-600",
    coverImage: "/images/sport 1.png",
  },
  shaping: {
    label: "Shaping the Future",
    description:
      "Designing better lives through education, infrastructure and civic innovation.",
    Icon: Lightbulb,
    gradient: "from-violet-500 to-purple-600",
    coverImage: "/images/shaping 1.png",
  },
  running: {
    label: "Running for Change",
    description:
      "Movement and momentum for public health, solidarity and civic pride.",
    Icon: Activity,
    gradient: "from-orange-500 to-red-500",
    coverImage: "/images/running 1.png",
  },
} as const;

const FILTER_TABS: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All Photos" },
  { key: "planting", label: "Planting the Future" },
  { key: "sports", label: "Sports for All" },
  { key: "shaping", label: "Shaping the Future" },
  { key: "running", label: "Running for Change" },
];

interface GalleryItem {
  id: number;
  category: keyof typeof CATEGORY_META;
  title: string;
  src: string;
  aspect: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    category: "planting",
    title: "Urban Tree Planting Drive",
    src: "/images/planting 1.png",
    aspect: "aspect-[4/3]",
    description:
      "Community volunteers plant native saplings across Chennai to build a greener city.",
  },
  {
    id: 2,
    category: "planting",
    title: "Community Garden Initiative",
    src: "/images/planting 2.png",
    aspect: "aspect-[3/4]",
    description:
      "Creating green spaces that bring citizens together and nurture local biodiversity.",
  },
  {
    id: 3,
    category: "planting",
    title: "Green Tamil Nadu Campaign",
    src: "/images/planting 3.png",
    aspect: "aspect-[4/3]",
    description:
      "State-wide effort to plant thousands of trees in partnership with schools and civic bodies.",
  },
  {
    id: 4,
    category: "planting",
    title: "Eco Warriors in Action",
    src: "/images/planting 4.png",
    aspect: "aspect-[1/1]",
    description:
      "Young eco-warriors champion environmental stewardship and climate action.",
  },
  {
    id: 5,
    category: "sports",
    title: "Neighbourhood Football Festival",
    src: "/images/sport 1.png",
    aspect: "aspect-[4/3]",
    description:
      "Young athletes celebrate fitness, teamwork, and the unifying spirit of community sport.",
  },
  {
    id: 6,
    category: "sports",
    title: "Youth Athletics Championship",
    src: "/images/sport 2.png",
    aspect: "aspect-[3/4]",
    description:
      "Talented young athletes compete and discover their potential on the district stage.",
  },
  {
    id: 7,
    category: "sports",
    title: "Sports Unity Games",
    src: "/images/sport 3.png",
    aspect: "aspect-[16/9]",
    description:
      "Bringing together people from all walks of life through the universal language of sport.",
  },
  {
    id: 8,
    category: "sports",
    title: "Community Sports Day",
    src: "/images/sport 4.png",
    aspect: "aspect-[4/3]",
    description:
      "A day of inclusive activities celebrating health and civic participation for all ages.",
  },
  {
    id: 9,
    category: "sports",
    title: "Visionary Sports Carnival",
    src: "/images/sport 5.png",
    aspect: "aspect-[1/1]",
    description:
      "A joyful celebration of sport, youth, and collective wellbeing across the community.",
  },
  {
    id: 10,
    category: "shaping",
    title: "Youth Leadership Summit",
    src: "/images/shaping 1.png",
    aspect: "aspect-[4/3]",
    description:
      "Empowering Tamil Nadu's next generation of leaders to build a stronger future.",
  },
  {
    id: 11,
    category: "shaping",
    title: "Education for All Initiative",
    src: "/images/shaping 2.png",
    aspect: "aspect-[3/4]",
    description:
      "Building stronger communities through accessible, inclusive education for every child.",
  },
  {
    id: 12,
    category: "shaping",
    title: "Civic Innovation Forum",
    src: "/images/shaping 3.png",
    aspect: "aspect-[4/3]",
    description:
      "Citizens and leaders co-designing a more modern, responsive and compassionate Tamil Nadu.",
  },
  {
    id: 13,
    category: "running",
    title: "City Run for Change",
    src: "/images/running 1.png",
    aspect: "aspect-[16/9]",
    description:
      "A powerful mass run that raises awareness and unites thousands of citizens in one stride.",
  },
  {
    id: 14,
    category: "running",
    title: "Marathon for Public Health",
    src: "/images/running 2.png",
    aspect: "aspect-[4/3]",
    description:
      "Promoting public health through mass participation running across the state capital.",
  },
  {
    id: 15,
    category: "running",
    title: "Civic Pride Run",
    src: "/images/running 3.png",
    aspect: "aspect-[3/4]",
    description:
      "Running together for solidarity, community health, and a brighter Tamil Nadu.",
  },
];

const FEATURED_MOMENTS = [
  {
    category: "planting" as const,
    src: "/images/planting 2.png",
    title: "Creating a Greener Tomorrow",
    description:
      "Through mass tree-planting drives and community gardens, we are building an environmentally conscious Tamil Nadu where every citizen plays a role in sustainable change. Our green initiatives have already transformed hundreds of urban spaces.",
  },
  {
    category: "sports" as const,
    src: "/images/sport 3.png",
    title: "Building Stronger Communities Through Sport",
    description:
      "Sport is the universal language that breaks barriers and builds bonds. Our sporting events foster teamwork, inclusivity, and a healthy lifestyle across every district, uniting citizens through the power of play and shared ambition.",
  },
  {
    category: "shaping" as const,
    src: "/images/shaping 2.png",
    title: "Empowering Citizens for the Future",
    description:
      "Through education forums, leadership summits, and civic dialogues, we equip every Tamil Nadu citizen with knowledge and tools to shape their own destiny and contribute to a stronger, more prosperous collective future.",
  },
  {
    category: "running" as const,
    src: "/images/running 2.png",
    title: "Running Together for Positive Change",
    description:
      "Every step forward in our community runs represents our collective commitment to health, solidarity, and the unstoppable spirit of Tamil Nadu. Thousands have run together to demonstrate civic pride and a shared vision.",
  },
] as const;

const STATS = [
  { label: "Photos Captured", value: 500, suffix: "+", Icon: Camera },
  { label: "Events Conducted", value: 20, suffix: "+", Icon: Calendar },
  { label: "Volunteers Engaged", value: 5000, suffix: "+", Icon: Users },
  { label: "Communities Reached", value: 50, suffix: "+", Icon: Globe2 },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function CounterNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        let startTime: number | null = null;
        const duration = 2200;

        const tick = (ts: number) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(target);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Close lightbox when category changes (indices become stale)
  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  const openLightbox = useCallback(
    (id: number) => {
      const idx = filteredItems.findIndex((item) => item.id === id);
      if (idx !== -1) setLightboxIndex(idx);
    },
    [filteredItems]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-white">

        {/* ══════════════════════════════════════════
            CATEGORY SHOWCASE
        ══════════════════════════════════════════ */}
        <section className="section-padding pt-28 md:pt-32 lg:pt-36">
          <div className="container-max">
            <SectionHeading
              label="Event categories"
              title="Four pillars of civic action"
              description="Each category captures a unique dimension of our movement — from greening Tamil Nadu to empowering its people through sport, education, and collective momentum."
              align="center"
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {(["planting", "sports", "shaping", "running"] as const).map((cat, i) => {
                const { label, description, Icon, gradient, coverImage } = CATEGORY_META[cat];
                return (
                  <motion.button
                    key={cat}
                    type="button"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    onClick={() => setActiveCategory(cat)}
                    className="group relative overflow-hidden rounded-[2rem] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={coverImage}
                        alt={label}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Colour overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-50 group-hover:opacity-65 transition-opacity duration-400`}
                      />
                      {/* Dark bottom overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon size={18} className="text-white" />
                      </div>
                      <h3 className="font-poppins font-bold text-lg text-white leading-snug mb-2">
                        {label}
                      </h3>
                      <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{description}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white/90">
                        View photos <ChevronRight size={13} />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FILTER + MASONRY GALLERY
        ══════════════════════════════════════════ */}
        <section id="gallery-section" className="bg-slate-50 section-padding">
          <div className="container-max">
            {/* Header + Filters */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary font-bold mb-3">
                  Interactive filters
                </p>
                <h2 className="font-poppins font-black text-3xl lg:text-4xl text-navy leading-tight">
                  Discover every event story.
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    className={`rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeCategory === tab.key
                        ? "bg-primary text-white shadow-lg shadow-orange-500/20"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-orange-50 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.35) }}
                    className="mb-6 break-inside-avoid"
                  >
                    <button
                      type="button"
                      onClick={() => openLightbox(item.id)}
                      className="group block w-full text-left overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-shadow duration-300 hover:shadow-card-hover"
                    >
                      {/* Image */}
                      <div className={`relative ${item.aspect} overflow-hidden bg-slate-100`}>
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                        {/* Category badge */}
                        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.28em] text-primary shadow-sm">
                          {CATEGORY_META[item.category].label}
                        </span>
                        {/* Hover icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="rounded-full bg-white/95 p-3 shadow-lg">
                            <Camera size={18} className="text-navy" />
                          </div>
                        </div>
                      </div>
                      {/* Caption */}
                      <div className="p-5">
                        <h3 className="font-poppins font-semibold text-sm text-navy mb-1.5 group-hover:text-primary transition-colors duration-200 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs leading-6 text-slate-500">{item.description}</p>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURED MOMENTS
        ══════════════════════════════════════════ */}
        <section className="section-padding">
          <div className="container-max">
            <SectionHeading
              label="Featured moments"
              title="Stories that define our movement"
              description="Handpicked highlights from each initiative — moments that capture the spirit, scale, and impact of our collective civic journey."
            />

            <div className="mt-16 space-y-24">
              {FEATURED_MOMENTS.map((moment, i) => {
                const { label, Icon, gradient } = CATEGORY_META[moment.category];
                const imageFirst = i % 2 === 0;

                return (
                  <motion.div
                    key={moment.category}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="grid gap-12 lg:grid-cols-2 items-center"
                  >
                    {/* Image */}
                    <div className={imageFirst ? "" : "lg:order-last"}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_28px_70px_rgba(15,23,42,0.16)]">
                        <Image
                          src={moment.src}
                          alt={moment.title}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <span
                          className={`absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg`}
                        >
                          <Icon size={12} />
                          {label}
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div>
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                        <Icon size={22} />
                      </div>
                      <h3 className="font-poppins font-black text-2xl md:text-3xl lg:text-4xl text-navy leading-tight mb-5">
                        {moment.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-8 mb-8">
                        {moment.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(moment.category)}
                        className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/35"
                      >
                        View all {label} photos
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATISTICS
        ══════════════════════════════════════════ */}
        <section className="bg-navy section-padding">
          <div className="container-max">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-white/70 mb-5">
                By the numbers
              </span>
              <h2 className="font-poppins font-black text-3xl md:text-4xl text-white leading-tight">
                Our gallery in{" "}
                <span className="text-primary">numbers</span>
              </h2>
              <p className="mt-4 text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
                Every photo tells a story. Every number represents a citizen, a moment, a step
                forward for Tamil Nadu.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {STATS.map(({ label, value, suffix, Icon }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
                >
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary mb-5">
                    <Icon size={24} />
                  </div>
                  <div className="font-poppins font-black text-4xl lg:text-5xl text-primary mb-2">
                    <CounterNumber target={value} suffix={suffix} />
                  </div>
                  <p className="text-xs text-white/55 font-semibold uppercase tracking-[0.28em]">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ══════════════════════════════════════════
          LIGHTBOX
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {currentItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/96 px-4 py-8"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 50) {
                dx < 0 ? goNext() : goPrev();
              }
              touchStartX.current = null;
            }}
          >
            <motion.div
              key={currentItem.id}
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-1">
                    {CATEGORY_META[currentItem.category].label}
                  </p>
                  <p className="text-sm text-white/45">
                    Image {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-slate-900/80">
                <Image
                  src={currentItem.src}
                  alt={currentItem.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              {/* Caption + Nav */}
              <div className="mt-4 px-1 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-poppins font-bold text-lg text-white leading-snug">
                    {currentItem.title}
                  </h3>
                  <p className="text-sm text-white/45 mt-1 leading-6">
                    {currentItem.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
