"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children the first time they scroll into view.
 *
 * Deliberately not a fade-and-float: the type sets itself in place with a short
 * stepped transition, so it reads as an impression being pulled rather than a
 * web page animating. Under prefers-reduced-motion it is visible immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      /* Deferred a frame: setting state straight from an effect body triggers
         a cascading render, and React lints it as such. */
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transition: `opacity 420ms steps(7, end) ${delay}ms, transform 420ms cubic-bezier(0.2, 0.8, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
