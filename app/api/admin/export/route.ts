import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isAdminRequest } from "@/lib/admin/guard";

const COLUMNS = [
  "registration_id",
  "participant_type",
  "full_name",
  "age",
  "gender",
  "blood_group",
  "phone",
  "email",
  "city",
  "category",
  "tshirt_size",
  "emergency_contact_name",
  "emergency_contact_phone",
  "interested_in_upcoming_events",
  "payment_amount",
  "payment_status",
  "payment_id",
  "certificate_id",
  "photo_drive_url",
  "check_in_status",
  "check_in_time",
  "created_at",
] as const;

/** Display label for a column's header cell — defaults to the raw column name. */
const COLUMN_LABELS: Partial<Record<(typeof COLUMNS)[number], string>> = {
  photo_drive_url: "Passport Photo URL",
  interested_in_upcoming_events: "Interested In Upcoming Events",
};

function columnLabel(column: (typeof COLUMNS)[number]): string {
  return COLUMN_LABELS[column] ?? column;
}

/** Human-readable values for the upcoming-events interest column — null exports as blank. */
const INTEREST_EXPORT_LABELS: Record<string, string> = {
  yes: "Yes",
  maybe: "Maybe / Keep me informed",
  no: "No",
};

function toCsv(rows: Record<string, unknown>[]): string {
  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const header = COLUMNS.map(columnLabel).join(",");
  const body = rows.map((r) => COLUMNS.map((c) => escape(r[c])).join(",")).join("\n");
  return `${header}\n${body}`;
}

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format") === "xlsx" ? "xlsx" : "csv";

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("registrations")
    .select(COLUMNS.join(","))
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to export registrations." }, { status: 500 });
  }

  const rows = (data ?? []).map((row) => {
    const r = row as unknown as Record<string, unknown>;
    const interest = r.interested_in_upcoming_events;
    return {
      ...r,
      interested_in_upcoming_events: typeof interest === "string" ? (INTEREST_EXPORT_LABELS[interest] ?? interest) : "",
    };
  });

  if (format === "csv") {
    return new NextResponse(toCsv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="mega-marathon-2026-registrations.csv"`,
      },
    });
  }

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...COLUMNS] });
  XLSX.utils.sheet_add_aoa(worksheet, [COLUMNS.map(columnLabel)], { origin: "A1" });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="mega-marathon-2026-registrations.xlsx"`,
    },
  });
}
