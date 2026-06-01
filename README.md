# OUR CM OUR PRIDE — Political Campaign Website

> Phase 1: Landing Page (Complete)

Production-ready Next.js 15 political campaign website, pixel-accurate to the provided reference design.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Poppins + Inter (Google Fonts) |
| Backend (Phase 2) | Supabase |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## Project Structure

```
my-cm-my-pride/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, SEO)
│   ├── page.tsx            # Home page composition
│   └── globals.css         # Global styles + Tailwind directives
├── components/
│   ├── layout/
│   │   └── Navbar.tsx      # Sticky transparent→solid navbar + mobile menu
│   ├── sections/
│   │   ├── Hero.tsx        # Auto-sliding carousel with swipe support
│   │   ├── StatsBar.tsx    # Dark navy stats with animated counters
│   │   ├── VisionSection.tsx   # Vision + feature cards
│   │   ├── InitiativesSection.tsx  # Horizontal initiative slider
│   │   ├── CTASection.tsx  # Orange CTA + email capture form
│   │   └── Footer.tsx      # Multi-column footer
│   └── ui/
│       └── SectionHeading.tsx  # Reusable section heading component
├── lib/
│   └── utils.ts            # cn() + helper utilities
├── types/
│   └── index.ts            # Shared TypeScript interfaces
├── public/                 # Static assets
├── tailwind.config.ts      # Custom design tokens
└── next.config.ts          # Next.js + image domains config
```

---

## Design Tokens

```
Primary Orange:  #F97316
Dark Navy:       #071B2A
Background:      #F8F8F8
Fonts:           Poppins (headings) | Inter (body)
```

---

## Replacing Placeholder CM Photo

In `components/sections/Hero.tsx`, find the image composition block and replace the SVG silhouette with:

```tsx
<Image
  src="/images/cm-photo.png"   // Add your actual photo to /public/images/
  alt="Chief Minister"
  fill
  className="object-cover object-top"
  priority
/>
```

---

## Phase 2 Roadmap (Supabase Integration)

### Supabase Tables to Create

```sql
-- Subscribers (CTA email capture)
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now(),
  source text default 'cta_form'
);

-- Hero Slides (CMS)
create table hero_slides (
  id serial primary key,
  heading text not null,
  heading_highlight text not null,
  tagline text,
  description text,
  cta_primary_label text,
  cta_primary_href text,
  cta_secondary_label text,
  cta_secondary_href text,
  image_url text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Initiatives
create table initiatives (
  id serial primary key,
  title text not null,
  description text,
  image_url text,
  icon text,
  icon_bg text,
  is_active boolean default true,
  sort_order int default 0
);

-- News Articles
create table news (
  id serial primary key,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  image_url text,
  published_at timestamptz,
  is_published boolean default false
);

-- Volunteers (Join Movement form)
create table volunteers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  area text,
  created_at timestamptz default now()
);
```

### Environment Variables (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Pages Roadmap (Phase 2)

- `/about` — About CM page
- `/vision` — Full vision & mission
- `/initiatives` — All initiatives grid
- `/gallery` — Media gallery
- `/news` — News & updates
- `/news/[slug]` — Article detail
- `/contact` — Contact form
- `/join` — Join movement form
- `/admin` — Admin dashboard (protected)
- `/admin/login` — Admin login

---

## Accessibility

- Semantic HTML5 landmarks
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus-visible styles
- Alt text on all images
- Reduced-motion respect (`prefers-reduced-motion`)

---

## Performance

- Next.js Image optimization (`<Image />` with lazy loading)
- Google Fonts with `display: swap`
- Framer Motion lazy imports
- `useInView` for scroll-triggered animations (no wasted renders)
- `IntersectionObserver` for stats counter trigger
- Passive scroll listeners

---

Built with love for the people.
