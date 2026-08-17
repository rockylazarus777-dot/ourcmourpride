import {
  MARATHON_EVENT_NAME,
  MARATHON_EVENT_DATE_DISPLAY,
  MARATHON_VENUE,
} from "@/types/marathon";

const BRAND = {
  navy: "#071B2A",
  orange: "#F97316",
  maroon: "#7A1F2B",
  gold: "#D4AF37",
  bg: "#F8F8F8",
};

function shell(bodyHtml: string, preheader: string): string {
  return `<!doctype html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
  <body style="margin:0;padding:0;background:${BRAND.bg};font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
            <tr>
              <td style="background:linear-gradient(135deg,${BRAND.maroon},${BRAND.orange});padding:28px 32px;">
                <p style="margin:0;color:${BRAND.gold};font-weight:700;letter-spacing:1px;font-size:12px;text-transform:uppercase;">Great Indian Movement (GIM)</p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;">${MARATHON_EVENT_NAME}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:${BRAND.navy};font-size:14px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:${BRAND.navy};color:#ffffff;font-size:11px;text-align:center;">
                ${MARATHON_EVENT_DATE_DISPLAY} • ${MARATHON_VENUE}<br/>
                Our CM Our Pride — a Great Indian Movement (GIM) initiative
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function otpEmailTemplate(otp: string): string {
  const body = `
    <p>Hello,</p>
    <p>Use the verification code below to confirm your email address and continue your Mega Marathon 2026 registration.</p>
    <div style="margin:24px 0;text-align:center;">
      <span style="display:inline-block;background:${BRAND.bg};border:2px dashed ${BRAND.gold};border-radius:12px;padding:16px 32px;font-size:32px;font-weight:800;letter-spacing:10px;color:${BRAND.maroon};">${otp}</span>
    </div>
    <p>This code expires in <strong>5 minutes</strong>. If you didn't request this, you can safely ignore this email.</p>
  `;
  return shell(body, `Your verification code is ${otp}`);
}

export function physicalConfirmationTemplate(params: {
  fullName: string;
  registrationId: string;
  passUrl: string;
}): string {
  const { fullName, registrationId, passUrl } = params;
  const body = `
    <p>Dear ${fullName},</p>
    <p>Thank you for registering as a <strong>Physical Participant</strong> for the ${MARATHON_EVENT_NAME}! Your payment has been received and your registration is confirmed.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:20px 0;background:${BRAND.bg};border-radius:12px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND.maroon};font-weight:700;">Registration ID</p>
        <p style="margin:0;font-size:22px;font-weight:800;color:${BRAND.navy};">${registrationId}</p>
      </td></tr>
    </table>
    <p><strong>Event details</strong><br/>
    Date: ${MARATHON_EVENT_DATE_DISPLAY}<br/>
    Venue: ${MARATHON_VENUE}<br/>
    Category: 5 KM</p>
    <p><strong>Reporting instructions</strong><br/>
    Please arrive by 5:30 AM with your Entry Pass (QR code) ready for scan-in at the venue.</p>
    <div style="margin:24px 0;text-align:center;">
      <a href="${passUrl}" style="background:${BRAND.orange};color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:700;display:inline-block;">Download Entry Pass</a>
    </div>
    <p>See you at the start line!</p>
  `;
  return shell(body, `Your registration ID is ${registrationId}`);
}

export function eParticipantConfirmationTemplate(params: {
  fullName: string;
  registrationId: string;
  certificateId: string;
  certificateUrl: string;
  verifyUrl: string;
}): string {
  const { fullName, registrationId, certificateId, certificateUrl, verifyUrl } = params;
  const body = `
    <p>Dear ${fullName},</p>
    <p>Thank you for joining the ${MARATHON_EVENT_NAME} as an <strong>E-Participant</strong>! Your support for the movement means a lot.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:20px 0;background:${BRAND.bg};border-radius:12px;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND.maroon};font-weight:700;">Registration ID</p>
        <p style="margin:0 0 12px;font-size:18px;font-weight:800;color:${BRAND.navy};">${registrationId}</p>
        <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:${BRAND.maroon};font-weight:700;">Certificate ID</p>
        <p style="margin:0;font-size:18px;font-weight:800;color:${BRAND.navy};">${certificateId}</p>
      </td></tr>
    </table>
    <p>Your digital participation certificate is attached to this email, and can also be verified anytime at:<br/>
    <a href="${verifyUrl}" style="color:${BRAND.orange};">${verifyUrl}</a></p>
    <div style="margin:24px 0;text-align:center;">
      <a href="${certificateUrl}" style="background:${BRAND.orange};color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:700;display:inline-block;">Download Certificate</a>
    </div>
    <p>Together We Run. Together We Rise. Together We Build a Stronger Tamil Nadu. 🏃🇮🇳</p>
  `;
  return shell(body, `Your certificate ID is ${certificateId}`);
}
