/* ---------------------------------------------------------------------------
   Drive the signed-in part of the site in a real browser.

     set -a; . ./.env.local; set +a; node scripts/drive.mjs <what>

   Clerk protects sign-up with a bot check, which is right and which also
   blocks automation, so this uses @clerk/testing's token to get past it.

   SIGN-IN GOES THROUGH A TICKET, NOT THE FORM. The instance signs people in
   with Google or an emailed link, and a test cannot click a link in an inbox.
   Clerk's sign-in tokens exist for exactly this: the backend API mints one for
   the test user, `/sign-in?__clerk_ticket=` hands it to the widget, and the
   session is real. It also means this helper no longer breaks every time the
   sign-in strategies change, which they already did once.

   `what` is one of: setup, today, account. Screenshots land in the scratch
   directory named after each step.
   --------------------------------------------------------------------------- */

import { chromium } from "@playwright/test";
import { clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";

const SHOTS =
  process.env.SNANIFY_SHOTS ??
  "/private/tmp/claude-501/-Users-sven-dev-snanify/9d986a21-1ba7-4a1e-8bf8-85d79fe280b7/scratchpad";
const BASE = process.env.SNANIFY_BASE ?? "http://localhost:3000";
const EMAIL = "sven+clerk_test@example.com";

/** A one-time sign-in ticket for the test account, from Clerk's backend API. */
async function signInTicket() {
  const key = process.env.CLERK_SECRET_KEY;
  if (!key) throw new Error("CLERK_SECRET_KEY is missing; run `vercel env pull .env.local`");

  const found = await fetch(
    `https://api.clerk.com/v1/users?email_address=${encodeURIComponent(EMAIL)}`,
    { headers: { Authorization: `Bearer ${key}` } },
  );
  const users = await found.json();
  const userId = users[0]?.id;
  if (!userId) throw new Error(`no Clerk user for ${EMAIL}`);

  const minted = await fetch("https://api.clerk.com/v1/sign_in_tokens", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, expires_in_seconds: 600 }),
  });
  const body = await minted.json();
  if (!body.token) throw new Error(`no sign-in token: ${JSON.stringify(body).slice(0, 200)}`);

  return body.token;
}

export async function signedInPage(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await setupClerkTestingToken({ page });

  const ticket = await signInTicket();
  await page.goto(`${BASE}/sign-in?__clerk_ticket=${ticket}`, { waitUntil: "load" });

  /* The widget consumes the ticket and navigates away from /sign-in. */
  for (let i = 0; i < 20; i += 1) {
    await page.waitForTimeout(500);
    if (!page.url().includes("/sign-in")) break;
  }
  await page.waitForTimeout(1500);

  return page;
}

export async function shoot(page, name) {
  await page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: true });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  console.log(`· ${name}  ${page.url()}  overflow:${overflow}`);
  return overflow;
}

if (process.argv[1]?.endsWith("drive.mjs")) {
  await clerkSetup();
  const browser = await chromium.launch();
  const page = await signedInPage(browser);

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 160)));

  const what = process.argv[2] ?? "setup";
  await page.goto(`${BASE}/${what}`, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  await shoot(page, what);

  console.log("errors:", errors.length ? errors : "none");
  await browser.close();
}
