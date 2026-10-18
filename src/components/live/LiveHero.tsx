"use client";

import { useState } from "react";
import type { Lang } from "@/lib/locales";
import { Reading, type ReadingView } from "@/components/live/Reading";

/* ---------------------------------------------------------------------------
   The head of /live: pick a water, and its reading answers.

   Everything here is already in the page. The six waters arrive as plain
   strings and numbers from the server, so the picker only decides which of
   them is shown; nothing is fetched and the first water is in the HTML for
   anyone without JavaScript.

   v3 (spec 6.6): each river as its name in sindoor, the state word, one
   plain sentence and the gauge, then the exact figure and rank in one small
   row with its source line. The six names wrap as quiet tabs, so nothing
   scrolls sideways at 390; the chosen one carries the sindoor rule.
   --------------------------------------------------------------------------- */

export interface HeroWater {
  slug: string;
  river: string;
  place: string;
  view: ReadingView;
  trend: string;
  sunrise: string;
  nextWindow: string | null;
  href: string;
}

export interface HeroLabels {
  pick: string;
  next: string;
  sunrise: string;
  open: string;
}

export function LiveHero({
  lang,
  waters,
  labels,
  note,
}: {
  lang: Lang;
  waters: HeroWater[];
  labels: HeroLabels;
  /** When the page was assembled, printed under the reading. */
  note: string;
}) {
  const [index, setIndex] = useState(0);
  const w = waters[index] ?? waters[0];
  if (!w) return null;

  return (
    <section>
      <div className="mx-auto max-w-3xl px-5 pb-10 sm:px-8">
        <p className="text-sm text-ink2">{labels.pick}</p>

        <div role="tablist" aria-label={labels.pick} className="mt-1 flex flex-wrap gap-x-5">
          {waters.map((x, i) => (
            <button
              key={x.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`display min-h-[44px] border-b-[3px] text-[1.0625rem] active:text-sindoor ${
                i === index ? "border-sindoor text-ink" : "border-transparent text-ink2"
              }`}
              style={{ fontWeight: 700 }}
            >
              {x.river}
            </button>
          ))}
        </div>

        <div key={w.slug} className="pull mt-7">
          <h2 className="display text-[1.75rem] leading-[1.1] text-sindoor" style={{ fontWeight: 800 }}>
            {w.river}
          </h2>
          <p className="mt-1 text-sm text-ink2">{w.place}</p>

          <Reading className="mt-5" view={w.view} lang={lang} />

          <dl className="mt-5">
            <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
              <dt className="label text-ink2">{labels.sunrise}</dt>
              <dd className="tabular text-sm text-ink">{w.sunrise} IST</dd>
            </div>
            {w.nextWindow && (
              <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5">
                <dt className="label text-ink2">{labels.next}</dt>
                <dd className="text-right text-sm text-ink">{w.nextWindow}</dd>
              </div>
            )}
          </dl>
          <p className="mt-3 text-sm text-ink2">{w.trend}</p>

          <a
            href={w.href}
            className="mt-2 inline-flex min-h-[44px] items-center font-bold text-ink underline decoration-ink decoration-2 underline-offset-4 active:text-sindoor"
          >
            {labels.open}
          </a>
        </div>

        <p className="mt-6 text-sm leading-[1.6] text-ink2">{note}</p>
      </div>
    </section>
  );
}
