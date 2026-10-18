import { beforeEach, describe, expect, it, vi } from "vitest";

/* The write behind /setup, run against a recording database: what an
   autosave may and may not touch, and that a replaced portrait is kept. */

const h = vi.hoisted(() => {
  const state = {
    row: [] as { completedAt: Date | null }[],
    inserts: [] as { values: Record<string, unknown>; set: Record<string, unknown> }[],
    updates: [] as Record<string, unknown>[],
  };
  const db = {
    select: () => ({ from: () => ({ where: () => ({ limit: async () => state.row }) }) }),
    insert: () => ({
      values: (values: Record<string, unknown>) => ({
        onConflictDoUpdate: async ({ set }: { set: Record<string, unknown> }) => {
          state.inserts.push({ values, set });
        },
      }),
    }),
    update: () => ({
      set: (v: Record<string, unknown>) => ({
        where: async () => {
          state.updates.push(v);
        },
      }),
    }),
  };
  return {
    state,
    db,
    putPortrait: vi.fn(async () => ({ key: "portrait/user_1-new.jpg", url: "u" })),
    remove: vi.fn(async () => {}),
    revalidatePath: vi.fn(),
  };
});

vi.mock("drizzle-orm", () => ({ eq: () => ({}), sql: () => ({}) }));
vi.mock("@/db", () => ({ db: h.db, profiles: {}, users: {} }));
vi.mock("@/lib/blob", () => ({ putPortrait: h.putPortrait, remove: h.remove }));
vi.mock("@/lib/portrait", () => ({
  PortraitRejected: class extends Error {},
  processPortrait: async () => ({ buffer: Buffer.from([1]) }),
}));
vi.mock("next/cache", () => ({ revalidatePath: h.revalidatePath }));

import { saveSheet } from "@/lib/save-sheet";

function sheet(extra: Record<string, string | File> = {}): FormData {
  const form = new FormData();
  form.set("waterSlug", "ganga-haridwar");
  form.append("name", "Rekha Sharma");
  form.set("prayerId", "");
  form.set("sankalpText", "For my mother, every morning this month.");
  form.set("reminderHour", "6");
  form.set("tz", "Europe/London");
  for (const [k, v] of Object.entries(extra)) form.set(k, v);
  return form;
}

const photo = () => new File([new Uint8Array([1, 2, 3])], "me.jpg", { type: "image/jpeg" });

beforeEach(() => {
  h.state.row = [];
  h.state.inserts = [];
  h.state.updates = [];
  h.putPortrait.mockClear();
  h.remove.mockClear();
});

describe("saveSheet", () => {
  it("refuses an autosave without a completed sheet and writes nothing", async () => {
    for (const row of [[], [{ completedAt: null }]]) {
      h.state.row = row;
      const out = await saveSheet("user_1", "en", sheet({ portrait: photo() }), { autosave: true });
      expect(out.ok).toBe(false);
    }
    expect(h.putPortrait).not.toHaveBeenCalled();
    expect(h.state.inserts).toHaveLength(0);
    expect(h.state.updates).toHaveLength(0);
  });

  it("lets the press write a first sheet, and says it was the first", async () => {
    const out = await saveSheet("user_1", "en", sheet(), { autosave: false });
    expect(out).toEqual({ ok: true, first: true });
    expect(h.state.inserts).toHaveLength(1);
  });

  it("autosaves onto a completed sheet", async () => {
    h.state.row = [{ completedAt: new Date() }];
    const out = await saveSheet("user_1", "en", sheet(), { autosave: true });
    expect(out).toEqual({ ok: true, first: false });
    expect(h.state.updates[0]).toMatchObject({ reminderHour: 6, tz: "Europe/London" });
  });

  it("keeps a replaced portrait: the new key is written and nothing is deleted", async () => {
    h.state.row = [{ completedAt: new Date() }];
    await saveSheet("user_1", "en", sheet({ portrait: photo() }), { autosave: true });
    expect(h.putPortrait).toHaveBeenCalledTimes(1);
    expect(h.state.inserts[0].set.portraitKey).toBe("portrait/user_1-new.jpg");
    expect(h.remove).not.toHaveBeenCalled();
  });

  it("removing the photograph clears the column and keeps the file", async () => {
    h.state.row = [{ completedAt: new Date() }];
    await saveSheet("user_1", "en", sheet({ removePortrait: "1" }), { autosave: true });
    expect(h.state.inserts[0].set).toHaveProperty("portraitKey", null);
    expect(h.remove).not.toHaveBeenCalled();
  });

  it("a save that leaves the photograph alone never writes the portrait column", async () => {
    h.state.row = [{ completedAt: new Date() }];
    await saveSheet("user_1", "en", sheet(), { autosave: true });
    expect(h.state.inserts[0].set).not.toHaveProperty("portraitKey");
    expect(h.state.inserts[0].values).not.toHaveProperty("portraitKey");
  });

  it("returns field errors without writing", async () => {
    h.state.row = [{ completedAt: new Date() }];
    const out = await saveSheet("user_1", "en", sheet({ sankalpText: " " }), { autosave: true });
    expect(out.ok).toBe(false);
    if (!out.ok) expect(out.errors.sankalpText).toBe("sankalpEmpty");
    expect(h.state.inserts).toHaveLength(0);
  });
});
