/* ---------------------------------------------------------------------------
   Drive the signed-in part of the site in a real browser.

     set -a; . ./.env.local; set +a; node scripts/drive.mjs <what>

   Clerk protects sign-up with a bot check, which is right and which also
   blocks automation, so this uses @clerk/testing's token to get past it with
   the test account created through Clerk's backend API.

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
const PASSWORD = "Snanify-test-8842!";

export async function signedInPage(browser) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await setupClerkTestingToken({ page });

  await page.goto(`${BASE}/sign-in`, { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await page.locator('input[name="identifier"]').fill(EMAIL);
  await page.getByRole("button", { name: /^continue$/i }).click();
  await page.waitForTimeout(3500);

  for (let i = 0; i < 3; i += 1) {
    const password = page.locator('input[name="password"]');
    const code = page
      .locator('input[autocomplete="one-time-code"], input[name^="codeInput"]')
      .first();

    if (await code.count()) {
      await code.fill("424242");
      await page.waitForTimeout(5000);
    } else if (await password.count()) {
      await password.fill(PASSWORD);
      await page.getByRole("button", { name: /^continue$/i }).click();
      await page.waitForTimeout(4000);
    } else break;

    if (!page.url().includes("/sign-in")) break;
  }

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
