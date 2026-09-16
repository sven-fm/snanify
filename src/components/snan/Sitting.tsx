"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LIMB_ORDER, SITTING } from "@/lib/sitting-plan";
import { WaterBand } from "@/components/WaterBand";
import {
  INITIAL,
  STILLNESS_NOTE_SECONDS,
  partNumber,
  progress,
  remaining,
  step,
  type Phase,
} from "@/lib/sitting-machine";
import type { todayContent } from "@/content/today";
import { keepThisMorning } from "@/app/[lang]/(app)/today/actions";
import { track } from "@/lib/track";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitting: five parts, three minutes, once a morning.

   THE PRACTICE OWNS THE SCREEN. From the press of Begin to the done screen
   the sitting is a fixed sheet over the whole viewport: no masthead, no
   footer, no count of mornings, nothing to tap but Next, the vow and a small
   cross in the corner. The stillness was the first part to take the whole
   screen; every part does now. Behind each part the engraved water runs,
   faint, so a screen with three lines of type on it still reads as alive.

   THE CLOCK IS A FRAME LOOP, NOT AN INTERVAL. `setInterval` drifts, and a
   browser throttles it hard in a background tab, which for a sixty second
   stillness means the screen comes back minutes late. This accumulates real
   elapsed time from `performance.now()` deltas, so it is accurate to the frame
   and immune to throttling.

   LEAVING PAUSES; IT NEVER RESTARTS. If the phone locks or a call arrives, the
   clock stops and resumes where it stopped. Somebody who put the phone down
   during the stillness, which is the instruction, must not come back to find
   the morning abandoned.

   THE MACHINE LIVES IN src/lib/sitting-machine.ts, with no React in it, so
   the rules can be tested to the second: "next" leaves the reading, the
   breath and the stillness early, the vow ends when the thumb has held for
   its whole length, and the mark finishes on its own.

   THE BREATH IS WATER. The engraved band rises for four seconds and falls for
   six, at the river's own amplitude, its lines closing as it rises and
   opening as it falls. It used to be a flat rectangle at fourteen percent.

   THE MORNING IS MINTED AT THE START OF THE MARK, not at the end. The row and
   the credit are written the moment the mark begins, so closing the tab while
   the line draws still leaves a Sankalp Patra. The animation is twenty seconds
   of drawing over work that has already been done.

   HAPTICS where the browser has them (Android): a short pulse as the thumb
   lands on the vow and one as the mark completes. iOS has none and gets none.

   REDUCED MOTION is honoured throughout: the breath becomes two words and a
   still band, and the mark stops drawing and simply appears.
   --------------------------------------------------------------------------- */

type Copy = (typeof todayContent)["en"];

type Reading = {
  water: string;
  ghat: string;
  city: string;
  flow: string;
  rank: string | null;
  normal: string;
  /** "3,880 km", or null when the request carried no coordinates. */
  distance: string | null;
};

/** Six breaths a minute: four seconds in, six out, which is where a body settles. */
const BREATH_IN = 4;
const BREATH_OUT = 6;

function pulse(ms: number) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* not every browser has it, and none of them should complain */
  }
}

export function Sitting({
  lang,
  t,
  reading,
  sankalp,
  names,
  waterSlug,
  picture,
  left,
  leaveHref,
  reducedMotionDefault = false,
  speed = 1,
}: {
  lang: Lang;
  t: Copy;
  reading: Reading;
  sankalp: string;
  names: string[];
  /** One of six, and the only thing measurement is told about a morning. */
  waterSlug: string;
  /** The ghat, as ink on the paper: the same plate /live prints. */
  picture: { src: string; alt: string };
  /** "Ten mornings left", shown on the done screen and nowhere earlier. */
  left: string;
  /** Where the corner cross goes. Leaving before the mark spends nothing. */
  leaveHref: string;
  reducedMotionDefault?: boolean;
  /**
   * How many times faster than real time the clock runs. Always 1 in
   * production; the page refuses to pass anything else there. A three minute
   * practice cannot be driven end to end by a browser test at real speed, and
   * a test that never runs is worse than one that runs fast.
   */
  speed?: number;
}) {
  const router = useRouter();

  /* One reducer holds the phase, the seconds into it and the held seconds,
     and every change to them goes through `step`. An earlier version derived
     the phase from one elapsed number and moved it from inside a state
     updater, which is a side effect during a render and silently did
     nothing; a reducer is the one place that cannot happen. */
  const [state, dispatch] = useReducer(step, INITIAL);
  const [outcome, setOutcome] = useReducer(
    (was: { patraId: string | null; failed: boolean }, next: Partial<{ patraId: string | null; failed: boolean }>) => ({
      ...was,
      ...next,
    }),
    { patraId: null, failed: false },
  );
  const { phase, into, held } = state;
  const { patraId, failed } = outcome;
  const running = phase !== "ready" && phase !== "done";
  const holding = useRef(false);
  const minted = useRef(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  const reduced =
    reducedMotionDefault ||
    (typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);

  /* --- the clock -------------------------------------------------------- */
  useEffect(() => {
    if (!running) return;

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

  /* --- the sheet over the page: the body must not scroll under it ------- */
  useEffect(() => {
    if (!running) return;
    const was = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = was;
    };
  }, [running]);

  /* --- the morning is written as the mark begins ------------------------ */
  useEffect(() => {
    if (phase !== "mark" || minted.current) return;
    minted.current = true;

    keepThisMorning(lang)
      .then((result) => {
        if (result.id) {
          setOutcome({ patraId: result.id });
          track("sitting_done", { water: waterSlug, lang });
          pulse(12);
        } else setOutcome({ failed: true });
      })
      .catch(() => setOutcome({ failed: true }));
  }, [phase, lang, waterSlug]);

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

  /* --- before it begins: in the flow of the page, under the masthead ------ */
  if (phase === "ready") {
    return (
      <div className="mx-auto max-w-md px-5 py-6 sm:py-10" data-sitting data-speed={speed} data-phase={phase}>
        <div className="boxed plate relative aspect-[3/2] overflow-hidden">
          <div
            role="img"
            aria-label={picture.alt}
            className="ink-picture absolute inset-0"
            style={{ ["--picture" as string]: `url(${picture.src})` }}
          />
          <div className="absolute bottom-0 left-0 bg-paper px-3 py-2">
            <p className="display text-[1.4rem] leading-tight">{reading.water}</p>
            <p className="text-sm text-ink2">
              {reading.ghat}, {reading.city}
            </p>
          </div>
        </div>

        <p className="display mt-8 text-center text-[1.5rem] leading-[1.3]">{t.begin.ready}</p>
        <p className="mt-2 text-center text-sm text-ink2">{t.begin.quiet}</p>

        <button
          type="button"
          onClick={() => {
            track("sitting_start", { water: waterSlug, lang });
            dispatch({ type: "start" });
          }}
          className="label impress mt-8 min-h-[56px] w-full bg-spot px-8 text-paper hover:bg-ink active:bg-ink"
        >
          {t.begin.cta}
        </button>
      </div>
    );
  }

  /* --- the sheet: every part from here on fills the screen ---------------- */
  const stillness = phase === "stillness";
  const announcing = stillness && into < STILLNESS_NOTE_SECONDS;
  const skippable = phase === "reading" || phase === "breath";

  return (
    <div
      className={`sheet-in fixed inset-0 z-50 flex flex-col ${stillness ? "bg-[#0b0a08] text-[#8a836f]" : "bg-paper"}`}
      data-sitting
      data-speed={speed}
      data-phase={phase}
      data-announcing={announcing ? "1" : undefined}
    >
      {/* The water behind the reading, the breath, the vow and the mark,
          slow enough to be a river seen from the steps. The stillness has
          none: it is dark, with the words and the count and nothing else,
          as a contrast to everything before it. */}
      {!stillness && (
        <WaterBand
          seed={`${waterSlug}-sitting`}
          percentile={70}
          faint
          slow
          className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
        />
      )}

      <div
        className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-5 pt-5"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        {/* The bar and the cross. In the stillness they take their own dim
            light tones: the day's ink vanishes on the dark ground. */}
        <div className="flex items-start gap-4">
          <div className="flex-1 pt-4">
            <StoryBar t={t} state={state} dark={stillness} />
            {/* The name of the part, in the small voice. */}
            <p className={`mt-3 text-sm ${stillness ? "text-[#8a836f]" : "text-ink2"}`}>{labelFor(t, phase)}</p>
          </div>
          {phase !== "done" && (
            <Link
              href={leaveHref}
              aria-label={t.leave}
              title={t.leave}
              className={`impress grid h-11 w-11 shrink-0 place-items-center border ${
                stillness
                  ? "border-[#3a3530] text-[#8a836f] hover:border-[#6f685a] hover:text-[#b5ad99] active:text-[#b5ad99]"
                  : "border-rule text-ink2 hover:border-rulestrong hover:text-ink active:bg-paper2"
              }`}
              data-leave
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </Link>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center pb-24">
          {phase === "reading" && (
            <div className="pull">
              <p className="display text-[2rem] leading-[1.15]">{reading.water}</p>
              <p className="mt-1 text-ink2">
                {reading.ghat}, {reading.city}
              </p>

              <dl className="mt-8 border-t-2 border-rulestrong">
                <Row k={t.reading.flowLabel} v={reading.flow} />
                {reading.rank && <Row k={t.reading.rankLabel} v={reading.rank} />}
                <Row k={t.reading.normalLabel} v={reading.normal} />
                {reading.distance && <Row k={t.reading.distanceLabel} v={reading.distance} />}
              </dl>
            </div>
          )}

          {phase === "breath" && (
            <BreathScreen
              t={t}
              into={into}
              left={remaining(state)}
              reduced={reduced}
              band={reading.rank}
              waterSlug={waterSlug}
            />
          )}

          {phase === "hold" && (
            <VowScreen t={t} sankalp={sankalp} names={names} held={held} onHold={hold} />
          )}

          {stillness && (
            <div className="pull flex flex-col items-center text-center">
              <p
                className={`display text-[1.4rem] text-[#8a836f] transition-opacity duration-1000 ${announcing ? "opacity-100" : "opacity-0"}`}
                aria-hidden={!announcing}
              >
                {t.stillness.instruction}
              </p>
              <p
                className={`display mt-2 text-[1.6rem] leading-[1.3] text-[#b5ad99] transition-opacity duration-1000 ${announcing ? "opacity-0" : "opacity-100"}`}
              >
                {t.stillness.line}
              </p>
              <p className="display tabular mt-6 text-[3.6rem] leading-none text-[#6f685a]" aria-live="off" data-remaining={remaining(state)}>
                <Tick value={remaining(state)} />
              </p>
            </div>
          )}

          {phase === "mark" && (
            <div className="pull text-center">
              <p className="display text-[1.6rem] leading-[1.3]">
                {failed ? t.failed.title : patraId ? t.mark.done : t.mark.writing}
              </p>
              {failed && <p className="mt-4 text-ink2">{t.failed.body}</p>}
              {!failed && <MarkLine reduced={reduced} into={into} />}
            </div>
          )}

          {phase === "done" && (
            <div className="pull text-center">
              <p className="display text-[1.6rem]">{failed ? t.failed.title : t.mark.done}</p>
              {failed && (
                <button
                  type="button"
                  onClick={() => {
                    minted.current = false;
                    setOutcome({ failed: false, patraId: null });
                    dispatch({ type: "retry" });
                  }}
                  className="label impress mt-8 min-h-[48px] w-full bg-spot px-6 text-paper active:bg-ink"
                >
                  {t.failed.cta}
                </button>
              )}
              {/* The page moves on by itself; this is for the browser that did
                  not, and for the person who wants to press something. */}
              {patraHref && (
                <Link href={patraHref} className="label impress mt-8 flex min-h-[56px] items-center justify-center bg-spot px-6 text-paper active:bg-ink">
                  {t.mark.open}
                </Link>
              )}
              {!failed && <p className="mt-8 text-sm text-ink2">{left}</p>}
            </div>
          )}
        </div>

        {/* Next, at the foot where the thumb is: on the parts that may be
            left early. Dim in the stillness, ruled elsewhere. */}
        {(skippable || stillness) && (
          <button
            type="button"
            onClick={next}
            className={`label impress absolute inset-x-5 bottom-8 flex min-h-[56px] items-center justify-center border-2 ${
              stillness
                ? "border-[#2a2622] text-[#6f685a] hover:border-[#4a443c] hover:text-[#b5ad99] active:border-[#4a443c] active:text-[#b5ad99]"
                : "border-rulestrong bg-paper text-ink hover:bg-ink hover:text-paper active:bg-ink active:text-paper"
            }`}
            style={{ bottom: "max(2rem, env(safe-area-inset-bottom))" }}
            data-next
          >
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Five segments for the five parts, filling left to right, the way a story
 * bar does. The vow's segment fills with the thumb rather than the clock.
 * Widths are rounded numbers from the machine, so the server and the browser
 * print the same markup.
 */
function StoryBar({
  t,
  state,
  dark = false,
}: {
  t: Copy;
  state: { phase: Phase; into: number; held: number };
  /** On the stillness's dark ground: a dim track and a light fill. */
  dark?: boolean;
}) {
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
        <div key={limb} className={`h-[3px] flex-1 ${dark ? "bg-[#2a2622]" : "bg-rule"}`} data-segment={limb}>
          <div className={`h-full ${dark ? "bg-[#8a836f]" : "bg-ink"}`} style={{ width: `${(fills[i] * 100).toFixed(1)}%` }} />
        </div>
      ))}
    </div>
  );
}

/** The heading over each limb. "hold" is the vow's limb key; "done" has none. */
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rule py-3">
      <dt className="label text-ink2">{k}</dt>
      <dd className="text-right text-ink">{v}</dd>
    </div>
  );
}

/**
 * The breath, as water. The engraved band stands at the foot of the screen
 * and rises for four seconds, falls for six, at the amplitude the river is
 * running at: a river in spate climbs higher. The band is drawn twice its
 * box and squashed to fit, so its lines close as it rises and open as it
 * falls. The two words cross-fade rather than switch.
 *
 * Heights are percentages rounded to two places, because a raw float
 * serialises differently on server and client and React calls that a
 * mismatch.
 */
function BreathScreen({
  t,
  into,
  left,
  reduced,
  band,
  waterSlug,
}: {
  t: Copy;
  into: number;
  /** Seconds left in the breath, counted beside the water. */
  left: number;
  reduced: boolean;
  band: string | null;
  waterSlug: string;
}) {
  const cycle = BREATH_IN + BREATH_OUT;
  const at = into % cycle;
  const rising = at < BREATH_IN;
  const progress = rising ? at / BREATH_IN : 1 - (at - BREATH_IN) / BREATH_OUT;

  /* Eased at both ends, so the turn at the top of the breath is soft. */
  const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
  const height = reduced ? 0.5 : eased;
  const pct = (22 + height * 46).toFixed(2);

  return (
    <div className="pull flex h-full flex-col">
      <div className="relative h-[2.6rem]">
        <p
          className={`display absolute inset-x-0 text-center text-[2.4rem] leading-none settle ${rising ? "opacity-100" : "opacity-0"}`}
          aria-hidden={!rising}
        >
          {t.breath.in}
        </p>
        <p
          className={`display absolute inset-x-0 text-center text-[2.4rem] leading-none settle ${rising ? "opacity-0" : "opacity-100"}`}
          aria-hidden={rising}
        >
          {t.breath.out}
        </p>
      </div>

      {/* The water, in the spot colour: the one thing on the screen that is
          not ink on paper, because it is the thing itself. Its top edge is
          the waterline, with a faint wash of the same red beneath. */}
      <div className="relative mt-6 h-[44vh] overflow-hidden border-b border-rule" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-0" style={{ height: `${pct}%` }} data-waterline>
          <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--spot) 9%, transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-spot" />
          <WaterBand seed={`${waterSlug}-breath`} percentile={78} color="spot" className="absolute inset-0 h-full w-full" />
        </div>
      </div>

      <p className="display tabular mt-5 text-center text-[1.4rem] leading-none text-ink2" data-remaining={left}>
        <Tick value={left} />
      </p>
      {band && <p className="mt-2 text-center text-sm text-ink2">{band}</p>}
    </div>
  );
}

/**
 * A number that arrives: each new value fades and settles in, so a counter
 * reads as a clock ticking rather than a label changing. The key restarts
 * the animation; reduced motion turns it off in the stylesheet.
 */
function Tick({ value }: { value: number }) {
  return (
    <span key={value} className="tick inline-block">
      {value}
    </span>
  );
}

/**
 * The vow: one pressable box. The ink rises from the foot of the box while
 * the thumb is down and drains the moment it lifts, and the box says what
 * to do in the label voice. Eleven unbroken seconds fill it.
 */
function VowScreen({
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
  const pct = (filled * 100).toFixed(2);
  const pressing = held > 0;

  return (
    <div className="pull">
      <p className="text-center text-sm text-ink2">{names.join(", ")}</p>

      {/* A div with a button's role, not a <button>: Chrome wraps a button's
          children in an anonymous box of automatic height, and the ink's
          percentage height resolved against that and came out as nothing. */}
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
        className={`hold-box impress relative mt-4 block w-full cursor-pointer touch-none select-none overflow-hidden border-2 bg-paper2 px-6 py-12 text-center ${
          pressing ? "border-ink" : "border-rulestrong"
        }`}
        data-holding={pressing ? "1" : undefined}
        aria-label={t.vow.hold}
      >
        <span
          className="absolute inset-x-0 bottom-0"
          style={{ height: `${pct}%`, backgroundColor: "color-mix(in srgb, var(--spot) 28%, transparent)" }}
          aria-hidden="true"
          data-ink
        />
        <span className="relative display block text-[1.6rem] leading-[1.4]">{sankalp}</span>
        <span className="label relative mt-8 block text-ink2">
          {filled >= 1 ? t.vow.done : pressing ? t.vow.holding : t.vow.hold}
        </span>
      </div>
    </div>
  );
}

/** One line, writing itself. Under reduced motion it is simply there. */
function MarkLine({ reduced, into }: { reduced: boolean; into: number }) {
  const width = reduced ? 100 : Math.min((into / SITTING.mark) * 100, 100);

  return (
    <div className="mx-auto mt-10 h-px w-full max-w-sm bg-rule" aria-hidden="true">
      <div className="h-px bg-spot" style={{ width: `${width.toFixed(2)}%` }} />
    </div>
  );
}
