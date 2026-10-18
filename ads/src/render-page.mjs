/* Renders the Facebook Page in PLAIN (brand/README.md): the cover and the six
   standing posts. Run from the repo root: node ads/src/render-page.mjs
   Writes ads/out/page/*.png, and cover-proof.png with Facebook's crops and
   profile picture laid over the cover.

   The words follow the brand voice: lead with the verb, short, numbers as
   digits, the key words in sindoor (*starred* in page.html). The Page speaks
   to every reader, so it names the six rivers rather than the Ganga alone. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { OFFER, PLAIN } from "./copy.mjs";

const file = (p) => pathToFileURL(resolve(p)).href;
const OUT = "ads/out/page";
mkdirSync(OUT, { recursive: true });

const COVER = {
  kind: "cover", w: 1640, h: 624,
  head: "Your daily snan.|*From home.*",
  sub: "6 sacred rivers. 3 minutes every morning.",
  cta: "Start now",
};

const LIST = {
  rivers: {
    w: 1080, h: 1350, lang: "en",
    title: "6 sacred *rivers*", sub: "Pick the one you grew up near.",
    rows: [
      ["*Ganga*", "Har Ki Pauri, Haridwar"],
      ["*Triveni Sangam*", "Prayagraj"],
      ["*Yamuna*", "Vishram Ghat, Mathura"],
      ["*Godavari*", "Ram Kund, Nashik"],
      ["*Shipra*", "Ram Ghat, Ujjain"],
      ["*Kaveri*", "Talakaveri, Kodagu"],
    ],
    offer: OFFER.diaspora.en, cta: "Start now",
  },
  free: {
    w: 1080, h: 1350, lang: "en", titleSize: 112,
    title: "Free. *Every day.*", sub: "Open every morning, for everyone.",
    rows: [
      ["Today's *panchang*", "300 cities"],
      ["The *muhurat* calendar", "Every snan day"],
      ["The *rivers* now", "All 6, today"],
    ],
    rowA: 60, rowB: 30, rowPad: 34,
    offer: "No sign-up needed.", cta: "See today", url: "snanify.com",
  },
};

/* The PLAIN ad template, with Page words. */
const PLAIN_POSTS = {
  welcome: { style: "home", lang: "en", a: "Your daily snan.", b: "From home.", sub: "3 minutes on your phone.", offer: OFFER.diaspora.en, cta: PLAIN.cta.en },
  hindi: { style: "home", lang: "hi", a: "रोज़ का स्नान।", b: "घर से।", sub: "फ़ोन पर 3 मिनट।", offer: OFFER.diaspora.hi, cta: PLAIN.cta.hi },
  steps: { style: "steps", lang: "en", title: "Your snan from home", steps: ["Pick your river", "Sit 3 minutes", "Send to family"], offer: OFFER.diaspora.en, cta: PLAIN.cta.en },
  send: { style: "send", lang: "en", ...PLAIN.send.en, offer: OFFER.diaspora.en, cta: PLAIN.cta.en },
};

const browser = await chromium.launch();
async function shot(html, params, out, proof) {
  const page = await browser.newPage({ viewport: { width: params.w, height: params.h } });
  await page.goto(`${file(html)}#${encodeURIComponent(JSON.stringify(params))}`);
  await page.waitForSelector("body[data-ready]");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: out });
  if (proof) {
    await page.evaluate(() => {
      const box = (css) => { const d = document.createElement("div"); d.style.cssText = "position:absolute;" + css; document.body.appendChild(d); };
      box("left:0;top:0;width:265px;height:624px;background:rgba(0,0,0,.45)");
      box("left:1375px;top:0;width:265px;height:624px;background:rgba(0,0,0,.45)");
      box("left:680px;top:450px;width:280px;height:280px;border-radius:50%;background:rgba(40,90,200,.55)");
      box("left:300px;top:440px;width:220px;height:220px;border-radius:50%;background:rgba(40,160,90,.55)");
    });
    await page.screenshot({ path: proof });
  }
  await page.close();
  console.log(out);
}

await shot("ads/src/page.html", COVER, `${OUT}/cover.png`, `${OUT}/cover-proof.png`);
for (const [name, p] of Object.entries(LIST)) await shot("ads/src/page.html", { kind: "list", ...p }, `${OUT}/${name}.png`);
for (const [name, p] of Object.entries(PLAIN_POSTS)) {
  await shot("ads/src/plain.html", {
    w: 1080, h: 1350, ...p,
    screen: file("ads/out/screen-start.png"),
    sheet: file(`ads/out/patra-916-${p.lang}.png`),
  }, `${OUT}/${name}.png`);
}
await browser.close();
