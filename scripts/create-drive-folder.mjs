#!/usr/bin/env node
/**
 * Creates the "OUR CM OUR PRIDE / Marathon 2026 / Participant Photos" folder
 * structure via the Drive API itself, using the credentials already in
 * .env.local, and prints the innermost folder's id.
 *
 * Why this exists: the app authenticates with the `drive.file` OAuth scope
 * (least privilege — it can only see files/folders it creates or that are
 * explicitly opened via a Picker). A folder created manually in the Drive
 * web UI and shared by pasting its id into GOOGLE_DRIVE_PHOTOS_FOLDER_ID is
 * NOT visible to a drive.file-scoped token — API calls against it 404 even
 * though the folder exists and belongs to the same account. Creating the
 * folder through this same token sidesteps that entirely: the app owns
 * access to whatever it creates.
 *
 * Idempotent — safe to re-run; reuses folders by that name if they already
 * exist (i.e. if this script created them on a previous run).
 *
 * Usage: node scripts/create-drive-folder.mjs
 * Reads GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET /
 * GOOGLE_OAUTH_REFRESH_TOKEN from .env.local (must already be set — run
 * get-google-refresh-token.mjs first if not).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(projectRoot, ".env.local");

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")];
    })
);

const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN } = env;

if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET || !GOOGLE_OAUTH_REFRESH_TOKEN) {
  console.error(
    "Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN in .env.local.\n" +
      "Run scripts/get-google-refresh-token.mjs first."
  );
  process.exit(1);
}

async function getAccessToken() {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_OAUTH_CLIENT_ID,
      client_secret: GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: GOOGLE_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  return data.access_token;
}

async function findOrCreateFolder(accessToken, name, parentId) {
  const parentClause = parentId ? ` and '${parentId}' in parents` : "";
  const q = `name = '${name.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false${parentClause}`;

  const listRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const listData = await listRes.json();
  if (!listRes.ok) throw new Error(`Folder lookup failed for "${name}": ${JSON.stringify(listData)}`);

  if (listData.files?.length > 0) {
    console.log(`Found existing folder "${name}" (id=${listData.files[0].id})`);
    return listData.files[0].id;
  }

  const createRes = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  const createData = await createRes.json();
  if (!createRes.ok) throw new Error(`Folder creation failed for "${name}": ${JSON.stringify(createData)}`);

  console.log(`Created folder "${name}" (id=${createData.id})`);
  return createData.id;
}

const accessToken = await getAccessToken();

const level1 = await findOrCreateFolder(accessToken, "OUR CM OUR PRIDE", null);
const level2 = await findOrCreateFolder(accessToken, "Marathon 2026", level1);
const level3 = await findOrCreateFolder(accessToken, "Participant Photos", level2);

console.log("\nSet this in .env.local:\n");
console.log(`GOOGLE_DRIVE_PHOTOS_FOLDER_ID=${level3}`);
