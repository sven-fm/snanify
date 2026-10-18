"use client";

import { useSyncExternalStore } from "react";
import { Festival } from "@/components/site/Reference";
import { istToday, windowOn } from "@/lib/festival-window";

const subscribe = () => () => {};
/** Today in India on the client; nothing on the server, so the panel is never baked into the page. */
const todayOnClient = () => istToday();
const noDayOnServer = () => null;

/**
 * The festival panel on an occasion page, shown only on the days the
 * occasion is kept. The page is regenerated once a day, so the server cannot
 * know which day the reader opens it on: the server renders nothing, and the
 * browser decides from the dates already in the HTML, by India's civil day.
 */
export function FestivalNow({
  name,
  windows,
  className = "",
}: {
  name: string;
  /** Each date or span, with the words that say it ("Tuesday, 24 November 2026"). */
  windows: readonly { date: string; to?: string; said: string }[];
  className?: string;
}) {
  const today = useSyncExternalStore(subscribe, todayOnClient, noDayOnServer);
  const now = today ? windowOn(windows, today) : null;
  if (!now) return null;
  return (
    <div className={className}>
      <Festival name={name}>{now.said}</Festival>
    </div>
  );
}
