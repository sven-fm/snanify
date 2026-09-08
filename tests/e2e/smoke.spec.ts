import { expect, test } from "@playwright/test";

/* The one rule every page is held to on a phone: nothing scrolls sideways. */
const PAGES = ["/", "/snan", "/hi", "/hi/snan", "/live", "/rivers"];

for (const path of PAGES) {
  test(`${path} does not scroll horizontally at 390px`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("main, body").first()).toBeVisible();
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth - doc.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
