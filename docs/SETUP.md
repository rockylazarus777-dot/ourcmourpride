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

---

## 10. Our CM Our Pride – Mega Marathon 2026

A second, fully independent registration system lives alongside the setup above: a paid,
Razorpay-backed marathon with email OTP, QR entry passes, PDF certificates, and an admin
dashboard. It does not touch the `marathon_registrations` table or `RegistrationWizard`
described earlier in this document — that table is left as-is.

### 10a. Extra environment variables

`.env.local.example` at the repo root has the full list. Beyond the six variables above, fill in:

| Variable | Where to find it |
|---|---|
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay Dashboard → Settings → API Keys |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Same as `RAZORPAY_KEY_ID` — exposed to the browser, used by Razorpay Checkout.js to open the payment modal (never the secret) |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay Dashboard → Settings → Webhooks (set the webhook URL to `<site>/api/razorpay/webhook`, subscribed to `payment.captured`, `payment.failed`, `order.paid`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | Your SMTP provider (OTP + confirmation + certificate emails) |
| `ADMIN_PASSWORD` | Shared password for `/admin/**` |
| `ADMIN_SESSION_SECRET` | Random secret for signing admin/session tokens — generate with `openssl rand -hex 32` |

### 10b. Database

Run, in order, in the Supabase SQL Editor:

```
supabase/migrations/20260807000000_marathon2026_registrations.sql
supabase/storage-setup-marathon2026.sql
```

This creates the `registrations` and `otp_verifications` tables, the `next_registration_id()` /
`next_certificate_id()` sequence functions, and the public `marathon-2026-assets` storage bucket.

### 10b-1. Unused columns from a retired Payment Link experiment

Two earlier migrations —
`supabase/migrations/20260818000000_marathon2026_payment_links.sql` (adds nullable
`razorpay_payment_link_id`, `razorpay_payment_link_reference_id`, `razorpay_payment_link_url` to
`registrations`) and `supabase/migrations/20260819000000_marathon2026_unmatched_payments.sql`
(adds the `unmatched_payments` table) — supported a Razorpay Payment Link-based payment flow that
has since been retired in favor of the Orders API + Checkout flow in 10g below. Both migrations
have already been applied to the database, so neither is removed here; no application code reads
or writes them anymore. If you want them fully gone, that requires a separate, explicit cleanup
migration (`DROP TABLE`/`DROP COLUMN`) — not included, since dropping already-applied schema
should be a deliberate decision, not a side effect of a docs update.

### 10c. Optional certificate template

If you have a certificate template image, place it at `public/certificates/template.png`.
`lib/marathon/certificate.ts` will draw the participant name, certificate ID, and QR code on top
of it. Without it, a clean orange/maroon/gold design is generated automatically.

### 10d. Routes

Public flow: `/events/marathon/register` → `pledge` → `verify-email` → `details` → `payment` →
`success` → `pass/[registrationId]` or `certificate/[certificateId]`. Certificate authenticity:
`/verify/[certificateId]`. Admin: `/admin/login`, `/admin` (dashboard), `/admin/checkin` (QR
scanner).

### 10e. Optional participant photo (Google Drive)

On the Details step, a participant may optionally attach a passport-size photo. It is uploaded
server-side to Google Drive — never stored in Supabase — and only the resulting Drive file id /
link is saved on the `registrations` row (`photo_drive_file_id`, `photo_drive_url`).

**Why OAuth2, not a service account:** a plain Google service account has 0 bytes of Drive
storage quota and cannot own files in a personal ("My Drive") folder — only in a Google Workspace
Shared Drive. Since this uploads into a normal Google account's Drive, it authenticates as that
account via an OAuth2 refresh token instead.

**One-time setup:**

1. In [Google Cloud Console](https://console.cloud.google.com/), create (or reuse) a project and
   enable the **Google Drive API** (APIs & Services → Library).
2. Configure the **OAuth consent screen** (External is fine; Testing mode works — add your own
   Google account under "Test users").
3. Create an **OAuth client ID** of type **Desktop app** (APIs & Services → Credentials). Copy the
   Client ID and Client Secret.
4. Run, locally (never on a server):
   ```
   node scripts/get-google-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>
   ```
   Sign in with the Google account that should receive the photos when prompted. The script
   prints the values to paste into `.env.local`:
   ```
   GOOGLE_OAUTH_CLIENT_ID=...
   GOOGLE_OAUTH_CLIENT_SECRET=...
   GOOGLE_OAUTH_REFRESH_TOKEN=...
   ```
5. With those three values now in `.env.local`, run:
   ```
   node scripts/create-drive-folder.mjs
   ```
   This creates `OUR CM OUR PRIDE → Marathon 2026 → Participant Photos` **via the API itself** and
   prints the innermost folder's id — paste it into `.env.local` as `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`.

   **Do not create this folder by hand in the Drive web UI and paste its id instead.** The consent
   scope requested is `drive.file` — least privilege, the app can only see files/folders it
   creates itself (or that are explicitly opened via a Picker). A manually-created folder is
   invisible to a `drive.file`-scoped token for read/list operations (`files.get` 404s on it),
   even though it belongs to the same account. `create-drive-folder.mjs` sidesteps this by having
   the app create — and therefore own visibility into — the folder from the start. It's idempotent,
   so re-running it reuses the same three folders instead of duplicating them.

Without these four variables configured, photo upload requests fail with a clear error but the
rest of the registration flow (including payment) is entirely unaffected — the photo is optional
end-to-end.

### 10f. New migration for the photo feature

```
supabase/migrations/20260817000000_marathon2026_photo.sql
```

Adds the nullable `photo_drive_file_id` / `photo_drive_url` columns to `registrations`.

### 10g. Payment flow: Razorpay Orders API + Checkout

The payment step is `POST /api/marathon/payment/create-order`, which creates a Razorpay Order via
the API (amount in paise, `receipt`/`notes` carrying the registration's draft id) and stores its
id as `razorpay_order_id` on the `registrations` row — a one-to-one link between a registration
and its Order. The browser then opens Razorpay Checkout with that Order id; on completion, the
client calls `POST /api/marathon/payment/verify`, which verifies the Razorpay payment signature
server-side (`HMAC_SHA256(order_id + "|" + payment_id, key_secret)`), confirms the Order id on the
request matches the one stored for that registration, and only then calls
`finalizePaidRegistration()`.

Payment confirmation is never taken from the browser alone: the Razorpay webhook
(`/api/razorpay/webhook`, subscribed to `payment.captured`, `order.paid`, `payment.failed`) is the
authoritative, server-to-server source of truth — it looks up the registration by
`razorpay_order_id` and calls the same idempotent `finalizePaidRegistration()`, so it's a safe
no-op if the client's own `payment/verify` call already finalized the row (or vice versa). The
success page (`/events/marathon/success`) polls `POST /api/marathon/registration-status` — gated
by a short-lived signed token issued at registration time — until the database shows
`payment_status = 'paid'`. It never trusts a returning `?query` param, redirect, or client-side
state as proof of payment.
