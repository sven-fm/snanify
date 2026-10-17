import { expect, test } from "@playwright/test";

/* The fold is a contract, measured where the ads land (spec 6.11). Readers
   arrive inside the Instagram and Facebook browsers, whose bars leave about
   390 x 660 of page. The landing's press sits above that line, in both
   editions, and above 640 at 360 wide. */
for (const [w, h] of [
  [390, 660],
  [360, 640],
] as const) {
  for (const path of ["/", "/hi"]) {
    test(`${path} press above the fold at ${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      await page.goto(path);
      const box = await page.locator("[data-hero-press]").boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(h);
      expect(box!.height).toBeGreaterThanOrEqual(56);
    });
  }
}
