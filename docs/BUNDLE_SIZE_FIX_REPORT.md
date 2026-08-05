# Vercel Serverless Function Bundle Size — Root Cause & Fix

**Reported issue:** Vercel build failed — server function bundle 259.17 MB, exceeding the 250 MB limit.

## 1. Root cause

`app/gallery/page.tsx` and `app/gallery/[slug]/page.tsx` both called:

```ts
fs.readdirSync(path.join(process.cwd(), "public", folder))
```

where `folder` was a variable (one of four event slugs), not a string literal.

Vercel builds Next.js serverless functions using `@vercel/nft` to statically trace which files each route actually needs at runtime. When it encounters an `fs` read with a **dynamic/non-literal path argument**, it cannot determine exactly which file(s) will be read — so it conservatively includes the **entire directory being scanned** in the function's file trace, on the assumption that any file in it might be needed.

Because the scanned directory was `public/<folder>`, this pulled the whole `public/` asset tree into the serverless function bundle instead of leaving it as ordinary CDN-served static assets.

### Evidence

| Path | Size |
|---|---|
| `public/` (total) | **257 MB** |
| `public/gallery/` | 226 MB |
| `public/gallery/our-cm-our-pride-launch/` | 220 MB (26 uncompressed DSLR JPEGs, ~8.5 MB avg, largest 12 MB) |
| `public/gallery/` (other 3 events combined) | ~5 MB |
| `public/images/` | 31 MB |

**257 MB (public/) ≈ 259.17 MB (reported function size)** — a near-exact match, confirming the entire `public` directory was being swept into the function bundle via the dynamic `fs.readdirSync` call.

No other cause contributed meaningfully:
- No `app/api` routes exist.
- No large JSON files in the repo (largest is `package-lock.json` at 252 KB).
- No oversized files inside `app/`, `components/`, or `lib/`.
- Only three files in the whole codebase imported `fs`/`path`: the two gallery pages above, and `next.config.ts` (build-config only, not part of any function bundle).

## 2. Fix applied

**Removed all `fs`/`path` usage from both gallery pages.** The four events' filenames are now hardcoded as static string arrays directly in `app/gallery/page.tsx` and `app/gallery/[slug]/page.tsx` (kept in sync between the two files). This is safe because the event folders are fixed content — they don't change without a code change to add a new event anyway.

With no `fs` reads left anywhere in server-rendered code, there is nothing for Vercel's tracer to conservatively bundle. The photos remain exactly where they were (`public/gallery/**`), served as ordinary static assets by the CDN — never touched by the function bundle. **Zero change to UI, image URLs, photo counts, or page behavior.**

### Defense in depth — `next.config.ts`

Even with the `fs` calls gone, added explicit tracing excludes so this class of bug can't silently regress:

```ts
outputFileTracingExcludes: {
  "/**": ["public/gallery/**", "public/images/**"],
},
experimental: {
  optimizePackageImports: ["lucide-react", "framer-motion"],
},
```

### Dependency cleanup — `package.json`

Removed 3 unused direct dependencies (confirmed zero imports anywhere in `app/`, `components/`, `lib/`):
- `@radix-ui/react-dialog`
- `@radix-ui/react-slot`
- `class-variance-authority`

Running `npm install` after removal dropped 25 transitive packages from `node_modules`.

### `vercel.json`

Added per request, to set `VERCEL_ANALYZE_BUILD_OUTPUT=1` as a build-time env var:

```json
{
  "build": { "env": { "VERCEL_ANALYZE_BUILD_OUTPUT": "1" } }
}
```

Note: this isn't a Next.js/Vercel flag I could find official documentation for — it's set as literally requested and is harmless if unused. For genuine bundle inspection, `@next/bundle-analyzer` (client bundle) or Vercel's own "Build Output" / Function size panel in the deployment dashboard are the supported tools.

## 3. Verification

Ran a production build (`VERCEL=1 next build`) and inspected the actual trace files Next.js generates per route:

- `.next/server/app/gallery/page.js.nft.json` and `.next/server/app/gallery/[slug]/page.js.nft.json` — **zero** references to `public/gallery` or `public/images`.
- Combined unique files traced across both gallery routes: **76 files, 1.87 MB total** (down from ~226 MB+).
- Full `.next/server` output: **3.6 MB**.
- All 4 event pages now prerender as static HTML (`generateStaticParams`), so at runtime Vercel serves them from the CDN with no function invocation needed at all for typical requests.
- Ran `next start` against the production build and hit every route (`/`, `/about`, `/team`, `/events`, `/contact`, `/vision`, `/gallery`, and all 4 `/gallery/[slug]` pages): all return `200`.
- Photo counts on `/gallery` render identically to before the fix: 7 / 7 / 8 / 26.
- `tsc --noEmit`: clean.

## 4. Files changed

| File | Change |
|---|---|
| `app/gallery/page.tsx` | Removed `fs`/`path`; hardcoded event photo manifests |
| `app/gallery/[slug]/page.tsx` | Removed `fs`/`path`; hardcoded event photo manifests |
| `next.config.ts` | Added `outputFileTracingExcludes`, `optimizePackageImports` |
| `package.json` | Removed 3 unused dependencies |
| `vercel.json` | New — sets `VERCEL_ANALYZE_BUILD_OUTPUT=1` at build time |

No changes were made to design, layout, colors, animations, or functionality of any page.
