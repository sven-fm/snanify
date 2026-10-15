/* Renders LOUD, the second Kartik set: signboard, matchbox and calendar art
   turned all the way up, in both languages, for both markets, at 4:5 for Feed
   and 9:16 for Stories and Reels. Run from the repo root:
   node ads/src/render-loud.mjs [style] */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { LOUD, OFFER, SEAL } from "./copy.mjs";

const SIZES = { 45: [1080, 1350], 916: [1080, 1920] };
const SAMVAT = { en: "Samvat 2083", hi: "संवत् 2083" };
const only = process.argv[2];
const page_ = pathToFileURL(resolve("ads/src/loud.html")).href;
const browser = await chromium.launch();

for (const [style, copy] of Object.entries(LOUD)) {
  if (only && style !== only) continue;
  for (const lang of ["en", "hi"]) {
    for (const market of ["diaspora", "india"]) {
      for (const [size, [w, h]] of Object.entries(SIZES)) {
        const params = {
          style, lang, w, h, ...copy[lang],
          seal: SEAL[market][lang], offer: OFFER[market][lang], samvat: SAMVAT[lang],
        };
        const page = await browser.newPage({ viewport: { width: w, height: h } });
        await page.goto(`${page_}#${encodeURIComponent(JSON.stringify(params))}`);
        await page.waitForSelector("body[data-ready]");
        await page.waitForLoadState("networkidle");
        const out = `ads/out/loud-${style}-${lang}-${market}-${size}.png`;
        await page.screenshot({ path: out });
        await page.close();
        console.log(out);
      }
    }
  }
}
await browser.close();
