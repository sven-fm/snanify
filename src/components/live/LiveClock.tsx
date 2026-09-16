"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
   The clock at the ghat, live, and the same moment in six cities.

   It ticks once a second from the phone's own clock. The ghat's line is IST;
   the reader's own zone comes from the browser and is printed under it; each
   city carries the same instant in its own zone and says whether that is the
   previous day, the same day or the next day relative to the ghat. The
   windows are today's at Har Ki Pauri, computed on the server once a day and
   handed down; the one open now is marked, otherwise the next.

   Formatting is Intl only. src/content/muhurat.ts has a dual-clock formatter,
   but it drags the whole muhurat dataset into the browser bundle, which is
   the hydration trap noted on the setup form. Nothing here imports content.

   The server renders the real time too, and the two spans that carry it are
   allowed to differ at hydration: the client's first frame is a second or two
   later than the server's, and that is not a bug worth a blank clock.
   --------------------------------------------------------------------------- */

const GHAT_ZONE = "Asia/Kolkata";

export type ClockZone = { zone: string; label: string };
export type ClockWindow = { name: string; startsAt: string; endsAt: string };

export type ClockCopy = {
  atTheGhat: string;
  whereYouAre: string;
  elsewhere: string;
  window: string;
  openNow: string;
  nextWindow: string;
  sunrise: string;
  live: string;
  shiftBack: string;
  shiftSame: string;
  shiftForward: string;
};

function locale(lang: string): string {
  return lang === "hi" ? "hi-IN" : "en-IN";
}

function timeIn(at: Date, zone: string, lang: string, seconds = false): string {
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: zone,
    hour: "numeric",
    minute: "2-digit",
    second: seconds ? "2-digit" : undefined,
    hour12: true,
  }).format(at);
}

function dayIn(at: Date, zone: string, lang: string): string {
  return new Intl.DateTimeFormat(locale(lang), {
    timeZone: zone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(at);
}

/** "2026-09-16" in a zone, for comparing civil dates. */
function civil(at: Date, zone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);
}

function shift(at: Date, zone: string): -1 | 0 | 1 {
  const a = civil(at, zone);
  const b = civil(at, GHAT_ZONE);
  return a < b ? -1 : a > b ? 1 : 0;
}

function browserZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || GHAT_ZONE;
  } catch {
    return GHAT_ZONE;
  }
}

export function LiveClock({
  lang,
  t,
  zones,
  windows,
  sunrise,
}: {
  lang: string;
  t: ClockCopy;
  zones: ClockZone[];
  /** Today's windows at the ghat, ISO instants. */
  windows: ClockWindow[];
  /** Today's sunrise at the ghat, an ISO instant, or null. */
  sunrise: string | null;
}) {
  const [now, setNow] = useState(() => new Date());
  /* The reader's zone: the browser's on the client, nothing on the server. */
  const mine = useSyncExternalStore(
    () => () => {},
    () => browserZone(),
    () => null,
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const ms = now.getTime();
  const open = windows.find((w) => Date.parse(w.startsAt) <= ms && ms < Date.parse(w.endsAt));
  const next = windows.find((w) => Date.parse(w.startsAt) > ms);
  const shown = open ?? next ?? null;

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
      {/* the ghat clock, primary */}
      <div className="boxed self-start border-2 bg-paper p-7">
        <h3 className="display text-xl text-ink">{t.atTheGhat}</h3>
        <div className="rule-thin mt-4" />
        <p className="display mt-5 text-2xl text-ink" suppressHydrationWarning>
          {dayIn(now, GHAT_ZONE, lang)}
        </p>
        <p className="display tabular mt-1 text-4xl text-spot" suppressHydrationWarning>
          {timeIn(now, GHAT_ZONE, lang, true)}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-ink2">
          <span className="h-2 w-2 bg-spot" aria-hidden="true" />
          IST, {t.live}
        </p>

        {mine && mine !== GHAT_ZONE && (
          <div className="mt-6 border-t border-rule pt-4">
            <p className="label text-ink2">{t.whereYouAre}</p>
            <p className="display tabular mt-2 text-2xl text-ink">
              {timeIn(now, mine, lang)}
              <span className="ml-3 text-base text-ink2">{dayIn(now, mine, lang)}</span>
            </p>
            <p className="mt-1 text-xs text-ink2">{mine.replace(/_/g, " ")}</p>
          </div>
        )}

        <dl className="mt-7 border-t-2 border-rulestrong text-sm">
          {shown && (
            <div className="flex justify-between gap-4 border-b border-rule py-3">
              <dt className="label text-ink2">{open ? t.openNow : t.nextWindow}</dt>
              <dd className="text-right text-ink" suppressHydrationWarning>
                {shown.name}, {timeIn(new Date(shown.startsAt), GHAT_ZONE, lang)}
              </dd>
            </div>
          )}
          {sunrise && (
            <div className="flex justify-between gap-4 py-3">
              <dt className="label text-ink2">{t.sunrise}</dt>
              <dd className="text-right text-ink">{timeIn(new Date(sunrise), GHAT_ZONE, lang)} IST</dd>
            </div>
          )}
        </dl>
      </div>

      {/* the same instant, elsewhere */}
      <div>
        <h3 className="display text-xl text-ink">{t.elsewhere}</h3>
        <ul className="mt-5 border-t-2 border-rulestrong">
          {zones.map((z) => {
            const s = shift(now, z.zone);
            return (
              <li
                key={z.zone}
                className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline sm:gap-6"
              >
                <p className="text-sm text-ink">{z.label}</p>
                <div>
                  <p className="text-sm text-ink2" suppressHydrationWarning>
                    <span className="tabular text-ink">{timeIn(now, z.zone, lang)}</span>, {dayIn(now, z.zone, lang)}
                  </p>
                  <p className={`mt-1 text-xs ${s === 0 ? "text-ink2" : "text-spot"}`} suppressHydrationWarning>
                    {s < 0 ? t.shiftBack : s > 0 ? t.shiftForward : t.shiftSame}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
