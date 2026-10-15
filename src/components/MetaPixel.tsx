"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { META_PIXEL_ID } from "@/lib/meta";
import { CONSENT_EVENT, metaMayLoad, readAds, readConsent } from "@/lib/consent";

/* ---------------------------------------------------------------------------
   The Meta Pixel, for readers Meta may measure: from the first visit outside
   the consent countries, after a yes to the cookie notice inside them
   (src/lib/meta.ts, src/lib/consent.ts).

   INJECTED AFTER HYDRATION, NEVER RENDERED. The loader is Meta's own snippet,
   run from an effect, so the server HTML and the first client render are
   identical with or without it: the hydration traps in CLAUDE.md stay shut,
   and a reader the cookie excludes downloads nothing from Meta at all.

   ONE PAGEVIEW PER ROUTE. The App Router changes pages without a load, so the
   pathname is watched and every change after the first is a PageView, with
   Meta's own history listener switched off so it is the only one. The
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
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function allowed(): boolean {
  return metaMayLoad(readAds(), readConsent());
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
  /* fbevents.js sends its own PageView on every history.pushState unless told
     not to, and the effect below already sends one per route: left on, each
     page after the first would be counted twice. Read once, when the script
     loads, so it is set before the script is injected. */
  fbq.disablePushState = true;
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

  /* A yes to the cookie notice loads the pixel on the page the reader is
     already on, with the PageView it would have sent on arrival. */
  useEffect(() => {
    const onAnswer = () => {
      if (!META_PIXEL_ID || !allowed()) return;
      const fresh = !window.fbq;
      load(META_PIXEL_ID);
      if (fresh) window.fbq?.("track", "PageView");
    };
    window.addEventListener(CONSENT_EVENT, onAnswer);
    return () => window.removeEventListener(CONSENT_EVENT, onAnswer);
  }, []);

  return null;
}
