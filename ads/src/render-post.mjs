/* Renders one daily Facebook post card, 1080 x 1350, from a JSON file.
   Run from the repo root: node ads/src/render-post.mjs <post.json> <out.png>

   The JSON: { lang, date, kicker, head, headSize?, body?, cta?, and one of:
     figure + unit? + note?  (a big number, e.g. today's flow)
     rows: [[label, value], ...]  (e.g. today's panchang)
     img (a local path) + credit?  (a plate, e.g. an engraved ghat) }
   See docs/meta/facebook-posts.md for what goes in it. */
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const [input, out] = process.argv.slice(2);
if (!input || !out) {
  console.error("usage: node ads/src/render-post.mjs <post.json> <out.png>");
  process.exit(1);
}
const post = JSON.parse(readFileSync(input, "utf8"));
if (post.img && !/^https?:|^file:/.test(post.img)) post.img = pathToFileURL(resolve(post.img)).href;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto(`${pathToFileURL(resolve("ads/src/post.html")).href}#${encodeURIComponent(JSON.stringify(post))}`);
await page.waitForSelector("body[data-ready]");
await page.waitForLoadState("networkidle");
await page.screenshot({ path: out });
await browser.close();
console.log(out);
