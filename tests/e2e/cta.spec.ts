import { expect, test } from "@playwright/test";

/**
 * Every "Begin" on the site points at /begin.
 *
 * They used to point at #sankalp, an anchor that scrolled to the pricing
 * section, whose tier cards were plain divs. The whole site's primary action
 * was a scroll. This asserts the href rather than the navigation, because
 * /begin is its own page, and a navigation would need a signed-in reader.
 */
const PAGES = ["/", "/snan", "/live", "/rivers", "/faq", "/hi", "/hi/snan"];

for (const path of PAGES) {
  test(`${path} sends every primary action to /begin`, async ({ page }) => {
    await page.goto(path);

    const prefix = path.startsWith("/hi") ? "/hi" : "";
    const begins = page.locator(`a[href="${prefix}/begin"]`);
    expect(await begins.count()).toBeGreaterThan(0);

    /* Nothing anywhere still reaches for the retired anchors or the four
       folded routes. A stale href here is a 404 or a scroll to nowhere. */
    /* The retired landing anchors. /faq has a real "#how" section of its
       own, "How it is made", which every page may link to. */
    for (const dead of path === "/faq" ? ["#sankalp"] : ["#sankalp", "#how"]) {
      expect(await page.locator(`a[href="${dead}"], a[href="/${dead}"]`).count()).toBe(0);
    }
    for (const dead of ["/how-it-works", "/patra", "/verify"]) {
      expect(await page.locator(`a[href*="${dead}"]`).count()).toBe(0);
    }
  });
}

/* /snan (spec 6.2): one press above the five parts, and no second button that
   walks through them. */
for (const path of ["/snan", "/hi/snan"]) {
  test(`${path} has one press above the five parts and no walk-through link`, async ({ page }) => {
    await page.goto(path);
    const above = await page.evaluate(() => {
      const list = document.querySelector("#parts");
      if (!list) return -1;
      return [...document.querySelectorAll("main .press")].filter(
        (el) => el.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).length;
    });
    expect(above).toBe(1);
    expect(await page.locator('main a[href="#form"], main a[href="#parts-long"]').count()).toBe(0);
    await expect(page.getByText("Walk through the five parts")).toHaveCount(0);
  });
}

/* The buyer's path (spec 6.3). /begin and /setup need an account, so their
   views are rendered in tests/unit/buyer-path.test.ts; here a signed-out
   reader is sent to sign in, and the sign-in screen carries the step line
   with every step still ahead and Clerk's primary button as the press. */
for (const prefix of ["", "/hi"]) {
  test(`${prefix}/begin sends a signed-out reader to sign in, on the step line`, async ({ page }) => {
    await page.goto(`${prefix}/begin?pack=eleven`);
    await expect(page).toHaveURL(new RegExp(`${prefix}/sign-in\\?redirect_url=`));

    const steps = page.locator("main ol li");
    await expect(steps).toHaveCount(3);
    expect(await page.locator('main [aria-current="step"]').count()).toBe(0);
  });
}

test("the Clerk card's primary button is the press", async ({ page }) => {
  await page.goto("/sign-in");
  const primary = page.locator(".cl-formButtonPrimary").first();
  await expect(primary).toBeVisible({ timeout: 30_000 });
  const look = await primary.evaluate((el) => {
    const s = getComputedStyle(el);
    return { shadow: s.boxShadow, border: s.borderTopWidth, height: el.getBoundingClientRect().height };
  });
  expect(look.border).toBe("2px");
  expect(look.shadow).toContain("6px 6px 0px");
  expect(look.height).toBeGreaterThanOrEqual(56);
});
