/**
 * Server Supabase client (anon key, respects RLS).
 *
 * Use this in:
 *   - Server Components
 *   - Route Handlers  (GET requests / read-only operations)
 *
 * This client operates under the anonymous user's RLS policies.
 * For privileged writes, use createSupabaseAdminClient() from ./admin.
 *
 * NOTE: This function is async because Next.js 15 cookies() is async.
 */

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            /* Server Components cannot mutate cookies — safe to ignore. */
          }
        },
      },
    }
  );
}
