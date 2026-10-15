/* Renders every static ad: two concepts, two languages, two markets, two sizes.
   Run from the repo root after render-patra.ts: node ads/src/render-statics.mjs */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { OFFER, STATICS } from "./copy.mjs";

const SIZES = { 45: [1080, 1350], 916: [1080, 1920] };
const page_ = pathToFileURL(resolve("ads/src/static.html")).href;
const browser = await chromium.launch();

for (const [concept, c] of Object.entries(STATICS)) {
  for (const lang of ["en", "hi"]) {
    for (const market of ["diaspora", "india"]) {
      for (const [size, [w, h]] of Object.entries(SIZES)) {
        const params = {
          lang, w, h, art: c.art,
          img: pathToFileURL(resolve(`ads/out/${c.img}-${lang}.png`)).href,
          hookSize: (h > 1500 ? 118 : 100) * (lang === "hi" ? 0.86 : 1),
          ...c[lang],
          ...(h < 1500 ? { sub: "" } : {}),
          offer: OFFER[market][lang],
        };
        const page = await browser.newPage({ viewport: { width: w, height: h } });
        await page.goto(`${page_}#${encodeURIComponent(JSON.stringify(params))}`);
        await page.waitForSelector("body[data-ready]");
        await page.waitForLoadState("networkidle");
        const out = `ads/out/static-${concept}-${lang}-${market}-${size}.png`;
        await page.screenshot({ path: out });
        await page.close();
        console.log(out);
      }
    }
  }
}
await browser.close();
