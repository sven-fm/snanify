import { expect, test } from "@playwright/test";

/* The one rule every page is held to on a phone: nothing scrolls sideways.
   Designed at 390, nothing breaks at 360, and it still looks right at 430
   (spec 6.11): US phone traffic sits almost entirely between those two. */
const PAGES = ["/", "/snan", "/hi", "/hi/snan", "/live", "/rivers"];
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
