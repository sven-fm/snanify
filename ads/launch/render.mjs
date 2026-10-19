/* Renders the launch video for LinkedIn: 1080 x 1350, 30 fps, about 18.6 s.
   launch.html draws the title, five screens of the snan swiping through a
   phone standing in the river, and the end card; the tanpura lies under it.
   Run from the repo root:
     node ads/launch/render.mjs            the video
     node ads/launch/render.mjs --stills   one PNG per screen, for checking */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { writeTanpura } from "./tanpura.mjs";

const DIR = "ads/launch";
const FPS = 30;
const stills = process.argv.includes("--stills");

/* One caption per screen, in order; the *starred* word goes sindoor. */
const CAPS = ["The *Ganga*,|this morning.", "Breathe with|the *river*.", "Hold your|own *sankalp*.", "Be *still*.|One minute.", "Send it to|the *family*."];
const LEAD = 3.2, HOLD = 2.4, SWIPE = 1.0, END = 3.4;
const endAt = LEAD + CAPS.length * HOLD;
const total = Math.round((endAt + END) * FPS) / FPS;
const params = {
  head: "Your *Ganga*|snan.|From home.", band: "Three minutes with a sacred river.", bandTop: 780,
  endHead: "Do your|own *snan*.", endSub: "Six sacred waters. From anywhere.",
  caps: CAPS, lead: LEAD, hold: HOLD, swipe: SWIPE, endAt, total,
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto(`${pathToFileURL(resolve(`${DIR}/launch.html`)).href}#${encodeURIComponent(JSON.stringify(params))}`);
await page.waitForSelector("body[data-ready]");
await page.waitForLoadState("networkidle");

if (stills) {
  mkdirSync(`${DIR}/stills`, { recursive: true });
  const marks = [["title", 1.9], ...CAPS.map((_, i) => [`screen-${i + 1}`, LEAD + i * HOLD + 1.5]), ["swipe", LEAD + HOLD - SWIPE / 2], ["end", total - 0.2]];
  for (const [name, t] of marks) {
    await page.evaluate((t) => window.frame(t), t);
    await page.screenshot({ path: `${DIR}/stills/${name}.png` });
    console.log(`${DIR}/stills/${name}.png`);
  }
} else {
  mkdirSync(`${DIR}/out`, { recursive: true });
  const wav = `${DIR}/out/tanpura.wav`;
  writeTanpura(wav, total, [endAt + 1.3]);
  const out = `${DIR}/out/snanify-launch-45.mp4`;
  if (existsSync(out)) rmSync(out);
  const ff = spawn("ffmpeg", ["-loglevel", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-framerate", String(FPS), "-i", "-", "-i", wav,
    "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-crf", "17", "-preset", "slow",
    "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
  const closed = new Promise((ok, fail) => ff.on("close", (c) => (c === 0 ? ok() : fail(new Error(`ffmpeg ${c}`)))));
  for (let i = 0; i < Math.round(total * FPS); i++) {
    await page.evaluate((t) => window.frame(t), i / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await closed;
  console.log(out, `${total.toFixed(2)} s`);
}
await browser.close();
