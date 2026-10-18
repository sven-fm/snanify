import { beforeEach, describe, expect, it, vi } from "vitest";

/* Every portrait a person ever chose goes when the account goes, including
   the replaced ones /setup keeps for old Patras. */

const h = vi.hoisted(() => ({
  pages: [] as { blobs: { pathname: string; url: string }[]; hasMore: boolean; cursor?: string }[],
  del: vi.fn(async () => {}),
}));

vi.mock("@vercel/blob", () => ({
  put: vi.fn(),
  del: h.del,
  list: vi.fn(async () => h.pages.shift() ?? { blobs: [], hasMore: false }),
}));

import { isPortraitOf, removePortraits } from "@/lib/blob";
import { sameOrigin } from "@/lib/same-origin";

describe("isPortraitOf", () => {
  it("matches the user's own portraits, with or without the random suffix", () => {
    expect(isPortraitOf("portrait/user_1.jpg", "user_1")).toBe(true);
    expect(isPortraitOf("portrait/user_1-Ab3xYz9Q.jpg", "user_1")).toBe(true);
  });

  it("never takes another user's whose id starts the same", () => {
    expect(isPortraitOf("portrait/user_12-Ab3xYz9Q.jpg", "user_1")).toBe(false);
    expect(isPortraitOf("portrait/user_1x.jpg", "user_1")).toBe(false);
    expect(isPortraitOf("sheet/user_1-Ab3.png", "user_1")).toBe(false);
  });
});

describe("removePortraits", () => {
  beforeEach(() => h.del.mockClear());

  it("deletes every portrait under the user's prefix, across pages, and only theirs", async () => {
    h.pages = [
      {
        blobs: [
          { pathname: "portrait/user_1-old.jpg", url: "https://x/portrait/user_1-old.jpg" },
          { pathname: "portrait/user_12-other.jpg", url: "https://x/portrait/user_12-other.jpg" },
        ],
        hasMore: true,
        cursor: "c1",
      },
      {
        blobs: [{ pathname: "portrait/user_1-current.jpg", url: "https://x/portrait/user_1-current.jpg" }],
        hasMore: false,
      },
    ];
    const removed = await removePortraits("user_1");
    expect(removed).toBe(2);
    expect(h.del.mock.calls.map((c) => (c as unknown[])[0])).toEqual([
      "https://x/portrait/user_1-old.jpg",
      "https://x/portrait/user_1-current.jpg",
    ]);
  });
});

describe("the beacon's origin check", () => {
  const at = (headers: Record<string, string>) =>
    new Request("https://www.snanify.com/en/setup/autosave", { method: "POST", headers });

  it("takes the page's own origin", () => {
    expect(sameOrigin(at({ origin: "https://www.snanify.com" }))).toBe(true);
    expect(sameOrigin(at({ "sec-fetch-site": "same-origin" }))).toBe(true);
  });

  it("refuses another site, or a request that names none", () => {
    expect(sameOrigin(at({ origin: "https://evil.example" }))).toBe(false);
    expect(sameOrigin(at({ "sec-fetch-site": "cross-site" }))).toBe(false);
    expect(sameOrigin(at({}))).toBe(false);
  });
});
