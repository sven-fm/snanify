"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ADS_COOKIE, META_PIXEL_ID } from "@/lib/meta";

/* ---------------------------------------------------------------------------
   The Meta Pixel, for readers Meta may measure (src/lib/meta.ts).

   INJECTED AFTER HYDRATION, NEVER RENDERED. The loader is Meta's own snippet,
   run from an effect, so the server HTML and the first client render are
   identical with or without it: the hydration traps in CLAUDE.md stay shut,
   and a reader the cookie excludes downloads nothing from Meta at all.

   ONE PAGEVIEW PER ROUTE. The App Router changes pages without a load, so the
   pathname is watched and every change after the first is a PageView. The
   funnel events (ViewContent, InitiateCheckout, CompleteRegistration) go out
   from src/lib/track.ts; Purchase goes from the Stripe webhook through the
   Conversions API, see src/lib/meta-capi.ts.
   --------------------------------------------------------------------------- */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function allowed(): boolean {
  return new RegExp(`(?:^|; )${ADS_COOKIE}=1(?:;|$)`).test(document.cookie);
}

/** Meta's base code, as published, with the ID passed in. */
function load(id: string): void {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", id);
}

export function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!META_PIXEL_ID || !allowed()) return;
    load(META_PIXEL_ID);
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
