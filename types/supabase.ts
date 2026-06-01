/**
 * Supabase Database type definitions.
 *
 * This file mirrors what `npx supabase gen types typescript --local` produces.
 * Once you connect a live project, replace this file with the generated output:
 *
 *   npx supabase gen types typescript \
 *     --project-id <YOUR_PROJECT_ID> \
 *     --schema public \
 *     > types/supabase.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      marathon_registrations: {
        Row: {
          id: number;
          registration_id: string;
          event_name: string;
          age_category: "below_18" | "above_18";
          prefix: "Mr." | "Mrs." | "Ms." | "Others";
          full_name: string;
          gender: string;
          date_of_birth: string;         // ISO date: "YYYY-MM-DD"
          phone: string;
          email: string;
          pin_code: string;
          photo_url: string | null;
          pledge_accepted: boolean;
          guardian_name: string | null;  // below_18 only
          guardian_mobile: string | null;
          guardian_consent: boolean | null;
          created_at: string;            // ISO timestamptz
        };
        Insert: {
          id?: never;                    // serial — let Postgres assign
          registration_id: string;
          event_name?: string;           // defaults to 'Mega Pink Marathon'
          age_category: "below_18" | "above_18";
          prefix: "Mr." | "Mrs." | "Ms." | "Others";
          full_name: string;
          gender: string;
          date_of_birth: string;
          phone: string;
          email: string;
          pin_code: string;
          photo_url?: string | null;
          pledge_accepted?: boolean;     // defaults to true
          guardian_name?: string | null;
          guardian_mobile?: string | null;
          guardian_consent?: boolean | null;
          created_at?: string;           // defaults to NOW()
        };
        Update: Partial<
          Omit<Database["public"]["Tables"]["marathon_registrations"]["Insert"], "id">
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      age_category: "below_18" | "above_18";
      registration_prefix: "Mr." | "Mrs." | "Ms." | "Others";
    };
  };
}

/** Convenience aliases */
export type MarathonRegistrationRow =
  Database["public"]["Tables"]["marathon_registrations"]["Row"];

export type MarathonRegistrationInsert =
  Database["public"]["Tables"]["marathon_registrations"]["Insert"];

export type MarathonRegistrationUpdate =
  Database["public"]["Tables"]["marathon_registrations"]["Update"];
