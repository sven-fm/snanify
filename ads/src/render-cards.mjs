/* Renders the video's caption overlays and end cards as 1080 x 1920 PNGs, in
   the plain style: a solid yellow frame round the phone's screen with one
   literal caption, and an end card that says it again with the price, Start
   now and the Patra rising in a phone. Run from the repo root:
   node ads/src/render-cards.mjs */
import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { OFFER, VIDEO } from "./copy.mjs";

const url = pathToFileURL(resolve("ads/src/plain.html")).href;
const browser = await chromium.launch();

async function shot(params, out) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(`${url}#${encodeURIComponent(JSON.stringify({ w: 1080, h: 1920, ...params }))}`);
  await page.waitForSelector("body[data-ready]");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: out, omitBackground: true });
  await page.close();
  console.log(out);
}

for (const lang of ["en", "hi"]) {
  const v = VIDEO[lang];
  for (const [i, t] of v.captions.entries()) {
    await shot({ style: "frame", lang, t, k: v.end.k }, `ads/out/frame-${lang}-${i + 1}.png`);
  }
  for (const market of ["diaspora", "india"]) {
    /* The end card shows the Patra the video closed on: the owner's own, when
       ads/in holds it, else the specimen. */
    const own = "ads/in/patra-sven-ganga.png";
    const img = pathToFileURL(resolve(existsSync(own) ? own : `ads/out/patra-916-${lang}.png`)).href;
    await shot(
      { style: "end", lang, a: v.end.a, b: v.end.b, sub: v.end.sub, cta: v.end.cta, offer: OFFER[market][lang], img },
      `ads/out/end-${lang}-${market}.png`,
    );
  }
}
await browser.close();
