# Our CM Our Pride — Setup Guide

## Prerequisites

| Tool | Minimum version |
|------|-----------------|
| Node.js | 18.17 |
| npm | 9 |

---

## 1. Install dependencies

```bash
cd my-cm-my-pride
npm install
```

---

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in the six required values:

| Variable | Exposed to browser | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your deployment URL |
| `NEXT_PUBLIC_APP_NAME` | Yes | Your site display name |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Dashboard → Project Settings → API → anon / public |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** | Supabase Dashboard → Project Settings → API → service_role |
| `ADMIN_EMAIL` | No | Inbox for new-registration alerts |

> **Security:** `SUPABASE_SERVICE_ROLE_KEY` bypasses all Row Level Security. Never import the admin client in any `'use client'` component. It is only used inside API Route Handlers.

---

## 3. Set up Supabase

### 3a. Create a project

1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Choose a region close to Tamil Nadu (e.g. `ap-southeast-1` Singapore).
3. Copy the **Project URL**, **anon key**, and **service_role key** into `.env.local`.

### 3b. Run the database migration

In the Supabase Dashboard, open **SQL Editor** and run the contents of:

```
supabase/migrations/20260601000000_marathon_registrations.sql
```

This creates:
- The `age_category` and `registration_prefix` enums
- The `marathon_registrations` table with all columns
- Column-level constraints (phone format, guardian logic, pledge check)
- Indexes on `email`, `phone`, `created_at`, and `age_category`
- Row Level Security (public can INSERT; only `service_role` can SELECT)

### 3c. Set up the storage bucket

In the Supabase Dashboard, open **SQL Editor** and run the contents of:

```
supabase/storage-setup.sql
```

This creates:
- A **private** bucket named `marathon-registrations`
- 5 MB file size limit
- Allowed MIME types: `image/jpeg`, `image/png`, `image/webp`
- Storage RLS policies (only `service_role` can read, write, or delete)

**Photo storage path convention:**
```
marathon-registrations/photos/{registrationId}.{ext}
```

Example: `marathon-registrations/photos/MPM-LH3K2A-XY4Z.jpg`

The `photo_url` column stores this **storage path**, not a full URL.
To serve a photo, generate a signed URL server-side:

```ts
const { data } = await supabaseAdmin.storage
  .from("marathon-registrations")
  .createSignedUrl(row.photo_url, 3600); // valid for 1 hour
```

---

## 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000/events](http://localhost:3000/events) in your browser.

---

## 5. Build for production

```bash
npm run build
npm start
```

---

## 6. Project structure

```
app/
  page.tsx                    Homepage
  events/
    page.tsx                  Events page (server component + SEO metadata)
    EventsPageClient.tsx      Client shell — owns wizard open/close state

components/
  events/
    EventsHero.tsx            Full-screen pink gradient hero
    AboutMarathon.tsx         About / Focus Areas / Vision / Message
    EventCard.tsx             Featured event card
    RegistrationWizard.tsx    Multi-step registration modal (state management)
    SuccessScreen.tsx         Post-submission success screen
    steps/
      AgeStep.tsx             Step 1 — age category selection
      PledgeStep.tsx          Step 2 — pledge acceptance
      DetailsStep.tsx         Step 3 — personal details form
  layout/
    Navbar.tsx
  sections/
    Hero.tsx, StatsBar.tsx, VisionSection.tsx,
    InitiativesSection.tsx, CTASection.tsx, Footer.tsx

lib/
  supabase/
    client.ts                 Browser client  → use in 'use client' components
    server.ts                 Server client   → use in Server Components / Route Handlers
    admin.ts                  Admin client    → use ONLY in API Route Handlers
  utils.ts

types/
  supabase.ts                 Database type definitions (mirrors Supabase generated output)
  events.ts                   Form / UI types + re-exports from supabase.ts
  index.ts                    Application-level types

supabase/
  migrations/
    20260601000000_marathon_registrations.sql
  storage-setup.sql

docs/
  SETUP.md                    This file

.env.local.example            Environment variable template
```

---

## 7. Implementing the registration API (next step)

When you are ready to persist registrations, create:

```
app/api/events/register/route.ts
```

The `RegistrationWizard` already has the typed `MarathonRegistrationInsert` payload ready and a `TODO` comment where the `fetch` call goes. The recommended handler pattern:

```ts
// app/api/events/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { MarathonRegistrationInsert } from "@/types/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 1. Re-validate on the server (never trust client-only validation)

  // 2. Upload photo to storage if present (multipart or presigned URL flow)

  // 3. Insert registration
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("marathon_registrations")
    .insert(body as MarathonRegistrationInsert)
    .select("registration_id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 4. Send confirmation emails (when SMTP is configured)

  return NextResponse.json({ registrationId: data.registration_id }, { status: 201 });
}
```

---

## 8. Regenerating Supabase types

After any schema changes, regenerate `types/supabase.ts`:

```bash
npx supabase gen types typescript \
  --project-id <YOUR_PROJECT_ID> \
  --schema public \
  > types/supabase.ts
```

The rest of the codebase (`types/events.ts`, the three Supabase clients) imports from `types/supabase.ts` and will automatically reflect the new schema.

---

## 9. Type checking

```bash
npx tsc --noEmit
```
