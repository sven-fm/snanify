"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marks its block `data-in` the first time it scrolls into view, and never
 * takes it back. The CSS in globals.css does the rest: children carrying
 * `.reveal` set themselves in six steps, `.grow` bars rise from their
 * baseline, `--i` on a child staggers it after its siblings, and a lazy
 * picture is fetched.
 *
 * The block renders complete on the server. The hidden states only apply
 * under `html[data-js]`, which the head script stamps before first paint, so
 * without JavaScript the reader sees everything at once, and under reduced
 * motion the stylesheet shows it all regardless.
 *
 * `live` keeps watching instead: `data-in` comes and goes with the block, so
 * the river in src/components/kit pauses its motion while it is off screen.
 */
export function InView({
  children,
  className = "",
  as: Tag = "div",
  margin = "0px 0px -10% 0px",
  live = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li";
  margin?: string;
  live?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (live) {
          setShown(!!entry?.isIntersecting);
        } else if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.02 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, live]);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      data-armed=""
      data-in={shown ? "" : undefined}
    >
      {children}
    </Comp>
  );
}
