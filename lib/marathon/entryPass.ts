/**
 * Physical-participant entry pass PDF generator (pdf-lib), server-only.
 * A compact branded card: QR code, participant details, event/venue/
 * reporting instructions.
 */

import { PDFDocument, StandardFonts } from "pdf-lib";
import { PDF_COLORS } from "./pdfBrand";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
} from "@/types/marathon";

const PAGE_WIDTH = 420;
const PAGE_HEIGHT = 620;

interface EntryPassInput {
  fullName: string;
  registrationId: string;
  category: string;
  tshirtSize: string;
  bloodGroup: string;
  qrPngBuffer: Buffer;
}

export async function generateEntryPassPdf({
  fullName,
  registrationId,
  category,
  tshirtSize,
  bloodGroup,
  qrPngBuffer,
}: EntryPassInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: PDF_COLORS.white });

  // Header band
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 110, width: PAGE_WIDTH, height: 110, color: PDF_COLORS.maroon });
  page.drawRectangle({ x: 0, y: PAGE_HEIGHT - 114, width: PAGE_WIDTH, height: 4, color: PDF_COLORS.gold });

  const title = "ENTRY PASS";
  const titleSize = 20;
  const titleWidth = bold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y: PAGE_HEIGHT - 50,
    size: titleSize,
    font: bold,
    color: PDF_COLORS.white,
  });

  const eventLine = MARATHON_EVENT_NAME;
  const eventSize = 10;
  const eventWidth = regular.widthOfTextAtSize(eventLine, eventSize);
  page.drawText(eventLine, {
    x: (PAGE_WIDTH - Math.min(eventWidth, PAGE_WIDTH - 40)) / 2,
    y: PAGE_HEIGHT - 78,
    size: eventSize,
    font: regular,
    color: PDF_COLORS.gold,
  });

  // QR code
  const qrImage = await pdfDoc.embedPng(qrPngBuffer);
  const qrSize = 200;
  page.drawImage(qrImage, {
    x: (PAGE_WIDTH - qrSize) / 2,
    y: PAGE_HEIGHT - 340,
    width: qrSize,
    height: qrSize,
  });

  // Participant name
  const nameSize = 18;
  const nameWidth = bold.widthOfTextAtSize(fullName, nameSize);
  page.drawText(fullName, {
    x: (PAGE_WIDTH - Math.min(nameWidth, PAGE_WIDTH - 40)) / 2,
    y: PAGE_HEIGHT - 370,
    size: nameSize,
    font: bold,
    color: PDF_COLORS.navy,
  });

  const details: [string, string][] = [
    ["Registration ID", registrationId],
    ["Category", category],
    ["T-Shirt Size", tshirtSize],
    ["Blood Group", bloodGroup],
    ["Event Date", MARATHON_EVENT_DATE_DISPLAY],
    ["Venue", MARATHON_VENUE],
  ];

  let y = PAGE_HEIGHT - 410;
  for (const [label, value] of details) {
    page.drawText(`${label}:`, { x: 40, y, size: 10, font: bold, color: PDF_COLORS.grayText });
    page.drawText(value, { x: 165, y, size: 10, font: regular, color: PDF_COLORS.navy });
    y -= 22;
  }

  const instructions = [
    "Reporting Instructions:",
    "• Report at the venue by 5:30 AM on event day.",
    "• Carry this Entry Pass (printed or on phone) for QR scan-in.",
    "• Wear your event T-shirt and bib for the run.",
    "• Follow all directions from marshals and volunteers.",
  ];

  let iy = 130;
  for (const line of instructions) {
    page.drawText(line, {
      x: 40,
      y: iy,
      size: 9,
      font: line.startsWith("Reporting") ? bold : regular,
      color: PDF_COLORS.grayText,
    });
    iy -= 16;
  }

  page.drawText("Great Indian Movement (GIM)", {
    x: 40,
    y: 24,
    size: 9,
    font: bold,
    color: PDF_COLORS.maroon,
  });

  return pdfDoc.save();
}
