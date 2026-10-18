import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

/* Clerk's middleware, stood in for: it hands the handler an auth() that
   answers with `clerk.userId`, or throws as an outage or a bad key would. */
const clerk = vi.hoisted(() => ({ userId: null as string | null, fail: false }));
vi.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware:
    (handler: (auth: () => Promise<{ userId: string | null }>, req: unknown) => unknown) =>
    async (req: unknown) => {
      if (clerk.fail) throw new Error("Clerk is down");
      return handler(async () => ({ userId: clerk.userId }), req);
    },
}));

const { isLanding, mightBeSignedIn, proxy } = await import("@/proxy");

const SIGNED_IN = "__client_uat=1760000000";
async function visit(path: string, cookie?: string) {
  const req = new NextRequest(`http://localhost:3000${path}`, cookie ? { headers: { cookie } } : undefined);
  return proxy(req, {} as never);
}

/* A signed-in visitor on the landing goes to /account (src/proxy.ts); a
   stranger and a crawler, who carry no Clerk cookie, get the static landing
   without Clerk's middleware ever running. */

describe("the landing, signed in", () => {
  it("knows the landing in both editions and nothing else", () => {
    for (const p of ["/", "/hi", "/hi/"]) expect(isLanding(p), p).toBe(true);
    for (const p of ["/rivers", "/hi/rivers", "/account", "/en", "/high"]) expect(isLanding(p), p).toBe(false);
  });

  it("reads a possible session from Clerk's cookies", () => {
    expect(mightBeSignedIn([])).toBe(false);
    expect(mightBeSignedIn([{ name: "cur", value: "EUR" }])).toBe(false);
    expect(mightBeSignedIn([{ name: "__client_uat", value: "0" }])).toBe(false);
    expect(mightBeSignedIn([{ name: "__client_uat_Ab12", value: "0" }])).toBe(false);
    expect(mightBeSignedIn([{ name: "__client_uat", value: "1760000000" }])).toBe(true);
    expect(mightBeSignedIn([{ name: "__client_uat_Ab12", value: "1760000000" }])).toBe(true);
    expect(mightBeSignedIn([{ name: "__session", value: "eyJ" }])).toBe(true);
    expect(mightBeSignedIn([{ name: "__session_Ab12", value: "eyJ" }])).toBe(true);
    expect(mightBeSignedIn([{ name: "__sessionx", value: "eyJ" }])).toBe(false);
  });

  it("serves a stranger the landing itself, rewritten and never redirected", async () => {
    for (const path of ["/", "/hi"]) {
      const res = await proxy(new NextRequest(`http://localhost:3000${path}`), {} as never);
      expect(res?.status, path).toBe(200);
      expect(res?.headers.get("location"), path).toBeNull();
    }
  });

  it("sends a signed-in reader to their account, in their edition, with the ad's query", async () => {
    clerk.fail = false;
    clerk.userId = "user_1";
    const en = await visit("/?utm_source=meta&fbclid=abc", SIGNED_IN);
    expect(en?.status).toBe(307);
    expect(en?.headers.get("location")).toBe("http://localhost:3000/account?utm_source=meta&fbclid=abc");
    const hi = await visit("/hi", SIGNED_IN);
    expect(hi?.status).toBe(307);
    expect(hi?.headers.get("location")).toBe("http://localhost:3000/hi/account");
  });

  it("serves the landing when the cookie holds no session", async () => {
    clerk.fail = false;
    clerk.userId = null;
    const res = await visit("/", SIGNED_IN);
    expect(res?.status).toBe(200);
    expect(res?.headers.get("location")).toBeNull();
  });

  it("serves the landing when Clerk fails, never a 500", async () => {
    clerk.fail = true;
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const path of ["/", "/hi"]) {
      const res = await visit(path, SIGNED_IN);
      expect(res?.status, path).toBe(200);
      expect(res?.headers.get("location"), path).toBeNull();
    }
    quiet.mockRestore();
    clerk.fail = false;
  });
});
