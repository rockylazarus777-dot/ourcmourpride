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
        Relationships: [];
      };

      /**
       * Our CM Our Pride – Mega Marathon 2026.
       * Fully independent from marathon_registrations above.
       */
      registrations: {
        Row: {
          id: number;
          registration_id: string | null;      // assigned only once payment is confirmed
          participant_type: "physical" | "e_participant";
          full_name: string;
          age: number;
          gender: string;
          blood_group: string;
          phone: string;
          email: string;
          city: string;
          category: "student" | "public" | "government_employee";
          tshirt_size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
          emergency_contact_name: string;
          emergency_contact_phone: string;
          pledge_accepted: boolean;
          otp_verified: boolean;
          photo_drive_file_id: string | null;
          photo_drive_url: string | null;
          payment_amount: number;
          payment_status: "pending" | "paid" | "failed";
          payment_id: string | null;
          razorpay_order_id: string | null;
          razorpay_signature: string | null;
          razorpay_payment_link_id: string | null;
          razorpay_payment_link_reference_id: string | null;
          razorpay_payment_link_url: string | null;
          certificate_id: string | null;
          certificate_url: string | null;
          qr_code_url: string | null;
          entry_pass_url: string | null;
          check_in_status: boolean;
          check_in_time: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          registration_id?: string | null;
          participant_type: "physical" | "e_participant";
          full_name: string;
          age: number;
          gender: string;
          blood_group: string;
          phone: string;
          email: string;
          city: string;
          category: "student" | "public" | "government_employee";
          tshirt_size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
          emergency_contact_name: string;
          emergency_contact_phone: string;
          pledge_accepted?: boolean;
          otp_verified?: boolean;
          photo_drive_file_id?: string | null;
          photo_drive_url?: string | null;
          payment_amount: number;
          payment_status?: "pending" | "paid" | "failed";
          payment_id?: string | null;
          razorpay_order_id?: string | null;
          razorpay_signature?: string | null;
          razorpay_payment_link_id?: string | null;
          razorpay_payment_link_reference_id?: string | null;
          razorpay_payment_link_url?: string | null;
          certificate_id?: string | null;
          certificate_url?: string | null;
          qr_code_url?: string | null;
          entry_pass_url?: string | null;
          check_in_status?: boolean;
          check_in_time?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["registrations"]["Insert"], "id">>;
        Relationships: [];
      };

      otp_verifications: {
        Row: {
          id: number;
          email: string;
          purpose: "marathon_registration";
          otp_hash: string;
          attempts: number;
          verified: boolean;
          expires_at: string;
          last_sent_at: string;
          created_at: string;
        };
        Insert: {
          id?: never;
          email: string;
          purpose?: "marathon_registration";
          otp_hash: string;
          attempts?: number;
          verified?: boolean;
          expires_at: string;
          last_sent_at?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Database["public"]["Tables"]["otp_verifications"]["Insert"], "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      next_registration_id: {
        Args: Record<string, never>;
        Returns: string;
      };
      next_certificate_id: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      age_category: "below_18" | "above_18";
      registration_prefix: "Mr." | "Mrs." | "Ms." | "Others";
      mm2026_participant_type: "physical" | "e_participant";
      mm2026_category: "student" | "public" | "government_employee";
      mm2026_tshirt_size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
      mm2026_payment_status: "pending" | "paid" | "failed";
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

/** Mega Marathon 2026 convenience aliases */
export type RegistrationRow = Database["public"]["Tables"]["registrations"]["Row"];
export type RegistrationInsert = Database["public"]["Tables"]["registrations"]["Insert"];
export type RegistrationUpdate = Database["public"]["Tables"]["registrations"]["Update"];

export type OtpVerificationRow = Database["public"]["Tables"]["otp_verifications"]["Row"];
export type OtpVerificationInsert = Database["public"]["Tables"]["otp_verifications"]["Insert"];
export type OtpVerificationUpdate = Database["public"]["Tables"]["otp_verifications"]["Update"];
