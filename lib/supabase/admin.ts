/**
 * Supabase admin client — uses the service_role key.
 *
 * ⚠ IMPORTANT:
 *   - ONLY use this in server-side API Route Handlers.
 *   - NEVER import this in 'use client' components.
 *   - NEVER expose SUPABASE_SERVICE_ROLE_KEY to the browser.
 *
 * The service_role key bypasses all Row Level Security policies.
 * Use it for:
 *   - Writing registration records (INSERT)
 *   - Uploading photos to private storage buckets
 *   - Admin reads that RLS would otherwise block
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

/* Module-level singleton — one admin client per server process. */
let _adminClient: ReturnType<typeof createClient<Database>> | undefined;

export function createSupabaseAdminClient() {
  if (_adminClient) return _adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin credentials. " +
        "Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local."
    );
  }

  _adminClient = createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _adminClient;
}
