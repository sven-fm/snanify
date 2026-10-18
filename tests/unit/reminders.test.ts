import { describe, expect, it } from "vitest";
import { isDue, localHour, type Remindable } from "@/lib/reminders";

function person(over: Partial<Remindable> = {}): Remindable {
  return {
    id: "user_1",
    tz: "Asia/Kolkata",
    reminderHour: 5,
    reminderOn: true,
    lastRemindedOn: null,
    ...over,
  };
}

/** 2026-09-08T00:00Z is 05:30 in Kolkata, 20:00 the previous day in Toronto. */
const AT_0000Z = new Date("2026-09-08T00:00:00Z");

describe("localHour", () => {
  it("reads the hour in somebody's own zone", () => {
    expect(localHour(AT_0000Z, "Asia/Kolkata")).toBe(5);
    expect(localHour(AT_0000Z, "Europe/Berlin")).toBe(2);
    expect(localHour(AT_0000Z, "America/Toronto")).toBe(20);
    expect(localHour(AT_0000Z, "UTC")).toBe(0);
  });

  it("follows daylight saving rather than a fixed offset", () => {
    /* Berlin is UTC+2 in August and UTC+1 in December. A reminder set for six
       in the morning has to arrive at six in both. */
    expect(localHour(new Date("2026-08-15T04:00:00Z"), "Europe/Berlin")).toBe(6);
    expect(localHour(new Date("2026-12-15T05:00:00Z"), "Europe/Berlin")).toBe(6);
  });

  it("falls back to India rather than throwing on a zone it cannot read", () => {
    expect(localHour(AT_0000Z, "Mars/Olympus")).toBe(localHour(AT_0000Z, "Asia/Kolkata"));
  });
});

describe("isDue", () => {
  it("is due at the hour they chose, in their own zone", () => {
    expect(isDue(person({ tz: "Asia/Kolkata", reminderHour: 5 }), AT_0000Z)).toBe(true);
  });

  it("is not due an hour early or an hour late", () => {
    expect(isDue(person({ reminderHour: 4 }), AT_0000Z)).toBe(false);
    expect(isDue(person({ reminderHour: 6 }), AT_0000Z)).toBe(false);
  });

  it("reaches Toronto at their eight in the evening, not India's", () => {
    const toronto = person({ tz: "America/Toronto", reminderHour: 20 });
    expect(isDue(toronto, AT_0000Z)).toBe(true);
  });

  it("stays quiet for somebody who turned it off", () => {
    expect(isDue(person({ reminderOn: false }), AT_0000Z)).toBe(false);
  });

  it("sends once a day, however often the hour is checked", () => {
    /* The cron runs hourly and can be retried. Somebody already written to
       today must not be written to again. */
    const already = person({ lastRemindedOn: "2026-09-08" });
    expect(isDue(already, AT_0000Z)).toBe(false);
  });

  it("uses their own local date to decide what today is", () => {
    /* In Toronto it is still the seventh when it is the eighth in India. A
       reminder sent to them on the seventh has been sent today. */
    const toronto = person({
      tz: "America/Toronto",
      reminderHour: 20,
      lastRemindedOn: "2026-09-07",
    });
    expect(isDue(toronto, AT_0000Z)).toBe(false);
  });

  it("is due again the next day", () => {
    expect(isDue(person({ lastRemindedOn: "2026-09-07" }), AT_0000Z)).toBe(true);
  });

  it("is due at midnight for somebody who chose midnight", () => {
    const utc = person({ tz: "UTC", reminderHour: 0 });
    expect(isDue(utc, AT_0000Z)).toBe(true);
  });
});

/* --- the reminder's HTML (spec 6.8) ---------------------------------------- */

import { afterEach, beforeEach, vi } from "vitest";
import { sendReminder, sendReceipt } from "@/lib/email";

type Sent = { html: string; text: string; subject: string; headers: Record<string, string> };

async function renderReminder(over: Partial<Parameters<typeof sendReminder>[0]> = {}): Promise<Sent> {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "x" }), { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  await sendReminder({
    to: "a@example.com",
    userId: "user_1",
    lang: "en",
    water: "Ganga",
    band: "full",
    percentile: 86,
    cumecs: 797,
    ...over,
  });
  return JSON.parse(fetchMock.mock.calls[0][1].body as string) as Sent;
}

describe("the reminder email", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CRON_SECRET", "secret");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sets a capitals headline with the river in sindoor", async () => {
    const { html } = await renderReminder();
    expect(html).toContain("THE <span style=\"color:#c8251d;\">GANGA</span>, THIS MORNING.");
    expect(html).toContain("font-family:Georgia");
  });

  it("leads with the state and the plain sentence, then the gauge, the figure and the button", async () => {
    const { html } = await renderReminder();
    const state = html.indexOf("Running full");
    const plain = html.indexOf("Fuller than usual for this time of year.");
    const gauge = html.indexOf('data-gauge="river"');
    const figure = html.indexOf("797 m³/s, 86th percentile since 1997");
    const press = html.indexOf("border-right:4px solid #141210;border-bottom:4px solid #141210");
    expect(state).toBeGreaterThan(-1);
    expect([state, plain, gauge, figure, press]).toEqual([state, plain, gauge, figure, press].sort((a, b) => a - b));
    expect(plain).toBeGreaterThan(state);
  });

  it("draws five gauge cells and marks exactly one, the band the river is in", async () => {
    const { html } = await renderReminder();
    const table = html.slice(html.indexOf('data-gauge="river"'));
    expect((table.match(/data-cell="/g) ?? []).length).toBe(5);
    expect((html.match(/data-today="true"/g) ?? []).length).toBe(1);
    expect(html).toMatch(/data-cell="full" data-today="true"/);
  });

  it("marks no cell and claims nothing about today when the feed is quiet", async () => {
    const { html, subject } = await renderReminder({ percentile: null, cumecs: null, band: "usual" });
    expect((html.match(/data-cell="/g) ?? []).length).toBe(5);
    expect(html).not.toContain('data-today="true"');
    expect(html).toContain("Usual for the season");
    expect(html).not.toContain("percentile since");
    expect(subject).not.toMatch(/running/i);
  });

  it("has one sindoor button cell with the 4px ink border, sentence case, naming the river", async () => {
    const { html } = await renderReminder();
    expect((html.match(/border-right:4px solid #141210;border-bottom:4px solid #141210/g) ?? []).length).toBe(1);
    expect(html).toContain("background:#c8251d");
    expect(html).toContain(">Sit with the Ganga<");
  });

  it("puts the river PNG above the footer, with no mauli border", async () => {
    const { html } = await renderReminder();
    const png = html.indexOf("https://www.snanify.com/email/river-600x120.png");
    expect(png).toBeGreaterThan(-1);
    expect(png).toBeLessThan(html.indexOf("Stop these reminders"));
    expect(html).not.toContain("dashed");
    expect(html).not.toMatch(/border-top:3px solid/);
    expect(html).toContain("https://www.snanify.com/email/logo-480.png");
  });

  it("never mentions a streak, a count or a day missed, in either language", async () => {
    const banned = /streak|in a row|missed|of 1[1]/i;
    for (const lang of ["en", "hi"] as const) {
      for (const band of ["slack", "low", "usual", "full", "spate"] as const) {
        const m = await renderReminder({ lang, band, percentile: 50 });
        expect(`${m.html}\n${m.text}\n${m.subject}`).not.toMatch(banned);
        vi.unstubAllGlobals();
      }
    }
  });

  it("keeps the one-tap unsubscribe in the footer and in the headers", async () => {
    const m = await renderReminder();
    expect(m.html).toContain("/api/reminders/off?u=user_1");
    expect(m.headers["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
    expect(m.headers["List-Unsubscribe"]).toContain("/api/reminders/off");
    expect(m.text).toContain("Stop these reminders");
  });

  it("keeps the receipt's shell in the same style", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await sendReceipt({ to: "a@example.com", lang: "en", tier: "eleven", credits: 11, amountMinor: 1100, currency: "USD" });
    const { html } = JSON.parse(fetchMock.mock.calls[0][1].body as string) as Sent;
    expect(html).toContain("border-right:4px solid #141210;border-bottom:4px solid #141210");
    expect(html).toContain("river-600x120.png");
    expect(html).not.toContain("dashed");
  });
});
