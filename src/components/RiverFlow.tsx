"use client";

/**
 * An engraved river at sunset, in perspective.
 *
 * The geometry is a real pinhole projection rather than a stack of sine waves:
 * a point at depth `d` lands at `y = horizon + C/d`, and the channel's
 * half-width shrinks by the same `1/d`. So the transverse ripples bunch toward
 * the horizon and the longitudinal streamlines converge on the vanishing point,
 * which is what makes it read as water going away from you rather than as a
 * pattern. Ripples advance from far to near, so the current comes at the reader.
 *
 * The sun is the logo's bindu at full size, sitting into the waterline. Its
 * glitter path is the same ripple geometry drawn a second time in the spot
 * colour and clipped to a trapezoid that widens as it approaches, which is the
 * shape a real reflection makes.
 *
 * Architecture follows the terrain motif in trainingzones: each frame the paths
 * are recomputed and written straight to the `d` attribute through a group ref,
 * bypassing React reconciliation, so ~80 paths animate with no re-render. It
 * pauses off screen and in background tabs, and paints a single static frame
 * under prefers-reduced-motion.
 */

import { useEffect, useId, useRef } from "react";

const W = 1200;
const H = 700;

const HORIZON = 232;
const D_NEAR = 1;
const D_FAR = 22;
/** Chosen so depth D_NEAR projects exactly onto the bottom edge. */
const C = H - HORIZON;
/** Half-width at D_NEAR. The channel has banks, so it must not fill the frame. */
const HALF_W = 660;

const RIPPLES = 42;
/** Interior streamlines only; the two banks are drawn separately and heavier. */
const STREAMS = 5;
const STEPS = 44;
const SKY_LINES = 15;

/**
 * The river runs off to the right so the headline keeps clean paper. On a
 * narrow viewport the `slice` fit crops most of the width away, which would
 * take the sun off frame, so there the channel recentres.
 */
const VANISH_X_WIDE = W * 0.7;
const NEAR_X_WIDE = W * 0.5;
const VANISH_X_NARROW = W * 0.56;
const NEAR_X_NARROW = W * 0.44;

const MEANDER = 74;
/** Depth units per second. Water moves; it does not race. */
const FLOW = 0.85;

const SUN_R = 74;
const SUN_CY = HORIZON - 30;

const project = (d: number) => HORIZON + C / d;
const halfWidth = (d: number) => (HALF_W * D_NEAR) / d;

/**
 * The channel's centre at depth `d`. It swings from the vanishing point out
 * toward the viewer, so the river runs diagonally into the distance instead of
 * sitting square in the frame. Bends travel downstream, so the phase carries `t`.
 */
function centre(d: number, t: number, vanish: number, near: number): number {
  const nearness = (D_NEAR / d) ** 0.85;
  const base = vanish + (near - vanish) * nearness;
  return base + MEANDER * nearness * Math.sin(d * 0.34 + t * 0.5);
}

/** One transverse ripple, bank to bank, at depth `d`. */
function ripplePath(d: number, t: number, vanish: number, near: number): string {
  const y0 = project(d);
  const hw = halfWidth(d);
  const cx = centre(d, t, vanish, near);
  const nearness = D_NEAR / d;
  /* Amplitude and lift both wobble with depth. Without this every ripple is the
     same curve shifted down the frame, which reads as corduroy, not water. */
  const amp = 15 * nearness ** 1.15 * (0.62 + 0.55 * Math.sin(d * 1.73 + 0.8));
  const lift = 4 * nearness * Math.sin(d * 2.31);

  let out = "";
  for (let s = 0; s <= STEPS; s++) {
    const u = s / STEPS;
    const x = cx - hw + u * hw * 2;
    const y =
      y0 +
      lift +
      amp * Math.sin(u * 7.5 + d * 0.9 - t * 2.1) +
      amp * 0.4 * Math.sin(u * 15 - d * 1.4 + t * 1.3) +
      amp * 0.25 * Math.sin(u * 26 + d * 3.1 - t * 0.9);
    out += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return out;
}

/** A streamline from the horizon to the near edge, at lateral position `sx`. */
function streamPath(sx: number, t: number, vanish: number, near: number): string {
  let out = "";
  for (let s = 0; s <= STEPS; s++) {
    const u = s / STEPS;
    /* Sample evenly in 1/d so points spread evenly in screen space. */
    const inv = 1 / D_FAR + u * (1 / D_NEAR - 1 / D_FAR);
    const d = 1 / inv;
    const cx = centre(d, t, vanish, near);
    const nearness = D_NEAR / d;
    const x = cx + sx * halfWidth(d);
    const y = project(d) + 11 * nearness ** 1.15 * Math.sin(sx * 3 + d * 0.9 - t * 2.1);
    out += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return out;
}

export function RiverFlow({ className = "" }: { className?: string }) {
  const rippleRef = useRef<SVGGElement | null>(null);
  const glitterRef = useRef<SVGGElement | null>(null);
  const streamRef = useRef<SVGGElement | null>(null);
  const bankRef = useRef<SVGGElement | null>(null);
  const sunRef = useRef<SVGCircleElement | null>(null);
  const glitterShapeRef = useRef<SVGPolygonElement | null>(null);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const skyClip = `sky-${uid}`;
  const glitterClip = `glitter-${uid}`;

  useEffect(() => {
    const ripples = rippleRef.current;
    const glitter = glitterRef.current;
    const streams = streamRef.current;
    const banks = bankRef.current;
    const sun = sunRef.current;
    const glitterShape = glitterShapeRef.current;
    if (!ripples || !glitter || !streams || !banks) return;

    /* Scrolling pushes the current along rather than moving the camera, so the
       water never detaches from the page sitting on top of it. */
    let scrollBoost = 0;
    const onScroll = () => {
      scrollBoost = window.scrollY / 900;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let lastT = 0;
    const onResize = () => draw(lastT);
    window.addEventListener("resize", onResize, { passive: true });

    const draw = (t: number) => {
      const time = t + scrollBoost;
      const narrow = window.innerWidth < 900;
      const vanish = narrow ? VANISH_X_NARROW : VANISH_X_WIDE;
      const near0 = narrow ? NEAR_X_NARROW : NEAR_X_WIDE;

      /* The sun and its reflection are markup, so they are repositioned here
         rather than re-rendered. */
      sun?.setAttribute("cx", String(vanish));
      glitterShape?.setAttribute(
        "points",
        `${vanish - 18},${HORIZON} ${vanish + 18},${HORIZON} ${near0 + 132},${H} ${near0 - 132},${H}`,
      );

      for (let i = 0; i < RIPPLES; i++) {
        /* Step the phase in 1/d, not in d. Depth is projected as C/d, so evenly
           spaced depths would cake into a black band at the horizon; evenly
           spaced reciprocals give ripples that are evenly spaced on screen. */
        const phase = (i / RIPPLES + time * FLOW * 0.075) % 1;
        const inv = 1 / D_FAR + phase * (1 / D_NEAR - 1 / D_FAR);
        const d = 1 / inv;
        const path = ripplePath(d, time, vanish, near0);
        /* Fade in at the horizon so nothing pops into existence. */
        const near = phase;
        const fade = Math.min(1, phase * 5) ** 1.4;

        const line = ripples.children[i] as SVGPathElement | undefined;
        if (line) {
          line.setAttribute("d", path);
          line.setAttribute("opacity", (fade * (0.12 + 0.42 * near)).toFixed(3));
        }

        const glint = glitter.children[i] as SVGPathElement | undefined;
        if (glint) {
          glint.setAttribute("d", path);
          glint.setAttribute("opacity", (fade * (0.75 - 0.45 * near)).toFixed(3));
        }
      }

      for (let i = 0; i < STREAMS; i++) {
        /* Interior lines only, so they never sit on top of the banks. */
        const sx = -0.66 + (1.32 * i) / (STREAMS - 1);
        const el = streams.children[i] as SVGPathElement | undefined;
        if (el) el.setAttribute("d", streamPath(sx, time, vanish, near0));
      }

      for (let i = 0; i < 2; i++) {
        const el = banks.children[i] as SVGPathElement | undefined;
        if (el) el.setAttribute("d", streamPath(i === 0 ? -1 : 1, time, vanish, near0));
      }
    };

    draw(0);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    let raf = 0;
    let start = 0;
    let running = false;

    const loop = (now: number) => {
      if (!start) start = now - lastT * 1000;
      lastT = (now - start) / 1000;
      draw(lastT);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running) return;
      running = true;
      start = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    let onScreen = true;
    const sync = () => (onScreen && !document.hidden ? play() : stop());

    const svg = ripples.ownerSVGElement;
    let io: IntersectionObserver | undefined;
    if (svg && "IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      });
      io.observe(svg);
    } else {
      play();
    }
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Engraver's convention for a bright sky: horizontal hatching that tightens
     as it nears the horizon. Static, so it is plain markup. */
  const sky = Array.from({ length: SKY_LINES }, (_, j) => {
    const u = (j + 1) / SKY_LINES;
    const y = HORIZON - HORIZON * (1 - u) ** 1.6;
    return { y, opacity: 0.06 + 0.2 * u };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        {/* the sun is cut off by the waterline, so it reads as setting into it */}
        <clipPath id={skyClip}>
          <rect x="0" y="0" width={W} height={HORIZON} />
        </clipPath>
        {/* a reflection widens as it comes toward you, following the channel */}
        <clipPath id={glitterClip}>
          <polygon
            ref={glitterShapeRef}
            points={`${VANISH_X_WIDE - 18},${HORIZON} ${VANISH_X_WIDE + 18},${HORIZON} ${NEAR_X_WIDE + 132},${H} ${NEAR_X_WIDE - 132},${H}`}
          />
        </clipPath>
      </defs>

      <g clipPath={`url(#${skyClip})`}>
        <g stroke="currentColor" strokeWidth="1">
          {sky.map((l, i) => (
            <line key={i} x1="0" y1={l.y.toFixed(1)} x2={W} y2={l.y.toFixed(1)} opacity={l.opacity} />
          ))}
        </g>
        {/* the bindu at full size */}
        <circle ref={sunRef} cx={VANISH_X_WIDE} cy={SUN_CY} r={SUN_R} fill="var(--spot)" opacity="0.92" />
      </g>

      {/* the far bank, where water meets sky */}
      <line x1="0" y1={HORIZON} x2={W} y2={HORIZON} stroke="currentColor" strokeWidth="1.5" opacity="0.45" />

      {/* the banks, which is what makes it a river and not a plane */}
      <g ref={bankRef} stroke="currentColor" strokeWidth="1.3" opacity="0.34">
        <path />
        <path />
      </g>

      {/* a few interior streamlines, kept faint so it never reads as a grid */}
      <g ref={streamRef} stroke="currentColor" strokeWidth="1" opacity="0.1">
        {Array.from({ length: STREAMS }, (_, i) => (
          <path key={i} />
        ))}
      </g>

      {/* transverse ripples travelling toward the reader */}
      <g ref={rippleRef} stroke="currentColor" strokeWidth="1.15">
        {Array.from({ length: RIPPLES }, (_, i) => (
          <path key={i} />
        ))}
      </g>

      {/* the same ripples again, in the spot colour, cut to the glitter path */}
      <g ref={glitterRef} stroke="var(--spot)" strokeWidth="1.8" clipPath={`url(#${glitterClip})`}>
        {Array.from({ length: RIPPLES }, (_, i) => (
          <path key={i} />
        ))}
      </g>
    </svg>
  );
}
