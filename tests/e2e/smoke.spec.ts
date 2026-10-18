import { expect, test } from "@playwright/test";

/* The one rule every page is held to on a phone: nothing scrolls sideways.
   Designed at 390, nothing breaks at 360, and it still looks right at 430
   (spec 6.11): US phone traffic sits almost entirely between those two. */
const PAGES = ["/", "/snan", "/hi", "/hi/snan"];
const WIDTHS = [360, 390, 430];

for (const width of WIDTHS) {
  for (const path of PAGES) {
    test(`${path} does not scroll horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(path);
      await expect(page.locator("main, body").first()).toBeVisible();
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth - doc.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

/* The reference pages (spec 6.6): the free search and daily-return surface.
   Each sits on the strip in the masthead, carries one capitals headline with
   its river or occasion in sindoor, exactly one press (at the end, inviting
   the snan), and none of the selling kit: no band, no label. */
const REFERENCE = [
  "/live",
  "/hi/live",
  "/rivers",
  "/rivers/ganga-haridwar",
  "/panchang",
  "/panchang/london",
  "/panchang/shraddha",
  "/muhurat",
  "/muhurat/kartik-purnima-2026",
  "/kumbh",
  "/faq",
  "/about",
  "/privacy",
  "/terms",
  "/no-such-page",
];

for (const path of REFERENCE) {
  test(`${path} is a v3 reference page`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("[data-masthead] [data-strip]")).toHaveCount(1);

    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1.locator(".text-sindoor").first()).toBeVisible();
    const hindi = path.startsWith("/hi");
    const transform = await h1.evaluate((el) => getComputedStyle(el).textTransform);
    expect(transform).toBe(hindi ? "none" : "uppercase");

    await expect(page.locator("main .press")).toHaveCount(1);
    await expect(page.locator("[data-band]")).toHaveCount(0);
    await expect(page.locator("[data-label]")).toHaveCount(0);
    await expect(page.locator("[data-seal]")).toHaveCount(0);
  });

  for (const width of WIDTHS) {
    test(`${path} does not scroll horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
}

/* The figure stays checkable where the river is shown: the gauge, then the
   exact figure and rank, then its source. */
for (const path of ["/live", "/rivers/ganga-haridwar"]) {
  test(`${path} shows each river as a gauge with its figure and source`, async ({ page }) => {
    await page.goto(path);
    const reading = page.locator("[data-reading]").first();
    await expect(reading.locator("[data-gauge]")).toHaveCount(1);
    await expect(reading.locator("[data-figure]")).toBeVisible();
    await expect(reading.locator("[data-source]")).toContainText(/GloFAS|Copernicus/);
  });
}

/* The festival panel on an occasion page shows on the days the occasion is
   kept, decided in the browser by India's civil day (the page is rebuilt
   once a day, so the server cannot know the reader's day). */
for (const [when, shown] of [
  ["2026-11-08T07:00:00+05:30", true],
  ["2026-12-08T07:00:00+05:30", false],
] as const) {
  test(`kartik snan carries the festival panel only inside its month (${when.slice(0, 10)})`, async ({ page }) => {
    await page.clock.setFixedTime(new Date(when));
    await page.goto("/muhurat/kartik-snan-2026");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("[data-festival]")).toHaveCount(shown ? 1 : 0);
  });
}
