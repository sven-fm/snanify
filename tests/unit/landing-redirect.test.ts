import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { isLanding, mightBeSignedIn, proxy } from "@/proxy";

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
});
