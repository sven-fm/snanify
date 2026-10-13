import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { adsAllowed } from "@/lib/meta";

/* Meta measures only where it may without a consent banner, and a purchase
   reaches the Conversions API hashed, once per Stripe session. */

describe("adsAllowed", () => {
  it("measures readers outside the consent countries", () => {
    for (const c of ["US", "CA", "IN", "AE", "SG", "AU", "us"]) expect(adsAllowed(c)).toBe(true);
  });

  it("stays off in the EU, the EEA, the UK and Switzerland, and for an unknown country", () => {
    for (const c of ["DE", "FR", "IE", "NO", "IS", "GB", "CH", "de"]) expect(adsAllowed(c)).toBe(false);
    expect(adsAllowed(null)).toBe(false);
    expect(adsAllowed("")).toBe(false);
  });
});

describe("sendPurchase", () => {
  /* The pixel id is read when src/lib/meta.ts loads, so each case loads it
     afresh after stubbing the environment. */
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  const purchase = {
    sessionId: "cs_test_123",
    email: " Asha@Example.com ",
    userId: "user_1",
    amountMinor: 1100,
    currency: "usd",
    sourceUrl: "https://www.snanify.com/begin",
    fbp: "fb.1.1.2",
    ip: "203.0.113.7",
    ua: "Mozilla/5.0",
    at: 1_790_000_000,
  };

  it("sends one hashed Purchase, keyed by the session", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "999");
    vi.stubEnv("META_CAPI_TOKEN", "tok");
    const fetch = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetch);

    const { sendPurchase } = await import("@/lib/meta-capi");
    await sendPurchase(purchase);

    expect(fetch).toHaveBeenCalledOnce();
    const [url, init] = fetch.mock.calls[0];
    expect(String(url)).toContain("/999/events?access_token=tok");
    const event = JSON.parse(init.body).data[0];
    expect(event.event_name).toBe("Purchase");
    expect(event.event_id).toBe("cs_test_123");
    expect(event.custom_data).toEqual({ currency: "USD", value: 11 });
    expect(event.user_data.em).toEqual([
      createHash("sha256").update("asha@example.com").digest("hex"),
    ]);
    expect(event.user_data.client_ip_address).toBe("203.0.113.7");
  });

  it("sends nothing without a pixel id and a token", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "");
    vi.stubEnv("META_CAPI_TOKEN", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);

    const { sendPurchase } = await import("@/lib/meta-capi");
    await sendPurchase(purchase);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("swallows a refusal, because a failed send is never a failed sale", async () => {
    vi.stubEnv("NEXT_PUBLIC_META_PIXEL_ID", "999");
    vi.stubEnv("META_CAPI_TOKEN", "tok");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { sendPurchase } = await import("@/lib/meta-capi");
    await expect(sendPurchase(purchase)).resolves.toBeUndefined();
  });
});
