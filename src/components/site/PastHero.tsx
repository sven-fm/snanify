"use client";

import { useEffect } from "react";

/* ---------------------------------------------------------------------------
   Whether the hero's own button has scrolled off.

   The masthead's Begin and the phone's thumb rail wait for it: three Begins
   on one screen is two too many, so the second and third appear only once
   the first has gone. The stylesheet does the showing (`[data-until-scrolled]`
   in globals.css); this only sets `data-past-hero` on <html>. Without
   scripts nothing is ever hidden.
   --------------------------------------------------------------------------- */

export function PastHero({ selector = "[data-hero-cta]" }: { selector?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const target = document.querySelector(selector);
    if (!target || !("IntersectionObserver" in window)) {
      root.setAttribute("data-past-hero", "");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) root.removeAttribute("data-past-hero");
        else root.setAttribute("data-past-hero", "");
      },
      { threshold: 0 },
    );
    io.observe(target);
    return () => {
      io.disconnect();
      root.removeAttribute("data-past-hero");
    };
  }, [selector]);

  return null;
}
