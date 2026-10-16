/* Renders the two static ads, loud: "Send the Ganga home" (the Patra in a
   phone, on the truck-art signboard) and "Kartik" (the four-by-five sheet in
   calendar art). Two languages, two markets, two sizes, same file names as
   the first set so Ads Manager's mapping holds.
   Run from the repo root after render-patra.ts: node ads/src/render-statics.mjs */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { LOUD, OFFER, SEAL, STATICS } from "./copy.mjs";

const SIZES = { 45: [1080, 1350], 916: [1080, 1920] };
const SAMVAT = { en: "Samvat 2083", hi: "संवत् 2083" };
const page_ = pathToFileURL(resolve("ads/src/loud.html")).href;
const browser = await chromium.launch();

for (const concept of ["home", "kartik"]) {
  const c = STATICS[concept];
  for (const lang of ["en", "hi"]) {
    for (const market of ["diaspora", "india"]) {
      for (const [size, [w, h]] of Object.entries(SIZES)) {
        const params = {
          style: concept, lang, w, h, ...c[lang],
          img: pathToFileURL(resolve(`ads/out/${c.img}-${lang}.png`)).href,
          seal: SEAL[market][lang],
          offer: OFFER[market][lang],
          samvat: SAMVAT[lang],
          cta: LOUD.signboard[lang].cta,
          title: LOUD.calendar[lang].title,
          sash: LOUD.calendar[lang].sash,
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
