"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* ---------------------------------------------------------------------------
   Every page sets itself as the reader scrolls.

   On each route, every `section` under `main` that starts below the first
   screen is marked `data-reveal`, and gets `data-in` the first time it
   scrolls into view. The stylesheet does the rest: the section's blocks set
   themselves in six steps, one after another. Sections already on screen
   when the page opens are left alone, so the first screen never waits, and
   a section that runs its own observer (`InView`, marked `data-armed`) is
   left to it. The sitting is skipped: nothing on that screen may blink.
   --------------------------------------------------------------------------- */

export function ScrollReveal() {
  const path = usePathname();

  /* The masthead's fold: a hairline under the rule once the page has moved. */
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      if (window.scrollY > 8) root.setAttribute("data-scrolled", "");
      else root.removeAttribute("data-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  useEffect(() => {
    if (/\/today(\/|$)/.test(path)) return;
    if (!("IntersectionObserver" in window)) return;

    /* A section already marked but not yet arrived is observed again: React
       runs this effect twice in development, and the first run's marks must
       not hide the second run's sections for good. */
    const sections = [...document.querySelectorAll<HTMLElement>("main section")].filter(
      (s) => !s.hasAttribute("data-armed") && !s.hasAttribute("data-in"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.02 },
    );
    const fold = window.innerHeight * 0.85;
    for (const s of sections) {
      if (!s.hasAttribute("data-reveal") && s.getBoundingClientRect().top < fold) continue;
      s.setAttribute("data-reveal", "");
      io.observe(s);
    }
    return () => io.disconnect();
  }, [path]);

  return null;
}
