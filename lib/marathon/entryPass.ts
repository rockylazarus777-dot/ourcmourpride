/**
 * Physical-participant entry pass PDF generator (pdf-lib), server-only.
 * A compact branded card: QR code, participant details, event/venue/
 * reporting instructions.
 *
 * Layout: the header, QR code and name are anchored a fixed distance
 * from the TOP of the page; the footer is anchored a fixed distance
 * from the BOTTOM. Everything in between (participant details, event
 * details, reporting instructions) is laid out with a single
 * top-down cursor computed from the actual wrapped line count of
 * each row/bullet — never two independently-guessed fixed offsets —
 * and the page height is sized to whatever that content needs (with
 * a floor matching the original card size), so the layout can't
 * regress into overlapping text again as content length varies.
 */

import { PDFDocument, StandardFonts, type PDFFont } from "pdf-lib";
import { PDF_COLORS } from "./pdfBrand";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
} from "@/types/marathon";

const PAGE_WIDTH = 420;
const MIN_PAGE_HEIGHT = 620;

const LEFT_MARGIN = 40;
const RIGHT_MARGIN = 40;
const VALUE_COLUMN_X = 165;
const VALUE_MAX_WIDTH = PAGE_WIDTH - RIGHT_MARGIN - VALUE_COLUMN_X;
const BULLET_INDENT = 12;
const BULLET_MAX_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN - BULLET_INDENT;

const NAME_SIZE = 18;
const NAME_LINE_HEIGHT = 22;
const NAME_TO_DETAILS_GAP = 30;

const DETAIL_SIZE = 10;
const DETAIL_LINE_HEIGHT = 13;
const ROW_HEIGHT = 22; // minimum vertical space reserved per detail row
const GROUP_GAP = 10; // extra space between the participant-details group and the event-details group

const INSTRUCTIONS_HEADING_GAP = 24; // extra space before "Reporting Instructions:"
const INSTRUCTION_HEADING_SIZE = 10;
const INSTRUCTION_SIZE = 9;
const INSTRUCTION_LINE_HEIGHT = 14;
const BULLET_TOP_GAP = 6;
const BULLET_GAP = 3; // extra space between bullets, beyond their own line height

const BOTTOM_CONTENT_MARGIN = 30; // space below the last bullet before the footer's reserved area
const FOOTER_Y = 24;

interface EntryPassInput {
  fullName: string;
  registrationId: string;
  category: string;
  tshirtSize: string;
  bloodGroup: string;
  qrPngBuffer: Buffer;
}

/** Greedy word-wrap — splits `text` into lines that each fit within `maxWidth` at the given font/size. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines: string[] = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

interface DetailRow {
  label: string;
  lines: string[];
}

function rowHeight(row: DetailRow): number {
  return Math.max(ROW_HEIGHT, row.lines.length * DETAIL_LINE_HEIGHT);
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
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // ---- Measure everything before committing to a page size ----
  const nameLines = wrapText(fullName, bold, NAME_SIZE, PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN);

  const participantRows: DetailRow[] = [
    { label: "Registration ID", lines: wrapText(registrationId, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
    { label: "Category", lines: wrapText(category, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
    { label: "T-Shirt Size", lines: wrapText(tshirtSize, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
    { label: "Blood Group", lines: wrapText(bloodGroup, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
  ];
  const eventRows: DetailRow[] = [
    { label: "Event Date", lines: wrapText(MARATHON_EVENT_DATE_DISPLAY, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
    { label: "Venue", lines: wrapText(MARATHON_VENUE, regular, DETAIL_SIZE, VALUE_MAX_WIDTH) },
  ];

  const bulletItems = [
    "Report at the venue by 5:30 AM on event day.",
    "Carry this Entry Pass (printed or on phone) for QR scan-in.",
    "Wear your event T-shirt and bib for the run.",
    "Follow all directions from marshals and volunteers.",
  ];
  const bullets = bulletItems.map((item) => wrapText(item, regular, INSTRUCTION_SIZE, BULLET_MAX_WIDTH));

  const participantGroupHeight = participantRows.reduce((sum, row) => sum + rowHeight(row), 0);
  const eventGroupHeight = eventRows.reduce((sum, row) => sum + rowHeight(row), 0);
  const bulletsHeight = bullets.reduce((sum, lines) => sum + lines.length * INSTRUCTION_LINE_HEIGHT + BULLET_GAP, 0);

  // ---- Size the page: fixed distance from top down through the name,
  //      then whatever the details + instructions actually need, then
  //      the fixed footer reservation at the bottom. ----
  const nameBlockHeight = 370 + (nameLines.length - 1) * NAME_LINE_HEIGHT;
  const requiredHeight =
    nameBlockHeight +
    NAME_TO_DETAILS_GAP +
    participantGroupHeight +
    GROUP_GAP +
    eventGroupHeight +
    INSTRUCTIONS_HEADING_GAP +
    INSTRUCTION_LINE_HEIGHT + // "Reporting Instructions:" heading's own line
    BULLET_TOP_GAP +
    bulletsHeight +
    BOTTOM_CONTENT_MARGIN +
    FOOTER_Y;

  const pageHeight = Math.max(MIN_PAGE_HEIGHT, Math.ceil(requiredHeight));
  const page = pdfDoc.addPage([PAGE_WIDTH, pageHeight]);

  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: pageHeight, color: PDF_COLORS.white });

  // Header band
  page.drawRectangle({ x: 0, y: pageHeight - 110, width: PAGE_WIDTH, height: 110, color: PDF_COLORS.maroon });
  page.drawRectangle({ x: 0, y: pageHeight - 114, width: PAGE_WIDTH, height: 4, color: PDF_COLORS.gold });

  const title = "ENTRY PASS";
  const titleSize = 20;
  const titleWidth = bold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y: pageHeight - 50,
    size: titleSize,
    font: bold,
    color: PDF_COLORS.white,
  });

  const eventLine = MARATHON_EVENT_NAME;
  const eventSize = 10;
  const eventWidth = regular.widthOfTextAtSize(eventLine, eventSize);
  page.drawText(eventLine, {
    x: (PAGE_WIDTH - Math.min(eventWidth, PAGE_WIDTH - 40)) / 2,
    y: pageHeight - 78,
    size: eventSize,
    font: regular,
    color: PDF_COLORS.gold,
  });

  // QR code
  const qrImage = await pdfDoc.embedPng(qrPngBuffer);
  const qrSize = 200;
  page.drawImage(qrImage, {
    x: (PAGE_WIDTH - qrSize) / 2,
    y: pageHeight - 340,
    width: qrSize,
    height: qrSize,
  });

  // Participant name — own line(s), wrapped and centered
  let y = pageHeight - 370;
  for (const line of nameLines) {
    const lineWidth = bold.widthOfTextAtSize(line, NAME_SIZE);
    page.drawText(line, {
      x: (PAGE_WIDTH - lineWidth) / 2,
      y,
      size: NAME_SIZE,
      font: bold,
      color: PDF_COLORS.navy,
    });
    y -= NAME_LINE_HEIGHT;
  }

  // y is now one line-height below the last name line — realign to the
  // exact bottom of the name block before starting the details table.
  y = pageHeight - nameBlockHeight - NAME_TO_DETAILS_GAP;

  const drawDetailRow = (row: DetailRow) => {
    page.drawText(`${row.label}:`, { x: LEFT_MARGIN, y, size: DETAIL_SIZE, font: bold, color: PDF_COLORS.grayText });
    let valueY = y;
    for (const line of row.lines) {
      page.drawText(line, { x: VALUE_COLUMN_X, y: valueY, size: DETAIL_SIZE, font: regular, color: PDF_COLORS.navy });
      valueY -= DETAIL_LINE_HEIGHT;
    }
    y -= rowHeight(row);
  };

  for (const row of participantRows) drawDetailRow(row);
  y -= GROUP_GAP;
  for (const row of eventRows) drawDetailRow(row);

  // Reporting instructions — heading on its own line, then each bullet
  // on its own line(s), clearly separated from the details above.
  y -= INSTRUCTIONS_HEADING_GAP;
  page.drawText("Reporting Instructions:", {
    x: LEFT_MARGIN,
    y,
    size: INSTRUCTION_HEADING_SIZE,
    font: bold,
    color: PDF_COLORS.grayText,
  });
  y -= INSTRUCTION_LINE_HEIGHT + BULLET_TOP_GAP;

  for (const lines of bullets) {
    page.drawText("•", { x: LEFT_MARGIN, y, size: INSTRUCTION_SIZE, font: regular, color: PDF_COLORS.grayText });
    let lineY = y;
    for (const line of lines) {
      page.drawText(line, {
        x: LEFT_MARGIN + BULLET_INDENT,
        y: lineY,
        size: INSTRUCTION_SIZE,
        font: regular,
        color: PDF_COLORS.grayText,
      });
      lineY -= INSTRUCTION_LINE_HEIGHT;
    }
    y -= lines.length * INSTRUCTION_LINE_HEIGHT + BULLET_GAP;
  }

  page.drawText("Great Indian Movement (GIM)", {
    x: LEFT_MARGIN,
    y: FOOTER_Y,
    size: 9,
    font: bold,
    color: PDF_COLORS.maroon,
  });

  return pdfDoc.save();
}
