"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BREATH, LIMB_ORDER, SITTING } from "@/lib/sitting-plan";
import { Band, Gauge, RiverHorizon, Seal } from "@/components/kit";
import { buttonClass } from "@/components/ui";
import { STILLNESS, STILLNESS_INK } from "@/lib/palette";
import type { FlowBand } from "@/lib/riverdata";
import {
  INITIAL,
  partNumber,
  progress,
  remaining,
  step,
  type Phase,
  type SittingState,
} from "@/lib/sitting-machine";
import type { todayContent } from "@/content/today";
import { keepThisMorning, type Kept } from "@/app/[lang]/(app)/today/actions";
import { track } from "@/lib/track";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The snan: five parts, three minutes, once a morning (spec 6.4).

   CALM, AND THE SAME FAMILY AS THE LANDING. The same capitals, the same
   river, the same press, spoken softly. The ready screen carries the band
   and the one press; from Begin on there is no selling at all, and no count
   of mornings. The full river sits at the foot of every part; the stillness
   gets the night river on near black.

   THE PRACTICE OWNS THE SCREEN. From the press of Begin to the done screen
   the sitting is a fixed sheet over the whole viewport: no masthead, no
   footer, nothing to tap but Next, the hold and a small cross in the corner.

   THE CLOCK IS A FRAME LOOP, NOT AN INTERVAL. `setInterval` drifts, and a
   browser throttles it hard in a background tab. This accumulates real
   elapsed time from `performance.now()` deltas, so it is accurate to the
   frame and immune to throttling.

   LEAVING PAUSES; IT NEVER RESTARTS. If the phone locks or a call arrives,
   the clock stops and resumes where it stopped.

   THE MACHINE LIVES IN src/lib/sitting-machine.ts, with no React in it:
   "next" leaves the reading, the breath and the stillness early, the hold
   ends when the thumb has held for its whole length, and the mark finishes
   on its own.

   THE BREATH IS THE RIVER. The waves' vertical scale rises for four seconds
   and falls for six (`breathe`), at the river's own amplitude: a thin river
   barely stirs, a river in spate swells. The motion is scrubbed by the
   sitting's own clock, so the water and the words never drift apart.

   THE MORNING IS MINTED AT THE START OF THE MARK, not at the end, so closing
   the tab while the line draws still leaves a Sankalp Patra. The mark's
   marigold press goes to the sheet's page, where the share sheet lives; the
   mark still moves on by itself after its twenty seconds.

   THE CROSS GOES WHEN THE MARK BEGINS. Until then leaving spends nothing.

   A MORNING WITH NO CREDIT BEHIND IT goes to the pack picker.

   HAPTICS where the browser has them (Android): a short pulse as the thumb
   lands on the hold and one as the mark completes.

   REDUCED MOTION is honoured throughout: the river stands still, the breath
   becomes two words, and the mark's line and seal simply appear.
   --------------------------------------------------------------------------- */

type Copy = (typeof todayContent)["en"];

type Reading = {
  water: string;
  ghat: string;
  city: string;
  /** The morning's percentile and band; null when the feed is quiet. */
  percentile: number | null;
  band: FlowBand | null;
  /** The exact figure and rank, "797 m³/s, 86th percentile since 1997". */
  figure: string;
  /** "3,880 km from you", or null when the request carried no coordinates. */
  distance: string | null;
};

/** How far the river swells on the breath: a thin river barely, one in spate most. */
const SWELL: Record<FlowBand, number> = { slack: 0.1, low: 0.15, usual: 0.2, full: 0.25, spate: 0.3 };

/** The river's height at the foot of a part, and in the breath its share of the screen. */
/* The stillness tones as custom properties, so the leave cross and Next can
   name them in classes and carry a press state on the dark ground. */
const STILL_VARS = {
  "--still-edge": STILLNESS_INK.edge,
  "--still-dim": STILLNESS_INK.dim,
  "--still-line": STILLNESS_INK.line,
} as React.CSSProperties;

const FOOT = 150;
const BREATH_SHARE = 0.5;

function pulse(ms: number) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* not every browser has it, and none of them should complain */
  }
}

/** The capitals headline in the landing's cut. Devanagari takes its own leading and no case. */
function caps(lang: Lang): { className: string; style: React.CSSProperties } {
  const hi = lang === "hi";
  return {
    className: `display ${hi ? "" : "uppercase"}`,
    style: { fontWeight: 800, lineHeight: hi ? 1.22 : 0.95, letterSpacing: hi ? 0 : "-0.01em" },
  };
}

export function Sitting({
  lang,
  t,
  reading,
  sankalp,
  names,
  waterSlug,
  outHref,
  leaveHref,
  reducedMotionDefault = false,
  speed = 1,
  start,
  keep = keepThisMorning,
}: {
  lang: Lang;
  t: Copy;
  reading: Reading;
  sankalp: string;
  names: string[];
  /** One of six, and the only thing measurement is told about a morning. */
  waterSlug: string;
  /** The pack picker's "your mornings are complete" line, for a refused spend. */
  outHref: string;
  /** Where the corner cross goes. Leaving before the mark spends nothing. */
  leaveHref: string;
  reducedMotionDefault?: boolean;
  /**
   * How many times faster than real time the clock runs. Always 1 in
   * production; the page refuses to pass anything else there. 0 stops the
   * clock, for a still picture of one part.
   */
  speed?: number;
  /** Where the machine starts, for tests and still pictures. /today never passes it. */
  start?: SittingState;
  /** How the morning is kept. /today uses the server action; a fixture passes its own. */
  keep?: (lang: Lang) => Promise<Kept>;
}) {
  const router = useRouter();

  /* One reducer holds the phase, the seconds into it and the held seconds,
     and every change to them goes through `step`. */
  const [state, dispatch] = useReducer(step, start ?? INITIAL);
  const [outcome, setOutcome] = useReducer(
    (
      was: { patraId: string | null; morning: number | null; failed: boolean },
      next: Partial<{ patraId: string | null; morning: number | null; failed: boolean }>,
    ) => ({ ...was, ...next }),
    { patraId: null, morning: null, failed: false },
  );
  const { phase, into, held } = state;
  const { patraId, morning, failed } = outcome;
  const running = phase !== "ready" && phase !== "done";
  const holding = useRef(false);
  const minted = useRef(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const [screen, setScreen] = useState(844);

  const reduced =
    reducedMotionDefault ||
    (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  /* --- the clock -------------------------------------------------------- */
  useEffect(() => {
    if (!running || speed === 0) return;

    let frame = 0;
    let last = performance.now();
    let stopped = false;

    const tick = (now: number) => {
      if (stopped) return;
      const delta = ((now - last) / 1000) * speed;
      last = now;

      dispatch({ type: "tick", delta, holding: holding.current });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    /* A locked phone or a switched tab stops the clock rather than letting it
       run on without the person. `last` is reset on return so the gap is not
       counted as elapsed time. */
    const onVisibility = () => {
      if (document.visibilityState === "visible") last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [running, speed]);

  /* --- the screen stays awake ------------------------------------------- */
  useEffect(() => {
    if (!running) return;

    let released = false;

    const take = async () => {
      try {
        wakeLock.current = await navigator.wakeLock?.request("screen");
      } catch {
        /* Unsupported, or refused because the battery is low. The sitting
           works either way; the screen may simply dim. */
      }
    };

    void take();

    const reacquire = () => {
      if (document.visibilityState === "visible" && !released) void take();
    };
    document.addEventListener("visibilitychange", reacquire);

    return () => {
      released = true;
      document.removeEventListener("visibilitychange", reacquire);
      void wakeLock.current?.release().catch(() => {});
      wakeLock.current = null;
    };
  }, [running]);

  /* --- the sheet over the page: the body must not scroll under it, and the
         breath's river is half of whatever screen this is ------------------ */
  useEffect(() => {
    if (!running) return;
    const was = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const measure = () => setScreen(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => {
      document.body.style.overflow = was;
      window.removeEventListener("resize", measure);
    };
  }, [running]);

  /* --- the morning is written as the mark begins ------------------------ */
  useEffect(() => {
    if (phase !== "mark" || minted.current) return;
    minted.current = true;

    keep(lang)
      .then((result) => {
        if (result.id) {
          setOutcome({ patraId: result.id, morning: result.morning ?? null });
          track("sitting_done", { water: waterSlug, lang });
          pulse(12);
        } else if (result.reason === "no-credit") router.push(outHref);
        else setOutcome({ failed: true });
      })
      .catch(() => setOutcome({ failed: true }));
  }, [phase, lang, waterSlug, router, outHref, keep]);

  /* --- and the page moves on once both are finished --------------------- */
  const patraHref = patraId ? `${lang === "en" ? "" : `/${lang}`}/p/${patraId}?new=1` : null;

  useEffect(() => {
    if (phase !== "done" || !patraHref) return;
    router.push(patraHref);
  }, [phase, patraHref, router]);

  const hold = useCallback((down: boolean) => {
    if (down && !holding.current) pulse(8);
    holding.current = down;
  }, []);

  const next = useCallback(() => {
    track("sitting_next", { water: waterSlug, lang, from: phase });
    dispatch({ type: "next" });
  }, [phase, waterSlug, lang]);

  const head = caps(lang);

  /* --- before it begins: in the flow of the page, under the masthead ------ */
  if (phase === "ready") {
    const [lead, tail] = t.begin.ready.split("{river}");
    return (
      <div className="mx-auto max-w-md overflow-x-clip px-5 pt-8 pb-10 sm:pt-12" data-sitting data-speed={speed} data-phase={phase}>
        <h1 className={`${head.className} text-[2.35rem] min-[380px]:text-[2.5rem]`} style={head.style}>
          {lead}
          <span className="text-sindoor">{reading.water}</span>
          {tail}
        </h1>
        <p className="mt-3 text-[0.875rem] leading-[1.45] text-ink2">
          {reading.ghat}, {reading.city}
        </p>
        {/* How far the water is from here, when the request carried a fix. */}
        {reading.distance && <p className="text-[0.875rem] leading-[1.45] text-ink2">{reading.distance}</p>}

        <Band className="mt-5">{t.begin.band}</Band>

        <RiverHorizon height={120} className="mt-8" />

        <button
          type="button"
          onClick={() => {
            track("sitting_start", { water: waterSlug, lang });
            dispatch({ type: "start" });
          }}
          className={buttonClass("solid", "mt-6 w-full")}
        >
          <span>{t.begin.cta}</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  /* --- the sheet: every part from here on fills the screen ---------------- */
  const stillness = phase === "stillness";
  const breathing = phase === "breath";
  const skippable = phase === "reading" || breathing || stillness;
  const swell = SWELL[reading.band ?? "usual"];
  const riverHeight = breathing ? Math.round(screen * BREATH_SHARE) : FOOT;

  return (
    <div
      className={`sheet-in fixed inset-0 z-50 flex flex-col ${stillness ? "" : "bg-paper text-ink"}`}
      style={stillness ? { backgroundColor: STILLNESS, color: STILLNESS_INK.mute } : undefined}
      data-sitting
      data-speed={speed}
      data-phase={phase}
    >
      <div
        className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-5"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        {/* The bar and the cross. In the stillness they take their own dim
            tones: the day's ink vanishes on the dark ground. */}
        <div className="flex items-start gap-4">
          <div className="flex-1 pt-4">
            <StoryBar t={t} state={state} dark={stillness} />
            {/* The name of the part, in the small voice. */}
            <p className={`mt-3 text-sm ${stillness ? "" : "text-ink2"}`} style={stillness ? { color: STILLNESS_INK.dim } : undefined}>
              {labelFor(t, phase)}
            </p>
          </div>
          {phase !== "done" && phase !== "mark" && (
            <Link
              href={leaveHref}
              aria-label={t.leave}
              title={t.leave}
              className={`grid h-11 w-11 shrink-0 place-items-center border-[1.5px] ${
                stillness
                  ? "border-[var(--still-edge)] text-[var(--still-dim)] active:bg-[var(--still-edge)] active:text-[var(--still-line)]"
                  : "border-ink text-ink active:bg-ink active:text-paper"
              }`}
              style={stillness ? STILL_VARS : undefined}
              data-leave
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </Link>
          )}
        </div>

        <div className={`flex flex-1 flex-col ${breathing ? "justify-end pb-6" : "justify-center pb-6"}`}>
          {phase === "reading" && (
            <div className="pull">
              <p className={`${head.className} text-[2.5rem] text-sindoor`} style={head.style}>
                {reading.water}
              </p>
              <p className="mt-2 text-[0.875rem] text-ink2">
                {reading.ghat}, {reading.city}
              </p>
              {/* How the river is running, in words, then the strip, then the
                  figure that proves it, small, for anyone who wants to check. */}
              <Gauge
                className="mt-7"
                percentile={reading.percentile}
                band={reading.band}
                lang={lang}
                figure={reading.figure}
              />
            </div>
          )}

          {breathing && <BreathWords t={t} into={into} lang={lang} />}

          {phase === "hold" && <HoldScreen t={t} sankalp={sankalp} names={names} held={held} onHold={hold} />}

          {stillness && (
            <div className="pull flex flex-col items-center text-center">
              <p className="display text-[1.6rem] leading-[1.3]" style={{ color: STILLNESS_INK.line }}>
                {t.stillness.line}
              </p>
              <p
                className="display tabular mt-6 text-[3.6rem] leading-none"
                style={{ color: STILLNESS_INK.dim }}
                aria-live="off"
                data-remaining={remaining(state)}
              >
                <Tick value={remaining(state)} />
              </p>
              <p className="mt-4 text-sm" style={{ color: STILLNESS_INK.dim }}>
                {t.stillness.note}
              </p>
            </div>
          )}

          {(phase === "mark" || phase === "done") && (
            <div className="pull">
              <div className="flex items-start justify-between gap-4">
                <p className={`${head.className} text-[2.35rem]`} style={head.style}>
                  {failed ? t.failed.title : t.mark.done}
                </p>
                {!failed && morning !== null && (
                  <Seal kind="morning" n={morning} lang={lang} stamp={phase === "mark" && !reduced} className="-mt-1" />
                )}
              </div>
              {failed ? (
                <p className="mt-4 text-ink2">{t.failed.body}</p>
              ) : (
                <MarkLine reduced={reduced || phase === "done"} into={into} />
              )}

              {failed && phase === "done" && (
                <button
                  type="button"
                  onClick={() => {
                    minted.current = false;
                    setOutcome({ failed: false, patraId: null, morning: null });
                    dispatch({ type: "retry" });
                  }}
                  className={buttonClass("solid", "mt-8 w-full")}
                >
                  <span>{t.failed.cta}</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}

              {/* The sheet's page holds the share sheet. The page moves on by
                  itself after the mark; this lets the person go sooner. */}
              {!failed && patraHref && (
                <>
                  <p className="mt-8 text-[0.9375rem] leading-[1.45] text-ink2">{t.mark.after}</p>
                  <Link href={patraHref} className={buttonClass("share", "mt-3 w-full")} data-share>
                    <span>{t.mark.cta}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Next, quiet, at the foot where the thumb is: on the parts that
            may be left early. It stands clear of the sun on the horizon. */}
        {skippable && (
          <div className="flex justify-end pb-10">
            <button
              type="button"
              onClick={next}
              className={
                stillness
                  ? "inline-flex min-h-[44px] items-center px-2 font-bold text-[var(--still-dim)] active:bg-[var(--still-edge)] active:text-[var(--still-line)]"
                  : buttonClass("quiet", "px-2")
              }
              style={stillness ? STILL_VARS : undefined}
              data-next
            >
              {t.next}
            </button>
          </div>
        )}
      </div>

      {/* The river at the foot of every part; in the breath it takes half
          the screen and breathes; in the stillness it is the night river. */}
      <div
        className="shrink-0"
        style={
          breathing
            ? ({
                "--breathe-low": (1 - swell).toFixed(2),
                "--breathe-high": (1 + swell).toFixed(2),
                "--breathe-at": (into % (BREATH.in + BREATH.out)).toFixed(2),
                "--breathe-play": "paused",
              } as React.CSSProperties)
            : undefined
        }
      >
        <RiverHorizon
          height={riverHeight}
          night={stillness}
          breathe={breathing}
          className="w-full"
        />
        <div style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
    </div>
  );
}

/**
 * Five segments for the five parts, filling left to right, the way a story
 * bar does. The hold's segment fills with the thumb rather than the clock.
 * Widths are rounded numbers from the machine, so the server and the browser
 * print the same markup.
 */
function StoryBar({ t, state, dark = false }: { t: Copy; state: SittingState; dark?: boolean }) {
  const fills = progress(state);
  const n = partNumber(state.phase);
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={LIMB_ORDER.length}
      aria-valuenow={n}
      aria-valuetext={t.partOf.replace("{n}", String(n)).replace("{total}", String(LIMB_ORDER.length))}
      className="flex gap-1.5"
      data-story-bar
    >
      {LIMB_ORDER.map((limb, i) => (
        <div
          key={limb}
          className={`h-[3px] flex-1 ${dark ? "" : "bg-rule"}`}
          style={dark ? { backgroundColor: STILLNESS_INK.track } : undefined}
          data-segment={limb}
        >
          <div
            className={`h-full ${dark ? "" : "bg-ink"}`}
            style={{ width: `${(fills[i] * 100).toFixed(1)}%`, ...(dark ? { backgroundColor: STILLNESS_INK.dim } : {}) }}
          />
        </div>
      ))}
    </div>
  );
}

/** The heading over each part. "hold" is the sankalp's key; "done" has none. */
function labelFor(t: Copy, phase: Phase): string {
  switch (phase) {
    case "reading":
      return t.reading.label;
    case "breath":
      return t.breath.label;
    case "hold":
      return t.vow.label;
    case "stillness":
      return t.stillness.label;
    case "mark":
    case "done":
    default:
      return t.mark.label;
  }
}

/**
 * "In" and "Out" over the river, in capitals, Out in teal. The two words
 * cross-fade on the sitting's clock, four seconds in and six out, the same
 * clock that scrubs the river's swell.
 */
function BreathWords({ t, into, lang }: { t: Copy; into: number; lang: Lang }) {
  const rising = into % (BREATH.in + BREATH.out) < BREATH.in;
  const head = caps(lang);
  return (
    <div className="pull relative h-[3.4rem] text-center">
      <p
        className={`${head.className} settle absolute inset-x-0 text-[3.2rem] ${rising ? "opacity-100" : "opacity-0"}`}
        style={head.style}
        aria-hidden={!rising}
      >
        {t.breath.in}
      </p>
      <p
        className={`${head.className} settle absolute inset-x-0 text-[3.2rem] text-teal ${rising ? "opacity-0" : "opacity-100"}`}
        style={head.style}
        aria-hidden={rising}
      >
        {t.breath.out}
      </p>
    </div>
  );
}

/**
 * A number that arrives: each new value fades and settles in, so a counter
 * reads as a clock ticking rather than a label changing.
 */
function Tick({ value }: { value: number }) {
  return (
    <span key={value} className="tick inline-block">
      {value}
    </span>
  );
}

/**
 * The sankalp: the household's names, the person's own words, and the hold.
 * The hold is the press (spec 5.1) with a paper face: the thumb sinks it,
 * and sindoor fills it left to right over the hold's eleven seconds. It
 * drains the moment the thumb lifts. The white words are the ink words
 * clipped to the fill, so they read on both grounds.
 */
function HoldScreen({
  t,
  sankalp,
  names,
  held,
  onHold,
}: {
  t: Copy;
  sankalp: string;
  names: string[];
  held: number;
  onHold: (down: boolean) => void;
}) {
  const filled = Math.min(held / SITTING.hold, 1);
  const pressing = held > 0;
  const words = filled >= 1 ? t.vow.done : pressing ? t.vow.holding : t.vow.hold;

  return (
    <div className="pull">
      <p className="text-[0.8125rem] leading-[1.45] text-ink2">{names.join(", ")}</p>
      <p className="display mt-3 text-[1.6rem] leading-[1.3]" style={{ fontWeight: 700 }}>
        {sankalp}
      </p>

      {/* A div with a button's role, not a <button>: Chrome wraps a button's
          children in an anonymous box, and the fill resolved against it. */}
      <div
        role="button"
        tabIndex={0}
        onPointerDown={() => onHold(true)}
        onPointerUp={() => onHold(false)}
        onPointerCancel={() => onHold(false)}
        onPointerLeave={() => onHold(false)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onHold(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === " " || e.key === "Enter") onHold(false);
        }}
        onContextMenu={(e) => e.preventDefault()}
        className={buttonClass("solid", "mt-8 flex w-full touch-none justify-center overflow-hidden text-center")}
        style={{
          backgroundColor: "var(--paper)",
          color: "var(--ink)",
          ...(pressing ? { transform: "translate(6px, 6px)", boxShadow: "none" } : {}),
        }}
        data-holding={pressing ? "1" : undefined}
        aria-label={t.vow.hold}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-sindoor"
          style={{ transform: `scaleX(${filled.toFixed(3)})`, transformOrigin: "0 50%" }}
          data-ink
        />
        <span className="relative">{words}</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-white"
          style={{ clipPath: `inset(0 ${((1 - filled) * 100).toFixed(2)}% 0 0)` }}
        >
          {words}
        </span>
      </div>
    </div>
  );
}

/** One ink line, writing itself across the mark's twenty seconds. */
function MarkLine({ reduced, into }: { reduced: boolean; into: number }) {
  const width = reduced ? 1 : Math.min(into / SITTING.mark, 1);
  return (
    <div className="mt-5 h-[2px] w-full" aria-hidden="true" data-mark-line>
      <div className="h-full bg-ink" style={{ transform: `scaleX(${width.toFixed(3)})`, transformOrigin: "0 50%" }} />
    </div>
  );
}
