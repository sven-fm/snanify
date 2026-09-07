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
