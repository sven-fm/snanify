import { chromium } from "@playwright/test";
const base = process.argv[2];
const b = await chromium.launch();
for (const [w, h] of [[1600, 1000], [390, 844]]) {
  const page = await b.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${base}/live`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  for (let i = 0; i < 8; i += 1) { await page.mouse.wheel(0, 500); await page.waitForTimeout(350); }
  await page.waitForTimeout(900);
  const r = await page.evaluate(() => {
    const vis = (sel) => [...document.querySelectorAll(sel)].map((e) => getComputedStyle(e).opacity);
    const inView = [...document.querySelectorAll(".reveal")].filter((e) => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
    return { seenReveals: inView.length, hiddenInView: inView.filter((e) => getComputedStyle(e).opacity !== "1").length, li: vis("ul[data-in] li.reveal").slice(0, 2), bars: [...document.querySelectorAll("[data-in] .grow")].slice(0, 1).map((e) => getComputedStyle(e).transform) };
  });
  console.log(w, JSON.stringify(r));
  await page.close();
}
await b.close();
