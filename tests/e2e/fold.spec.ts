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

/* From lg up the landing is one centred column, never two (owner feedback,
   18 Oct): the press is centred, and the specimen phone sits in its own
   section below the reading, centred too. */
for (const path of ["/", "/hi"]) {
  test(`${path} is one centred column at 1440x900`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const press = (await page.locator("[data-hero-press]").boundingBox())!;
    expect(press.y + press.height).toBeLessThanOrEqual(900);
    expect(Math.abs(press.x + press.width / 2 - 720)).toBeLessThan(4);
    const phone = (await page.locator("#sheet .phone").boundingBox())!;
    expect(phone.y).toBeGreaterThan(press.y + press.height);
    expect(Math.abs(phone.x + phone.width / 2 - 720)).toBeLessThan(4);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(1440);
  });
}
