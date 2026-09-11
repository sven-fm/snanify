import { chromium } from "@playwright/test";
const S = process.argv[2]; const base = process.argv[3];
const PAGES = ["/", "/snan", "/rivers", "/rivers/ganga-haridwar", "/live", "/muhurat", "/muhurat/pitru-paksha-2026", "/panchang", "/kumbh", "/faq", "/ethics", "/privacy", "/begin", "/hi", "/hi/rivers", "/hi/faq", "/no-such-page"];
const b = await chromium.launch();
for (const [w, h] of [[390, 844], [1440, 900]]) {
  for (const p of PAGES) {
    const page = await b.newPage({ viewport: { width: w, height: h } });
    const errors = []; page.on("pageerror", (e) => errors.push(e.message.slice(0, 100)));
    await page.goto(`${base}${p}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += Math.round(h * 0.6)) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(220); }
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const sec = document.querySelectorAll("main section[data-reveal]").length;
      const sin = document.querySelectorAll("main section[data-reveal][data-in]").length;
      const hidden = [...document.querySelectorAll("main section[data-reveal] > * > *, .reveal")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.height > 0 && r.bottom > -2000 && cs.opacity !== "1"; }).length;
      const band = document.querySelectorAll("svg.breathe").length;
      return { sec, sin, hidden, band, sw: document.documentElement.scrollWidth };
    });
    console.log(String(w).padEnd(5), p.padEnd(28), `sections ${r.sin}/${r.sec} revealed, hidden ${r.hidden}, bands ${r.band}, overflow ${r.sw > w ? r.sw : "no"}`, errors.length ? "ERR " + errors[0] : "");
    if (w === 1440 && ["/rivers", "/faq", "/muhurat"].includes(p)) await page.screenshot({ path: `${S}/all/${p.replace(/\//g, "_")}.png` });
    await page.close();
  }
}
await b.close();
