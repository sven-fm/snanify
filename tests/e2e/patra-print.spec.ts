import { expect, test, type Page } from "@playwright/test";
import { PRINT_WORST_RATIO } from "../../src/lib/patra-print";

/* The owner's Print (owner feedback, 18 Oct): the sheet and the sankalp under
   it come out on ONE page of A4 and ONE page of US Letter, never a second
   page with the river on it. /p/specimen is the owner's page on a tall
   specimen sheet (five names, the prayer, the seal, a 280-character sankalp);
   `?worst=1` makes the names 60 characters each and the prayer the longest,
   the tallest the form allows. Each is printed twice: as the browser prints
   when nothing tells the page first (the plain CSS fallback column), and
   after `beforeprint`, when the Print link sizes the column to the sheet.

   The route exists in development only; against a production build it
   answers 404 and these tests skip. */

const pages = (pdf: Buffer) => (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;

async function open(page: Page, path: string) {
  const response = await page.goto(path);
  test.skip(response?.status() === 404, "/p/specimen is served in development only");
  await expect(page.locator("[data-patra-sankalp]")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

for (const path of ["/p/specimen", "/hi/p/specimen", "/p/specimen?worst=1", "/hi/p/specimen?worst=1"]) {
  test(`${path} prints the sheet and the sankalp on one page of A4 and of Letter`, async ({ page }) => {
    await open(page, path);

    /* The fallback column is sized for this ratio; a taller sheet breaks it. */
    const ratio = await page
      .locator("[data-patra-print]")
      .evaluate((el) => (el as HTMLElement).offsetHeight / (el as HTMLElement).offsetWidth);
    expect(ratio).toBeLessThanOrEqual(PRINT_WORST_RATIO);

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
  await open(page, "/p/specimen");
  await expect(page.locator("[data-patra-sheet]")).toHaveCount(1);
  await expect(page.locator("main img[width='1080']")).toHaveCount(0);
  const sheetBottom = await page.locator("[data-patra-sheet]").evaluate((el) => el.getBoundingClientRect().bottom);
  const sankalpTop = await page.locator("[data-patra-sankalp]").evaluate((el) => el.getBoundingClientRect().top);
  expect(sankalpTop).toBeGreaterThanOrEqual(sheetBottom);
  await expect(page.getByText("home screen")).toHaveCount(0);
});

test("the owner's page fetches the share image only when the press is near", async ({ page }) => {
  const fetched: string[] = [];
  page.on("request", (r) => {
    if (r.resourceType() === "fetch" && /\/specimen(\?|$)/.test(r.url()) && !r.url().includes("/p/")) fetched.push(r.url());
  });
  await open(page, "/p/specimen");
  await page.waitForTimeout(500);
  expect(fetched).toHaveLength(0);
  await page.getByRole("button", { name: /Send it to the family/ }).scrollIntoViewIfNeeded();
  await expect.poll(() => fetched.length).toBeGreaterThan(0);
});
