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
 * THE VIEWBOX IS THE ELEMENT, IN CSS PIXELS. This used to be a fixed 1200x700
 * viewBox fitted with `preserveAspectRatio="slice"`, which meant the horizon
 * landed wherever the crop happened to put it: on a 1440x900 desktop it cut
 * straight through the headline, and on a phone the whole channel was cropped
 * down to a symmetric wedge with no perspective left in it. Now the viewBox is
 * set from the measured box each frame and every distance below is derived from
 * that width and height, so the composition is stated rather than inherited
 * from a crop.
 *
 * TWO VARIANTS, because a 1440x600 band and a 390x300 band are not the same
 * picture. `panorama` keeps a narrow channel far to the right so the headline
 * and lede sit on clean paper. `portrait` swings the vanishing point hard right
 * and the near edge hard left, which is what puts perspective back into a box
 * that is nearly as tall as it is wide.
 *
 * THE HORIZON IS ANCHORED, NOT GUESSED. `anchorSelector` names an element whose
 * bottom edge the waterline sits under, so the masthead and headline are always
 * above the horizon whatever the viewport does and however the headline wraps.
 * That last part is load bearing: the same headline is four words in English,
 * three in Hindi and wraps differently again in Tamil and Bengali.
 *
 * Architecture follows the terrain motif in trainingzones: each frame the paths
 * are recomputed and written straight to the `d` attribute through a group ref,
 * bypassing React reconciliation, so ~90 paths animate with no re-render. It
 * pauses off screen and in background tabs, and paints a single static frame
 * under prefers-reduced-motion.
 */

import { useEffect, useId, useRef } from "react";

/** Depth range of the channel, in arbitrary units. Screen y is horizon + C/d. */
const D_NEAR = 1;
const D_FAR = 22;

const RIPPLES = 42;
/** Interior streamlines only; the two banks are drawn separately and heavier. */
const STREAMS = 5;
const STEPS = 44;

/** Depth units per second. Water moves; it does not race. */
const FLOW = 0.34;

export type RiverVariant = "panorama" | "portrait";

/**
 * Everything that differs between a wide band behind type and a tall band
 * standing on its own. All lengths are fractions of the element's own width or
 * height, so a value here means the same thing at 390px and at 2560px.
 */
type Tuning = {
  /** Waterline position as a fraction of height, when there is no anchor. */
  horizon: number;
  /** Clamp for the anchored waterline, so a long headline cannot drown it. */
  horizonMin: number;
  horizonMax: number;
  /** Gap under the anchor element before the waterline. */
  anchorGap: number;
  /** Vanishing point and near-edge centre, as fractions of width. The distance
   *  between them is the diagonal, and the diagonal is the perspective. */
  vanishX: number;
  nearX: number;
  /** Channel half-width at the near edge, as a fraction of width. */
  halfW: number;
  /** How far the channel wanders off its axis, as a fraction of width. */
  meander: number;
  sunR: number;
  /** How far the sun sits above the waterline, as a fraction of its radius. */
  sunLift: number;
  /** Width of the reflection where it meets the horizon and the near edge. */
  glitterFar: number;
  glitterNear: number;
};

const TUNING: Record<RiverVariant, Tuning> = {
  /* Wide, and there is type on top of it. The channel is kept narrow and far
     right so the left column stays clean paper, and the waterline is anchored
     under the headline rule rather than through the headline itself. */
  panorama: {
    horizon: 0.5,
    horizonMin: 0.3,
    horizonMax: 0.66,
    anchorGap: 18,
    vanishX: 0.7,
    nearX: 0.5,
    halfW: 0.55,
    meander: 0.062,
    sunR: 0.062,
    sunLift: 0.4,
    glitterFar: 0.015,
    glitterNear: 0.11,
  },
  /* Tall and narrow, standing alone under the headline with nothing over it.
     The vanishing point goes hard right and the near edge hard left: that swing
     is the only thing that reads as depth in a box this shape, and without it
     the channel collapses into the symmetric wedge this replaced. */
  portrait: {
    horizon: 0.26,
    horizonMin: 0.2,
    horizonMax: 0.34,
    anchorGap: 12,
    vanishX: 0.78,
    nearX: 0.2,
    halfW: 0.78,
    meander: 0.05,
    /* Small enough that the whole dome clears the band's top edge: the sky is
       only `horizon` tall here, and a sun taller than it gets squared off. */
    sunR: 0.1,
    sunLift: 0.3,
    glitterFar: 0.03,
    glitterNear: 0.3,
  },
};

/** Resolved pixel geometry for one frame. */
type Geometry = {
  w: number;
  h: number;
  horizon: number;
  /** Projection constant: depth D_NEAR lands exactly on the bottom edge. */
  c: number;
  vanish: number;
  near: number;
  halfW: number;
  meander: number;
};

const project = (g: Geometry, d: number) => g.horizon + g.c / d;
const halfWidth = (g: Geometry, d: number) => (g.halfW * D_NEAR) / d;

/**
 * The channel's centre at depth `d`. It swings from the vanishing point out
 * toward the viewer, so the river runs diagonally into the distance instead of
 * sitting square in the frame. Bends travel downstream, so the phase carries `t`.
 */
function centre(g: Geometry, d: number, t: number): number {
  const nearness = (D_NEAR / d) ** 0.85;
  const base = g.vanish + (g.near - g.vanish) * nearness;
  return base + g.meander * nearness * Math.sin(d * 0.34 + t * 0.2);
}

/** One transverse ripple, bank to bank, at depth `d`. */
function ripplePath(g: Geometry, d: number, t: number): string {
  const y0 = project(g, d);
  const hw = halfWidth(g, d);
  const cx = centre(g, d, t);
  const nearness = D_NEAR / d;
  /* Amplitude and lift both wobble with depth. Without this every ripple is the
     same curve shifted down the frame, which reads as corduroy, not water.
     Both scale with the frame so a phone gets the same picture, not a
     magnified detail of it. */
  const unit = g.h / 700;
  const amp = 15 * unit * nearness ** 1.15 * (0.62 + 0.55 * Math.sin(d * 1.73 + 0.8));
  const lift = 4 * unit * nearness * Math.sin(d * 2.31);

  let out = "";
  for (let s = 0; s <= STEPS; s++) {
    const u = s / STEPS;
    const x = cx - hw + u * hw * 2;
    const y =
      y0 +
      lift +
      amp * Math.sin(u * 7.5 + d * 0.9 - t * 0.85) +
      amp * 0.4 * Math.sin(u * 15 - d * 1.4 + t * 0.55) +
      amp * 0.25 * Math.sin(u * 26 + d * 3.1 - t * 0.38);
    out += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return out;
}

/** A streamline from the horizon to the near edge, at lateral position `sx`. */
function streamPath(g: Geometry, sx: number, t: number): string {
  const unit = g.h / 700;
  let out = "";
  for (let s = 0; s <= STEPS; s++) {
    const u = s / STEPS;
    /* Sample evenly in 1/d so points spread evenly in screen space. */
    const inv = 1 / D_FAR + u * (1 / D_NEAR - 1 / D_FAR);
    const d = 1 / inv;
    const cx = centre(g, d, t);
    const nearness = D_NEAR / d;
    const x = cx + sx * halfWidth(g, d);
    const y = project(g, d) + 11 * unit * nearness ** 1.15 * Math.sin(sx * 3 + d * 0.9 - t * 0.85);
    out += `${s === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return out;
}

export function RiverFlow({
  className = "",
  variant = "panorama",
  anchorSelector,
}: {
  className?: string;
  variant?: RiverVariant;
  /**
   * CSS selector for the element the waterline must clear. A selector rather
   * than a ref because this is rendered from a server component, and a ref is
   * not serialisable across that boundary.
   */
  anchorSelector?: string;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rippleRef = useRef<SVGGElement | null>(null);
  const glitterRef = useRef<SVGGElement | null>(null);
  const streamRef = useRef<SVGGElement | null>(null);
  const bankRef = useRef<SVGGElement | null>(null);
  const sunRef = useRef<SVGCircleElement | null>(null);
  const skyRectRef = useRef<SVGRectElement | null>(null);
  const horizonRef = useRef<SVGLineElement | null>(null);
  const glitterShapeRef = useRef<SVGPolygonElement | null>(null);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const skyClip = `sky-${uid}`;
  const glitterClip = `glitter-${uid}`;

  useEffect(() => {
    const svg = svgRef.current;
    const ripples = rippleRef.current;
    const glitter = glitterRef.current;
    const streams = streamRef.current;
    const banks = bankRef.current;
    const sun = sunRef.current;
    const skyRect = skyRectRef.current;
    const horizonLine = horizonRef.current;
    const glitterShape = glitterShapeRef.current;
    if (!svg || !ripples || !glitter || !streams || !banks) return;

    const tune = TUNING[variant];

    /* Scrolling pushes the current along rather than moving the camera, so the
       water never detaches from the page sitting on top of it. */
    let scrollBoost = 0;
    const onScroll = () => {
      scrollBoost = window.scrollY / 900;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /**
     * Resolve the frame's pixel geometry. Reads layout, so it is called once
     * per frame at most and its result is threaded through the path builders.
     */
    function geometry(): Geometry | null {
      const box = svg!.getBoundingClientRect();
      const w = box.width;
      const h = box.height;
      if (w < 2 || h < 2) return null;

      let horizon = tune.horizon * h;
      if (anchorSelector) {
        const anchor = document.querySelector(anchorSelector);
        if (anchor) {
          const a = anchor.getBoundingClientRect();
          /* Only meaningful once the anchor has been laid out; a zero-height
             box means fonts are still swapping and the fraction is safer. */
          if (a.height > 0) horizon = a.bottom - box.top + tune.anchorGap;
        }
      }
      horizon = Math.min(Math.max(horizon, tune.horizonMin * h), tune.horizonMax * h);

      return {
        w,
        h,
        horizon,
        c: h - horizon,
        vanish: tune.vanishX * w,
        near: tune.nearX * w,
        halfW: tune.halfW * w,
        meander: tune.meander * w,
      };
    }

    let lastT = 0;

    const draw = (t: number) => {
      const g = geometry();
      if (!g) return;
      const time = t + scrollBoost;

      /* One CSS pixel is one user unit, which is what makes every fraction in
         TUNING mean what it says. */
      svg!.setAttribute("viewBox", `0 0 ${g.w.toFixed(1)} ${g.h.toFixed(1)}`);

      /* The dome is clipped at the waterline, so it must also fit under the
         top edge or it comes out squared off. `horizon / (1 + sunLift)` is the
         radius at which its top exactly touches y=0. */
      const sunR = Math.min(tune.sunR * g.w, (g.horizon / (1 + tune.sunLift)) * 0.94);
      skyRect?.setAttribute("width", g.w.toFixed(1));
      skyRect?.setAttribute("height", g.horizon.toFixed(1));
      sun?.setAttribute("cx", g.vanish.toFixed(1));
      sun?.setAttribute("cy", (g.horizon - sunR * tune.sunLift).toFixed(1));
      sun?.setAttribute("r", sunR.toFixed(1));

      /* Line weights are in CSS pixels now that the viewBox is, so they have to
         be scaled by hand or a tall desktop band would engrave the same
         hairline a 250px phone band does and read washed out. Never below 1,
         because a sub-pixel stroke on a phone is a grey smudge. */
      const pen = Math.max(1, g.h / 620);
      ripples!.setAttribute("stroke-width", (1.15 * pen).toFixed(2));
      glitter!.setAttribute("stroke-width", (1.8 * pen).toFixed(2));
      streams!.setAttribute("stroke-width", pen.toFixed(2));
      banks!.setAttribute("stroke-width", (1.3 * pen).toFixed(2));
      horizonLine?.setAttribute("stroke-width", (1.5 * pen).toFixed(2));

      horizonLine?.setAttribute("x2", g.w.toFixed(1));
      horizonLine?.setAttribute("y1", g.horizon.toFixed(1));
      horizonLine?.setAttribute("y2", g.horizon.toFixed(1));

      /* A reflection widens as it comes toward you, following the channel. */
      const gf = tune.glitterFar * g.w;
      const gn = tune.glitterNear * g.w;
      glitterShape?.setAttribute(
        "points",
        `${(g.vanish - gf).toFixed(1)},${g.horizon.toFixed(1)} ` +
          `${(g.vanish + gf).toFixed(1)},${g.horizon.toFixed(1)} ` +
          `${(g.near + gn).toFixed(1)},${g.h.toFixed(1)} ` +
          `${(g.near - gn).toFixed(1)},${g.h.toFixed(1)}`,
      );

      for (let i = 0; i < RIPPLES; i++) {
        /* Step the phase in 1/d, not in d. Depth is projected as C/d, so evenly
           spaced depths would cake into a black band at the horizon; evenly
           spaced reciprocals give ripples that are evenly spaced on screen. */
        const phase = (i / RIPPLES + time * FLOW * 0.045) % 1;
        const inv = 1 / D_FAR + phase * (1 / D_NEAR - 1 / D_FAR);
        const d = 1 / inv;
        const path = ripplePath(g, d, time);
        /* Fade in at the horizon so nothing pops into existence. */
        const fade = Math.min(1, phase * 5) ** 1.4;

        const line = ripples!.children[i] as SVGPathElement | undefined;
        if (line) {
          line.setAttribute("d", path);
          line.setAttribute("opacity", (fade * (0.12 + 0.42 * phase)).toFixed(3));
        }

        const glint = glitter!.children[i] as SVGPathElement | undefined;
        if (glint) {
          glint.setAttribute("d", path);
          glint.setAttribute("opacity", (fade * (0.75 - 0.45 * phase)).toFixed(3));
        }
      }

      for (let i = 0; i < STREAMS; i++) {
        /* Interior lines only, so they never sit on top of the banks. */
        const sx = -0.66 + (1.32 * i) / (STREAMS - 1);
        const el = streams!.children[i] as SVGPathElement | undefined;
        if (el) el.setAttribute("d", streamPath(g, sx, time));
      }

      for (let i = 0; i < 2; i++) {
        const el = banks!.children[i] as SVGPathElement | undefined;
        if (el) el.setAttribute("d", streamPath(g, i === 0 ? -1 : 1, time));
      }
    };

    draw(0);

    /* The anchored waterline moves when the headline rewraps, which happens on
       resize and again when the webfont swaps in. Both are watched. */
    const redraw = () => draw(lastT);
    window.addEventListener("resize", redraw, { passive: true });
    const ro = new ResizeObserver(redraw);
    ro.observe(svg);
    const anchorEl = anchorSelector ? document.querySelector(anchorSelector) : null;
    if (anchorEl) ro.observe(anchorEl);
    document.fonts?.ready.then(redraw).catch(() => {});

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return () => {
        ro.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", redraw);
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

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      /* A `display:none` variant reports zero intersection, so the breakpoint
         that is not showing costs nothing beyond its markup. */
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
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", redraw);
    };
  }, [variant, anchorSelector]);

  return (
    <svg
      ref={svgRef}
      /* Replaced on the first frame with the element's own pixel box. This
         placeholder only has to be parseable before that. */
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <defs>
        {/* the sun is cut off by the waterline, so it reads as setting into it */}
        <clipPath id={skyClip}>
          <rect ref={skyRectRef} x="0" y="0" width="1200" height="232" />
        </clipPath>
        {/* a reflection widens as it comes toward you, following the channel */}
        <clipPath id={glitterClip}>
          <polygon ref={glitterShapeRef} points="0,0 0,0 0,0 0,0" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${skyClip})`}>
        {/* the bindu at full size */}
        <circle ref={sunRef} cx="0" cy="0" r="0" fill="var(--spot)" opacity="0.92" />
      </g>

      {/* the far bank, where water meets sky */}
      <line
        ref={horizonRef}
        x1="0"
        y1="0"
        x2="0"
        y2="0"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.45"
      />

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
