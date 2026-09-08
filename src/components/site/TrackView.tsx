"use client";

import { useEffect, useRef } from "react";
import { track, type Event, type Props } from "@/lib/track";

/* ---------------------------------------------------------------------------
   Counting that somebody reached a page.

   A server component cannot fire an event, and adding a browser hook to the
   page itself would make the page a client component. This is the smallest
   thing that can sit inside a server-rendered page and report once.

   ONCE, EVEN THROUGH A RE-RENDER. React can mount an effect twice in
   development, and a page that counts two views for one visit makes every
   ratio built on it wrong.

   AND AFTER THE ANALYTICS SCRIPT, NOT BEFORE IT. React runs a child's effects
   before its parents', and the Analytics component sits in the root shell, so
   an event fired straight from this effect reached a queue that was not ready
   and vanished without an error. Deferring past the mount was not enough
   either; the script itself has to have loaded. Half a second is late enough
   in practice and early enough that nobody has left the page.
   --------------------------------------------------------------------------- */

/** How long to wait for the analytics script before reporting. */
const SETTLE_MS = 500;

export function TrackView({ event, props }: { event: Event; props?: Props }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    /* Deliberately not cancelled on unmount. React mounts an effect, tears it
       down and mounts it again in development; a cleanup that cleared this
       timer killed the only scheduled call, and the ref above then refused to
       schedule another, so the event never fired at all. A timer that lands
       after unmount reports a view that genuinely happened, which is the
       harmless direction to be wrong in.

       Props are a plain object rebuilt each render; the ref is what makes this
       fire once, so it deliberately does not re-run when they change. */
    window.setTimeout(() => track(event, props), SETTLE_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  /* A hidden marker rather than null: it costs one empty span and it is how a
     browser test can tell that this component reached the page at all, which
     was not obvious the first time an event failed to fire. */
  return <span hidden data-track={event} />;
}
