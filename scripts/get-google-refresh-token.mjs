#!/usr/bin/env node
/**
 * One-time helper: generates a Google OAuth2 refresh token for the Drive
 * participant-photo upload feature. Run this locally — NEVER on a server
 * — since it briefly opens a localhost callback and prints a secret token.
 *
 * Usage:
 *   node scripts/get-google-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>
 *
 * Prerequisites (Google Cloud Console → APIs & Services):
 *   1. Enable the "Google Drive API" for your project.
 *   2. Configure the OAuth consent screen (External, Testing mode is fine —
 *      add your own Google account under "Test users").
 *   3. Create an OAuth client ID of type "Desktop app". Copy its Client ID
 *      and Client Secret.
 *
 * This script opens a consent URL, listens on http://localhost:53682/callback
 * for the redirect, exchanges the authorization code for tokens, and prints
 * the refresh token to paste into .env.local as GOOGLE_OAUTH_REFRESH_TOKEN.
 *
 * Scope requested: drive.file (only files this app creates — not your whole
 * Drive), so this token can never read/modify anything else in your account.
 */

import http from "node:http";
import { URL } from "node:url";

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPE = "https://www.googleapis.com/auth/drive.file";

const [clientId, clientSecret] = process.argv.slice(2);

if (!clientId || !clientSecret) {
  console.error("Usage: node scripts/get-google-refresh-token.mjs <CLIENT_ID> <CLIENT_SECRET>");
  process.exit(1);
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent"); // force a refresh_token even on repeat runs

console.log("\nOpen this URL in your browser and sign in with the Google account");
console.log("whose Drive should receive participant photos:\n");
console.log(authUrl.toString());
console.log(`\nWaiting for the redirect to ${REDIRECT_URI} ...\n`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(`Authorization failed: ${error ?? "no code returned"}`);
    console.error(`Authorization failed: ${error ?? "no code returned"}`);
    server.close();
    process.exit(1);
  }

  res
    .writeHead(200, { "Content-Type": "text/plain" })
    .end("Authorization received — you can close this tab and return to the terminal.");

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const data = await tokenRes.json();

    if (!tokenRes.ok || !data.refresh_token) {
      console.error("\nToken exchange failed:", data);
      console.error(
        "\nIf there is no refresh_token in the response, revoke prior access at " +
          "https://myaccount.google.com/permissions and re-run this script."
      );
      process.exit(1);
    }

    console.log("\nSuccess! Add these to .env.local:\n");
    console.log(`GOOGLE_OAUTH_CLIENT_ID=${clientId}`);
    console.log(`GOOGLE_OAUTH_CLIENT_SECRET=${clientSecret}`);
    console.log(`GOOGLE_OAUTH_REFRESH_TOKEN=${data.refresh_token}`);
  } catch (err) {
    console.error("\nToken exchange request failed:", err);
    process.exit(1);
  } finally {
    server.close();
  }
});

server.listen(PORT);
