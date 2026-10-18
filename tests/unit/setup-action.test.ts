import { beforeEach, describe, expect, it, vi } from "vitest";

/* The setup server action around the write: who it acts for, and what an
   autosave skips (the redirect to sign in, the registration, the next page). */

const h = vi.hoisted(() => ({
  currentUser: vi.fn(),
  requireUser: vi.fn(),
  saveSheet: vi.fn(),
  after: vi.fn(),
  headers: vi.fn(async () => new Headers({ "x-vercel-ip-country": "GB" })),
  cookies: vi.fn(async () => ({ get: () => undefined })),
}));

vi.mock("botid/server", () => ({ checkBotId: async () => ({ isBot: false }) }));
vi.mock("@/db", () => ({ db: {} }));
vi.mock("@/lib/auth", () => ({ currentUser: h.currentUser, requireUser: h.requireUser }));
vi.mock("@/lib/save-sheet", () => ({ saveSheet: h.saveSheet }));
vi.mock("@/lib/credits", () => ({ balance: async () => 0 }));
vi.mock("@/lib/meta-capi", () => ({ sendRegistration: vi.fn() }));
vi.mock("next/headers", () => ({ headers: h.headers, cookies: h.cookies }));
vi.mock("next/server", () => ({ after: h.after }));

import { saveProfile } from "@/app/[lang]/(app)/setup/actions";

const USER = { id: "user_1", email: "r@example.com" };

function form(autosave: boolean): FormData {
  const f = new FormData();
  f.set("lang", "en");
  if (autosave) f.set("autosave", "1");
  return f;
}

beforeEach(() => {
  vi.clearAllMocks();
  h.requireUser.mockImplementation(async () => USER);
  h.currentUser.mockImplementation(async () => USER);
});

describe("saveProfile", () => {
  it("an autosave from a signed-out reader fails quietly instead of redirecting", async () => {
    h.currentUser.mockResolvedValueOnce(null);
    const out = await saveProfile({ ok: false, errors: {} }, form(true));
    expect(out.ok).toBe(false);
    expect(h.requireUser).not.toHaveBeenCalled();
    expect(h.saveSheet).not.toHaveBeenCalled();
  });

  it("an autosave returns no next page and sends no registration", async () => {
    h.saveSheet.mockResolvedValueOnce({ ok: true, first: false });
    const out = await saveProfile({ ok: false, errors: {} }, form(true));
    expect(out).toEqual({ ok: true, errors: {} });
    expect(h.saveSheet).toHaveBeenCalledWith("user_1", "en", expect.any(FormData), { autosave: true });
    expect(h.after).not.toHaveBeenCalled();
    expect(h.headers).not.toHaveBeenCalled();
  });

  it("the press on a first sheet goes on to the packs and registers", async () => {
    h.saveSheet.mockResolvedValueOnce({ ok: true, first: true });
    const out = await saveProfile({ ok: false, errors: {} }, form(false));
    expect(h.requireUser).toHaveBeenCalled();
    expect(out.ok).toBe(true);
    expect(out.next).toBe("/begin");
    expect(out.first).toBe(true);
    expect(out.eventId).toBe("reg_user_1");
  });

  it("passes the write's errors back to the form", async () => {
    h.saveSheet.mockResolvedValueOnce({ ok: false, errors: { names: "namesEmpty" } });
    const out = await saveProfile({ ok: false, errors: {} }, form(true));
    expect(out).toEqual({ ok: false, errors: { names: "namesEmpty" } });
  });
});
