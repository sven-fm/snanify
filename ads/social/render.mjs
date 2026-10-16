/* Renders the 30-day Facebook calendar in calendar.mjs through social.html:
   a PNG for a still post, an MP4 (30 fps, 4:5) plus its last frame as a
   poster for a moving one, and the post text beside it, ready to paste.
   Run from the repo root:
     node ads/social/render.mjs               every post
     node ads/social/render.mjs 2026-10-27    one day (or several)
     node ads/social/render.mjs --stills      last frames only, for checking */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { POSTS, caption } from "./calendar.mjs";

const FPS = 30;
const args = process.argv.slice(2);
const stillsOnly = args.includes("--stills");
const days = args.filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
const page_ = pathToFileURL(resolve("ads/social/social.html")).href;
const fileUrl = (p) => (p && !/^https?:|^file:/.test(p) ? pathToFileURL(resolve(p)).href : p);

const browser = await chromium.launch();
for (const post of POSTS) {
  if (days.length && !days.includes(post.date)) continue;
  const dir = `ads/social/posts/${post.date}`;
  mkdirSync(dir, { recursive: true });
  const card = { ...post.card, lang: post.lang, img: fileUrl(post.card.img), phone: fileUrl(post.card.phone) };
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto(`${page_}#${encodeURIComponent(JSON.stringify(card))}`);
  await page.waitForSelector("body[data-ready]");
  await page.waitForLoadState("networkidle");

  const moving = post.motion && !stillsOnly;
  const still = post.motion ? `${dir}/poster.png` : `${dir}/card.png`;
  await page.screenshot({ path: still });

  if (moving) {
    const dur = await page.evaluate(() => window.DURATION);
    const out = `${dir}/video.mp4`;
    if (existsSync(out)) rmSync(out);
    const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", String(FPS), "-i", "-",
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "medium", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
    const done = new Promise((ok, fail) => ff.on("close", (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg ${c}`)))));
    for (let i = 0; i < Math.round(dur * FPS); i++) {
      await page.evaluate((t) => window.frame(t), i / FPS);
      const buf = await page.screenshot({ type: "jpeg", quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    }
    ff.stdin.end();
    await done;
    console.log(out);
  }
  await page.close();
  writeFileSync(`${dir}/post.txt`, caption(post) + "\n");
  writeFileSync(`${dir}/post.json`, JSON.stringify(post, null, 2) + "\n");
  console.log(still);
}
await browser.close();
