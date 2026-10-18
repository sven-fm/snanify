import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CHOICE_DELAY,
  TEXT_DELAY,
  autosaveAllowed,
  autosaveForm,
  createSaver,
  type SaveStatus,
  type SheetValues,
} from "@/lib/autosave";
import { setupContent } from "@/content/setup";

const SHEET: SheetValues = {
  lang: "en",
  waterSlug: "ganga-haridwar",
  names: ["Rekha Sharma", "Anil Sharma"],
  prayerId: "ganga-stotram",
  sankalpText: "For my mother, every morning this month.",
  reminderHour: 6,
  tz: "Europe/London",
  removePortrait: false,
  portrait: null,
};

/** Resolves when every pending microtask and promise chain has run. */
const settle = () => new Promise<void>((r) => setImmediate(r));

describe("createSaver", () => {
  beforeEach(() => vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] }));
  afterEach(() => vi.useRealTimers());

  it("saves a choice after the short pause and reports saving, then saved", async () => {
    const statuses: SaveStatus[] = [];
    const run = vi.fn(async () => true);
    const saver = createSaver(run, (s) => statuses.push(s));

    saver.request(CHOICE_DELAY);
    vi.advanceTimersByTime(CHOICE_DELAY);
    await settle();

    expect(run).toHaveBeenCalledTimes(1);
    expect(statuses).toEqual(["saving", "saved"]);
  });

  it("makes arrowing through the hours one save", async () => {
    const run = vi.fn(async () => true);
    const saver = createSaver(run, () => {});
    for (let i = 0; i < 8; i++) {
      saver.request(CHOICE_DELAY);
      vi.advanceTimersByTime(CHOICE_DELAY / 3);
    }
    vi.advanceTimersByTime(CHOICE_DELAY);
    await settle();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("debounces text: blurs inside the pause are one save", async () => {
    const run = vi.fn(async () => true);
    const saver = createSaver(run, () => {});

    saver.request(TEXT_DELAY);
    vi.advanceTimersByTime(TEXT_DELAY - 100);
    saver.request(TEXT_DELAY);
    vi.advanceTimersByTime(TEXT_DELAY - 100);
    expect(run).not.toHaveBeenCalled();
    vi.advanceTimersByTime(100);
    await settle();

    expect(run).toHaveBeenCalledTimes(1);
  });

  it("queues one more save behind one in flight, sends the newer values, and settles once", async () => {
    const statuses: SaveStatus[] = [];
    const sent: string[] = [];
    let value = "first";
    let release: (ok: boolean) => void = () => {};
    const run = vi
      .fn<() => Promise<boolean>>()
      .mockImplementationOnce(() => {
        sent.push(value);
        return new Promise((r) => (release = r));
      })
      .mockImplementation(async () => {
        sent.push(value);
        return true;
      });
    const saver = createSaver(run, (s) => statuses.push(s));

    saver.request(0);
    vi.advanceTimersByTime(0);
    await settle();
    value = "second";
    saver.request(0);
    vi.advanceTimersByTime(0);
    value = "third";
    saver.request(0);
    vi.advanceTimersByTime(0);
    await settle();
    expect(run).toHaveBeenCalledTimes(1);
    expect(saver.busy()).toBe(true);

    release(false);
    await saver.settled();

    expect(sent).toEqual(["first", "third"]);
    expect(statuses).toEqual(["saving", "saved"]);
    expect(saver.busy()).toBe(false);
  });

  it("reports a failed save, and a throw counts as one", async () => {
    const statuses: SaveStatus[] = [];
    const saver = createSaver(
      async () => {
        throw new Error("network");
      },
      (s) => statuses.push(s),
    );
    saver.request(0);
    vi.advanceTimersByTime(0);
    await settle();
    expect(statuses).toEqual(["saving", "failed"]);
  });

  it("flushes a waiting save at once, as the page is left", async () => {
    const run = vi.fn(async () => true);
    const saver = createSaver(run, () => {});
    saver.request(TEXT_DELAY);
    saver.flush();
    await saver.settled();
    expect(run).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(TEXT_DELAY * 2);
    await settle();
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("flush with nothing waiting does nothing", async () => {
    const run = vi.fn(async () => true);
    const saver = createSaver(run, () => {});
    saver.flush();
    await settle();
    expect(run).not.toHaveBeenCalled();
  });

  it("cancel drops a waiting save and the one queued behind a save in flight", async () => {
    let release: (ok: boolean) => void = () => {};
    const run = vi
      .fn<() => Promise<boolean>>()
      .mockImplementationOnce(() => new Promise((r) => (release = r)))
      .mockImplementation(async () => true);
    const saver = createSaver(run, () => {});

    saver.request(0);
    vi.advanceTimersByTime(0);
    await settle();
    saver.request(0);
    vi.advanceTimersByTime(0);
    saver.request(TEXT_DELAY);
    saver.cancel();
    release(true);
    await saver.settled();
    vi.advanceTimersByTime(TEXT_DELAY * 2);
    await settle();

    expect(run).toHaveBeenCalledTimes(1);
  });
});

describe("autosaveAllowed", () => {
  it("takes an autosave only onto a completed sheet", () => {
    expect(autosaveAllowed(new Date())).toBe(true);
    expect(autosaveAllowed(null)).toBe(false);
    expect(autosaveAllowed(undefined)).toBe(false);
  });
});

describe("autosaveForm", () => {
  it("sends every field of the sheet, the flag, and no photograph unless one waits", () => {
    const form = autosaveForm(SHEET);
    expect(form.get("autosave")).toBe("1");
    expect(form.get("waterSlug")).toBe("ganga-haridwar");
    expect(form.getAll("name")).toEqual(["Rekha Sharma", "Anil Sharma"]);
    expect(form.get("prayerId")).toBe("ganga-stotram");
    expect(form.get("sankalpText")).toBe(SHEET.sankalpText);
    expect(form.get("reminderHour")).toBe("6");
    expect(form.get("tz")).toBe("Europe/London");
    expect(form.has("portrait")).toBe(false);
    expect(form.has("removePortrait")).toBe(false);
    expect(form.has("pack")).toBe(false);
  });

  it("sends a waiting photograph, or the removal, never both", () => {
    const photo = new File([new Uint8Array([1, 2, 3])], "me.jpg", { type: "image/jpeg" });
    const withPhoto = autosaveForm({ ...SHEET, portrait: photo, removePortrait: true });
    expect(withPhoto.get("portrait")).toBeInstanceOf(File);
    expect(withPhoto.has("removePortrait")).toBe(false);

    const removed = autosaveForm({ ...SHEET, removePortrait: true });
    expect(removed.get("removePortrait")).toBe("1");
    expect(removed.has("portrait")).toBe(false);
  });
});

describe("setup copy", () => {
  const en = setupContent.en;
  const hi = setupContent.hi;

  it("carries the owner's headers and helpers", () => {
    expect(en.water.label).toBe("Select your water");
    expect(en.portrait.label).toBe("Photo (optional)");
    expect(en.portrait.choose).toBe("Choose a photo");
    expect(hi.portrait.choose).toContain("फ़ोटो");
    expect(hi.portrait.change).toContain("फ़ोटो");
    expect(en.names.label).toBe("Your family's names");
    expect(en.names.hint).toBe("Up to five. Your own name first.");
    expect(en.prayer.label).toBe("Select your prayer");
    expect(en.sankalp.label).toBe("Your own sankalp");
    expect(en.sankalp.hint).toBe("Your own words. Read them back every morning.");
    expect(en.reminder.label).toBe("Your morning hour");
    expect(en.reminder.hint).toBe("In your local time. Change it any time.");
  });

  it("drops the intro and the zone line, and the hints the owner cut", () => {
    for (const t of [en, hi]) {
      expect("lede" in t).toBe(false);
      expect("zone" in t.reminder).toBe(false);
      expect("hint" in t.water).toBe(false);
      expect("hint" in t.portrait).toBe(false);
      expect("hint" in t.prayer).toBe(false);
    }
  });

  it("has a quiet saved note in both editions, in Devanagari for Hindi", () => {
    for (const t of [en, hi]) {
      for (const line of Object.values(t.autosave)) expect(line.trim()).not.toBe("");
    }
    expect(en.autosave.saved).toBe("Saved");
    for (const line of Object.values(hi.autosave)) expect(line).toMatch(/[ऀ-ॿ]/);
    expect(hi.autosave.saved).not.toBe(en.autosave.saved);
  });

  it("keeps the new lines free of em dashes and negative constructions", () => {
    const lines = [en, hi].flatMap((t) => [
      t.water.label,
      t.portrait.label,
      t.names.label,
      t.names.hint,
      t.prayer.label,
      t.sankalp.label,
      t.sankalp.hint,
      t.reminder.label,
      t.reminder.hint,
      ...Object.values(t.autosave),
    ]);
    for (const line of lines) {
      expect(line).not.toContain("—");
      expect(line).not.toMatch(/\b(no|not|nobody|nothing|never)\b/i);
    }
  });
});
