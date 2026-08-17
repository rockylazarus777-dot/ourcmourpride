import QRCode from "qrcode";
import type { MarathonQrPayload } from "@/types/marathon";

export async function generateQrPngBuffer(payload: MarathonQrPayload): Promise<Buffer> {
  const json = JSON.stringify(payload);
  return QRCode.toBuffer(json, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#071B2A", light: "#FFFFFF" },
  });
}
