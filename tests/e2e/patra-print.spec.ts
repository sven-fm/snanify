import { expect, test } from "@playwright/test";

/* The owner's Print (owner feedback, 18 Oct): the sheet and the sankalp under
   it come out on ONE page of A4 and ONE page of US Letter, never a second
   page with the river on it. /p/specimen is the owner's page on the tallest
   sheet in practice (five names, the prayer, the seal, a 280-character
   sankalp), served in development only. Each format is printed twice: as the
   browser prints when nothing tells the page first (the fallback column), and
   after `beforeprint`, when the Print link sizes the column to the sheet. */

const pages = (pdf: Buffer) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

for (const path of ["/p/specimen", "/hi/p/specimen"]) {
  test(`${path} prints the sheet and the sankalp on one page of A4 and of Letter`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("[data-patra-sankalp]")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    for (const measured of [false, true]) {
      if (measured) {
        await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
        const width = await page
          .locator("[data-patra-print]")
          .evaluate((el) => (el as HTMLElement).style.getPropertyValue("--patra-print-width"));
        expect(width).toMatch(/^\d+mm$/);
      }
      for (const format of ["A4", "Letter"] as const) {
        const pdf = await page.pdf({ format, printBackground: true });
        expect(pages(pdf), `${format}, ${measured ? "measured" : "fallback"}`).toBe(1);
      }
    }
  });
}

test("the owner's page shows one sheet, the sankalp under it, and no home-screen line", async ({ page }) => {
  await page.goto("/p/specimen");
  await expect(page.locator("[data-patra-sheet]")).toHaveCount(1);
  await expect(page.locator("main img[width='1080']")).toHaveCount(0);
  const sheetBottom = await page.locator("[data-patra-sheet]").evaluate((el) => el.getBoundingClientRect().bottom);
  const sankalpTop = await page.locator("[data-patra-sankalp]").evaluate((el) => el.getBoundingClientRect().top);
  expect(sankalpTop).toBeGreaterThanOrEqual(sheetBottom);
  await expect(page.getByText("home screen")).toHaveCount(0);
});
