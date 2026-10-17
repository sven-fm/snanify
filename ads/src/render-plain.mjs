/* Renders PLAIN, the third Kartik set: "from home", "send it" and "three
   steps", in both languages, for both markets, at 4:5 for Feed and 9:16 for
   Stories and Reels. Run from the repo root: node ads/src/render-plain.mjs [style] */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { OFFER, PLAIN } from "./copy.mjs";

const SIZES = { 45: [1080, 1350], 916: [1080, 1920] };
const only = process.argv[2];
const page_ = pathToFileURL(resolve("ads/src/plain.html")).href;
const file = (p) => pathToFileURL(resolve(p)).href;
const browser = await chromium.launch();

for (const style of ["home", "send", "steps"]) {
  if (only && style !== only) continue;
  for (const lang of ["en", "hi"]) {
    for (const market of ["diaspora", "india"]) {
      for (const [size, [w, h]] of Object.entries(SIZES)) {
        const params = {
          style, lang, w, h, ...PLAIN[style][lang],
          cta: PLAIN.cta[lang],
          offer: OFFER[market][lang],
          /* The real start screen from the sitting recording, and the
             specimen Patra in its own edition. */
          screen: file("ads/out/screen-start.png"),
          sheet: file(`ads/out/patra-916-${lang}.png`),
        };
        const page = await browser.newPage({ viewport: { width: w, height: h } });
        await page.goto(`${page_}#${encodeURIComponent(JSON.stringify(params))}`);
        await page.waitForSelector("body[data-ready]");
        await page.waitForLoadState("networkidle");
        const out = `ads/out/plain-${style}-${lang}-${market}-${size}.png`;
        await page.screenshot({ path: out });
        await page.close();
        console.log(out);
      }
    }
  }
}
await browser.close();
