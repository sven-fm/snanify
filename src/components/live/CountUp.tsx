"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A figure that counts up to its value the first time it is seen, then stays.
 *
 * The final string is rendered on the server and is what a crawler, a reader
 * without JavaScript, or anybody under reduced motion gets. The count runs
 * for under a second and stops; it is a printed figure settling, not a
 * ticker.
 */
/** The page's rule for a flow figure: two decimals on a trickle, none on a flood. */
function formatFlow(value: number, lang: string, digits: number | "auto"): string {
  const d = digits === "auto" ? (value < 10 ? 2 : value < 100 ? 1 : 0) : digits;
  return new Intl.NumberFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(value);
}

export function CountUp({
  value,
  lang,
  digits = "auto",
  duration = 900,
  className = "",
}: {
  value: number;
  lang: string;
  /** Fixed decimals, or "auto" for the flow rule above. A function cannot cross from a server component, so the rule lives here. */
  digits?: number | "auto";
  duration?: number;
  className?: string;
}) {
  /* The digit count is fixed from the final value, so the figure does not
     flicker between precisions while it counts. */
  const fixed = digits === "auto" ? (value < 10 ? 2 : value < 100 ? 1 : 0) : digits;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(value * eased);
          if (p < 1) frame = requestAnimationFrame(tick);
          else setShown(null);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {formatFlow(shown === null ? value : shown, lang, fixed)}
    </span>
  );
}
