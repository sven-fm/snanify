import { expect, test } from "@playwright/test";

/**
 * Every "Begin" on the site points at /begin.
 *
 * They used to point at #sankalp, an anchor that scrolled to the pricing
 * section, whose tier cards were plain divs. The whole site's primary action
 * was a scroll. This asserts the href rather than the navigation, because
 * /begin itself lands in phase 3 of build-plan.md.
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
    for (const dead of ["#sankalp", "#how", "/how-it-works", "/patra", "/verify"]) {
      expect(await page.locator(`a[href*="${dead}"]`).count()).toBe(0);
    }
  });
}
