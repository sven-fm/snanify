import { describe, expect, it } from "vitest";
import { accountForwardsToSetup, beginRoute, type BeginReader } from "@/lib/begin-path";

/* Where a press of Begin goes (src/lib/begin-path.ts): the whole branching of
   /begin, without a session or a database. */

const reader = (over: Partial<Extract<BeginReader, { signedIn: true }>> = {}): BeginReader => ({
  signedIn: true,
  setUp: true,
  credits: 0,
  bought: false,
  ...over,
});

describe("/begin, who goes where", () => {
  it("sends a stranger to sign in, whatever the address carries", () => {
    expect(beginRoute({ signedIn: false }, {})).toEqual({ to: "sign-in" });
    expect(beginRoute({ signedIn: false }, { buy: true, pack: "sixty" })).toEqual({ to: "sign-in" });
  });

  it("sends somebody signed in without a sheet to setup, even with mornings or buy=1", () => {
    expect(beginRoute(reader({ setUp: false }), {})).toEqual({ to: "setup" });
    expect(beginRoute(reader({ setUp: false, credits: 5 }), { buy: true })).toEqual({ to: "setup" });
  });

  it("sends somebody with mornings in hand to /account", () => {
    expect(beginRoute(reader({ credits: 49, bought: true }), {})).toEqual({ to: "account" });
    expect(beginRoute(reader({ credits: 1 }), {})).toEqual({ to: "account" });
    expect(beginRoute(reader({ credits: 3, bought: true }), { out: true })).toEqual({ to: "account" });
  });

  it("buy=1 shows the packs alone with eleven chosen, mornings in hand or not", () => {
    expect(beginRoute(reader({ credits: 49, bought: true }), { buy: true })).toEqual({ to: "packs", pack: "eleven" });
    expect(beginRoute(reader(), { buy: true })).toEqual({ to: "packs", pack: "eleven" });
  });

  it("a returning buyer at zero sees the packs alone", () => {
    expect(beginRoute(reader({ bought: true }), {})).toEqual({ to: "packs", pack: "eleven" });
    expect(beginRoute(reader({ bought: true }), { out: true })).toEqual({ to: "packs", pack: "eleven" });
  });

  it("out=1 for somebody set up who never paid keeps the specimen beside the packs", () => {
    expect(beginRoute(reader(), { out: true })).toEqual({ to: "first", pack: "eleven" });
  });

  it("a first-time buyer sees the specimen beside the packs", () => {
    expect(beginRoute(reader(), {})).toEqual({ to: "first", pack: "eleven" });
    expect(beginRoute(reader(), { pack: "one" })).toEqual({ to: "first", pack: "one" });
  });

  it("keeps somebody mid-purchase on the packs rather than sending them to /account", () => {
    const held = reader({ credits: 10, bought: true });
    expect(beginRoute(held, { pack: "sixty" })).toEqual({ to: "packs", pack: "sixty" });
    expect(beginRoute(held, { pack: "eleven", error: true })).toEqual({ to: "packs", pack: "eleven" });
    expect(beginRoute(held, { cancelled: true })).toEqual({ to: "packs", pack: "eleven" });
  });

  it("ignores a pack that does not exist", () => {
    expect(beginRoute(reader({ credits: 4, bought: true }), { pack: "ninety" })).toEqual({ to: "account" });
    expect(beginRoute(reader({ bought: true }), { buy: true, pack: "ninety" })).toEqual({ to: "packs", pack: "eleven" });
  });
});

describe("/account, for a fresh account", () => {
  const none = { setUp: false, kept: 0, bought: 0, credits: 0 };

  it("forwards somebody with nothing at all to /setup", () => {
    expect(accountForwardsToSetup(none)).toBe(true);
  });

  it("keeps anybody with a sheet, a morning, a purchase or credits", () => {
    expect(accountForwardsToSetup({ ...none, setUp: true })).toBe(false);
    expect(accountForwardsToSetup({ ...none, kept: 1 })).toBe(false);
    expect(accountForwardsToSetup({ ...none, bought: 1 })).toBe(false);
    expect(accountForwardsToSetup({ ...none, credits: 3 })).toBe(false);
  });
});
