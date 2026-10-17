/* Renders the Facebook Page cover, 1640 x 624, from ads/src/cover.html, plus a
   proof that lays Facebook's crops and profile picture over it.
   Run from the repo root: node ads/src/render-cover.mjs [copy.json]
   Writes ads/out/fb-cover.png and ads/out/fb-cover-proof.png. */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const copy = process.argv[2] ? JSON.parse(readFileSync(process.argv[2], "utf8")) : {};
const url = `${pathToFileURL(resolve("ads/src/cover.html")).href}#${encodeURIComponent(JSON.stringify(copy))}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1640, height: 624 } });
await page.goto(url);
await page.waitForSelector("body[data-ready]");
await page.waitForLoadState("networkidle");
await page.screenshot({ path: "ads/out/fb-cover.png" });

/* The proof: the phone crop (x 265 to 1375), the desktop profile picture
   (bottom centre) and the app's (bottom left of the phone crop). */
await page.evaluate(() => {
  const box = (css) => { const d = document.createElement("div"); d.style.cssText = "position:absolute;" + css; document.body.appendChild(d); };
  box("left:0;top:0;width:265px;height:624px;background:rgba(0,0,0,.45)");
  box("left:1375px;top:0;width:265px;height:624px;background:rgba(0,0,0,.45)");
  box("left:680px;top:450px;width:280px;height:280px;border-radius:50%;background:rgba(40,90,200,.55)");
  box("left:300px;top:440px;width:220px;height:220px;border-radius:50%;background:rgba(40,160,90,.55)");
});
await page.screenshot({ path: "ads/out/fb-cover-proof.png" });
await browser.close();
console.log("ads/out/fb-cover.png\nads/out/fb-cover-proof.png");
