/**
 * Google Drive upload — server-only, never import from a 'use client' file.
 *
 * Auth: OAuth2 refresh-token flow against the site owner's own Google
 * account — NOT a service account. Plain service accounts have 0 bytes
 * of Drive storage quota and cannot own files in a personal ("My Drive")
 * folder, only in a Google Workspace Shared Drive. A refresh token for a
 * real account uploads count against that account's normal Drive quota.
 *
 * Scope is drive.file (least privilege): the app can only see/manage
 * files it created, not the rest of the Drive.
 *
 * Generate the refresh token once with scripts/get-google-refresh-token.mjs
 * — see docs/SETUP.md.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";
const DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";

interface CachedToken {
  value: string;
  expiresAt: number;
}

/* Module-level cache — reused across warm invocations of the same
 * server process so we don't hit the token endpoint on every upload. */
let cachedToken: CachedToken | null = null;

function getDriveEnv() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const folderId = process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID;

  if (!clientId || !clientSecret || !refreshToken || !folderId) {
    throw new Error(
      "Google Drive is not configured. Set GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, " +
        "GOOGLE_OAUTH_REFRESH_TOKEN and GOOGLE_DRIVE_PHOTOS_FOLDER_ID in .env.local."
    );
  }
  return { clientId, clientSecret, refreshToken, folderId };
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value;
  }

  const { clientId, clientSecret, refreshToken } = getDriveEnv();

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to refresh Google OAuth token (status ${res.status}).`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

export interface DriveUploadResult {
  fileId: string;
  webViewLink: string;
}

/** Uploads a single small file (photo) to the configured Drive folder. */
export async function uploadPhotoToDrive(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<DriveUploadResult> {
  const { folderId } = getDriveEnv();
  const accessToken = await getAccessToken();

  const boundary = `mm2026photo${Date.now()}`;
  const metadata = JSON.stringify({ name: filename, parents: [folderId] });

  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
        `--${boundary}\r\n` +
        `Content-Type: ${mimeType}\r\n\r\n`
    ),
    buffer,
    Buffer.from(`\r\n--${boundary}--`),
  ]);

  const res = await fetch(`${UPLOAD_URL}?uploadType=multipart&fields=id,webViewLink`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Drive upload failed (status ${res.status}): ${text.slice(0, 300)}`);
  }

  const data = (await res.json()) as { id: string; webViewLink?: string };
  return {
    fileId: data.id,
    webViewLink: data.webViewLink ?? `https://drive.google.com/file/d/${data.id}/view`,
  };
}

/**
 * Best-effort delete of a previously-uploaded photo (e.g. when a
 * participant replaces their photo before paying). Never throws —
 * a stray leftover file in Drive isn't worth failing the request over.
 */
export async function deleteDrivePhoto(fileId: string): Promise<void> {
  try {
    const accessToken = await getAccessToken();
    await fetch(`${DRIVE_FILES_URL}/${fileId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    /* non-fatal cleanup */
  }
}
