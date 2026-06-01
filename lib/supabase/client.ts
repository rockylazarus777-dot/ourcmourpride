"use client";

/**
 * Browser Supabase client.
 *
 * Use this in 'use client' components and client-side event handlers.
 * It is safe to expose only NEXT_PUBLIC_ variables here.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
