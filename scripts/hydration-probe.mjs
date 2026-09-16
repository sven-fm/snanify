import { chromium } from "playwright";

/* ---------------------------------------------------------------------------
   The hydration probe.

   Loads pages of the site many times in a fresh browser context and counts
   the loads on which React reports a hydration mismatch (error 418). On the
   first such load per page it saves the server HTML and the DOM React rebuilt
   into the scratch directory named below, so the two can be diffed.

     npx playwright install chromium   (once)
     node scripts/hydration-probe.mjs 20 "/,/snan,/sign-in"
     BASE=https://some-preview.vercel.app node scripts/hydration-probe.mjs 20

   16 September 2026: the mismatch showed on 10 of 36 loads in the minutes
   after a production deploy and on 0 of 94 later, with byte-identical HTML,
   and on 0 of 24 loads of a cold preview. Run this right after a deploy.
   --------------------------------------------------------------------------- */

import { writeFileSync } from "node:fs";
const N = Number(process.argv[2] ?? 12);
const paths = (process.argv[3] ?? "/,/snan,/begin").split(",");
const browser = await chromium.launch();
const results = {};
for (const path of paths) {
  results[path] = { flaked: 0, loads: 0 };
  for (let i = 0; i < N; i++) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push(String(e)));
    const resp = await page.goto((process.env.BASE ?? "https://www.snanify.com") + path, { waitUntil: "networkidle" });
    const raw = await resp.text();
    await page.waitForTimeout(800);
    results[path].loads++;
    const hit = errs.find((e) => /418|Hydration|hydrat/i.test(e));
    if (hit) {
      results[path].flaked++;
      if (!results[path].sample) {
        const dom = await page.evaluate(() => "<!DOCTYPE html>" + document.documentElement.outerHTML);
        results[path].sample = hit.slice(0, 300);
        const tag = path.replace(/\W/g, "_") || "root";
        writeFileSync(`${process.env.OUT ?? "/tmp"}/raw${tag}.html`, raw);
        writeFileSync(`${process.env.OUT ?? "/tmp"}/dom${tag}.html`, dom);
        results[path].errors = errs.slice(0, 5);
      }
    }
    await ctx.close();
  }
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
