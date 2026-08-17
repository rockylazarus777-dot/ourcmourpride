/**
 * E-Participant certificate PDF generator (pdf-lib), server-only.
 *
 * If public/certificates/template.png exists, it is used as the full-page
 * background and the name/certificate ID/QR are drawn on top of it — the
 * user has said they will supply this template. Until then, a clean
 * orange/maroon/gold design is drawn entirely in pdf-lib so certificates
 * work today.
 *
 * NOTE: the fs read below uses one fixed, literal path (never a variable),
 * so Vercel's build tracer only bundles this single small file — not the
 * whole public/ directory (see docs/BUNDLE_SIZE_FIX_REPORT.md for why that
 * distinction matters here).
 */

import { PDFDocument, PDFFont, PDFPage, StandardFonts } from "pdf-lib";
import { readFile } from "fs/promises";
import path from "path";
import { PDF_COLORS } from "./pdfBrand";
import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
} from "@/types/marathon";

const PAGE_WIDTH = 842; // A4 landscape, points
const PAGE_HEIGHT = 595;

interface CertificateInput {
  fullName: string;
  certificateId: string;
  qrPngBuffer: Buffer;
  verifyUrl: string;
}

async function loadTemplateBytes(): Promise<Buffer | null> {
  try {
    return await readFile(path.join(process.cwd(), "public", "certificates", "template.png"));
  } catch {
    return null;
  }
}

export async function generateCertificatePdf({
  fullName,
  certificateId,
  qrPngBuffer,
  verifyUrl,
}: CertificateInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const italic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const templateBytes = await loadTemplateBytes();

  if (templateBytes) {
    const templateImage = await pdfDoc.embedPng(templateBytes);
    page.drawImage(templateImage, { x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT });
  } else {
    drawFallbackBackground(page, bold, italic);
  }

  // Participant name — centered
  const nameSize = 34;
  const nameWidth = bold.widthOfTextAtSize(fullName, nameSize);
  page.drawText(fullName, {
    x: (PAGE_WIDTH - nameWidth) / 2,
    y: templateBytes ? 300 : 330,
    size: nameSize,
    font: bold,
    color: templateBytes ? PDF_COLORS.navy : PDF_COLORS.maroon,
  });

  // Certificate ID
  const idLabel = `Certificate ID: ${certificateId}`;
  page.drawText(idLabel, {
    x: 60,
    y: 60,
    size: 11,
    font: regular,
    color: PDF_COLORS.grayText,
  });

  // Verification URL
  page.drawText(verifyUrl, {
    x: 60,
    y: 44,
    size: 9,
    font: regular,
    color: PDF_COLORS.grayText,
  });

  // QR code — bottom right
  const qrImage = await pdfDoc.embedPng(qrPngBuffer);
  const qrSize = 90;
  page.drawImage(qrImage, {
    x: PAGE_WIDTH - qrSize - 60,
    y: 40,
    width: qrSize,
    height: qrSize,
  });

  return pdfDoc.save();
}

function drawFallbackBackground(page: PDFPage, bold: PDFFont, italic: PDFFont) {
  // White base
  page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: PDF_COLORS.white });

  // Gold outer border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: PAGE_WIDTH - 40,
    height: PAGE_HEIGHT - 40,
    borderColor: PDF_COLORS.gold,
    borderWidth: 4,
  });
  // Maroon inner border
  page.drawRectangle({
    x: 32,
    y: 32,
    width: PAGE_WIDTH - 64,
    height: PAGE_HEIGHT - 64,
    borderColor: PDF_COLORS.maroon,
    borderWidth: 1.5,
  });

  // Top orange-to-maroon band
  page.drawRectangle({ x: 32, y: PAGE_HEIGHT - 130, width: PAGE_WIDTH - 64, height: 6, color: PDF_COLORS.orange });

  const title = "CERTIFICATE OF E-PARTICIPATION";
  const titleSize = 26;
  const titleWidth = bold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y: PAGE_HEIGHT - 110,
    size: titleSize,
    font: bold,
    color: PDF_COLORS.maroon,
  });

  const sub = "This is to certify that";
  const subSize = 13;
  const subWidth = italic.widthOfTextAtSize(sub, subSize);
  page.drawText(sub, {
    x: (PAGE_WIDTH - subWidth) / 2,
    y: PAGE_HEIGHT - 250,
    size: subSize,
    font: italic,
    color: PDF_COLORS.grayText,
  });

  const line2 = `has proudly supported ${MARATHON_EVENT_NAME} as a virtual E-Participant.`;
  const line2Size = 13;
  const line2Width = italic.widthOfTextAtSize(line2, line2Size);
  page.drawText(line2, {
    x: (PAGE_WIDTH - line2Width) / 2,
    y: 220,
    size: line2Size,
    font: italic,
    color: PDF_COLORS.grayText,
  });

  const line3 = `${MARATHON_EVENT_DATE_DISPLAY}  •  ${MARATHON_VENUE}`;
  const line3Size = 12;
  const line3Width = italic.widthOfTextAtSize(line3, line3Size);
  page.drawText(line3, {
    x: (PAGE_WIDTH - line3Width) / 2,
    y: 195,
    size: line3Size,
    font: italic,
    color: PDF_COLORS.grayText,
  });

  const footer = "Great Indian Movement (GIM)";
  const footerSize = 12;
  const footerWidth = bold.widthOfTextAtSize(footer, footerSize);
  page.drawText(footer, {
    x: (PAGE_WIDTH - footerWidth) / 2,
    y: 90,
    size: footerSize,
    font: bold,
    color: PDF_COLORS.navy,
  });
}
