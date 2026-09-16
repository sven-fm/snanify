"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LIMB_ORDER, SITTING } from "@/lib/sitting-plan";
import {
  INITIAL,
  STILLNESS_NOTE_SECONDS,
  partNumber,
  progress,
  step,
  type Phase,
} from "@/lib/sitting-machine";
import type { todayContent } from "@/content/today";
import { keepThisMorning } from "@/app/[lang]/(app)/today/actions";
import { track } from "@/lib/track";
import type { FullLang as Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitting: five parts, three minutes, once a morning.

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
   the rules can be tested to the second: "next" leaves the reading and the
   breath early, the vow ends when the thumb has held for its whole length,
   and the stillness ends on its own clock and on nothing else.

   THE STILLNESS CANNOT BE SKIPPED. There is no tap target on that screen and
   no visible timer. That is the product decision from build-plan.md, and it is
   the reason the black screen is worth anything at all. It announces itself:
   the one instruction shows for three seconds in dim ink, then the screen is
   fully black.

   THE BAR ACROSS THE TOP is five segments for the five parts, each filling
   with its own time, so a first morning is never a screen with no way to
   know what it is or how long it lasts.

   THE MORNING IS MINTED AT THE START OF THE MARK, not at the end. The row and
   the credit are written the moment the mark begins, so closing the tab while
   the line draws still leaves a Sankalp Patra. The animation is twenty seconds
   of drawing over work that has already been done.

   REDUCED MOTION is honoured throughout: the breath becomes two words and a
   still line, and the mark stops drawing and simply appears.
   --------------------------------------------------------------------------- */

type Copy = (typeof todayContent)["en"];

type Reading = {
  water: string;
  ghat: string;
  city: string;
  flow: string;
  rank: string | null;
  normal: string;
};

/** Six breaths a minute: four seconds in, six out, which is where a body settles. */
const BREATH_IN = 4;
const BREATH_OUT = 6;

export function Sitting({
  lang,
  t,
  reading,
  sankalp,
  names,
  waterSlug,
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

  /* --- the morning is written as the mark begins ------------------------ */
  useEffect(() => {
    if (phase !== "mark" || minted.current) return;
    minted.current = true;

    keepThisMorning(lang)
      .then((result) => {
        if (result.id) {
          setOutcome({ patraId: result.id });
          track("sitting_done", { water: waterSlug, lang });
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
    holding.current = down;
  }, []);

  const next = useCallback(() => {
    track("sitting_next", { water: waterSlug, lang, from: phase });
    dispatch({ type: "next" });
  }, [phase, waterSlug, lang]);

  /* --- what the screen is doing right now -------------------------------- */
  if (phase === "ready") {
    return (
      <div className="mx-auto max-w-md px-5 py-16 text-center" data-sitting data-speed={speed} data-phase={phase}>
        <p className="display text-[2rem] leading-[1.2]">{reading.water}</p>
        <p className="mt-2 text-ink2">
          {reading.ghat}, {reading.city}
        </p>
        <p className="mt-8 text-[1.02rem] leading-[1.7] text-ink2">{t.begin.ready}</p>
        <p className="mt-2 text-sm text-ink2">{t.begin.quiet}</p>

        <button
          type="button"
          onClick={() => {
            track("sitting_start", { water: waterSlug, lang });
            dispatch({ type: "start" });
          }}
          className="label mt-10 min-h-[56px] w-full bg-spot px-8 text-paper transition-colors hover:bg-ink"
        >
          {t.begin.cta}
        </button>
      </div>
    );
  }

  if (phase === "stillness") {
    /* No timer, no tap target, no way past it. The one instruction shows
       for three seconds in dim ink and then the screen is entirely black. */
    const announcing = into < STILLNESS_NOTE_SECONDS;
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        aria-label={t.stillness.label}
        role="presentation"
        data-sitting
        data-speed={speed}
        data-phase={phase}
        data-announcing={announcing ? "1" : undefined}
      >
        <p
          className={`display px-8 text-center text-[1.4rem] text-[#6b665a] transition-opacity duration-1000 ${
            announcing ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!announcing}
        >
          {t.stillness.instruction}
        </p>
      </div>
    );
  }

  const skippable = phase === "reading" || phase === "breath";

  return (
    <div className="mx-auto max-w-md px-5 py-6" data-sitting data-speed={speed} data-phase={phase}>
      <StoryBar t={t} state={state} />

      {/* The name of the part, in the small voice: five parts in sequence,
          and this is the one the screen is on. */}
      <p className="mt-4 text-sm text-ink2">{labelFor(t, phase)}</p>

      {phase === "reading" && (
        <div className="mt-6">
          <p className="display text-[2rem] leading-[1.15]">{reading.water}</p>
          <p className="mt-1 text-ink2">
            {reading.ghat}, {reading.city}
          </p>

          <dl className="mt-8 border-t-2 border-rulestrong">
            <Row k={t.reading.flowLabel} v={reading.flow} />
            {reading.rank && <Row k={t.reading.rankLabel} v={reading.rank} />}
            <Row k={t.reading.normalLabel} v={reading.normal} />
          </dl>
        </div>
      )}

      {phase === "breath" && (
        <BreathScreen t={t} into={into} reduced={reduced} band={reading.rank} />
      )}

      {phase === "hold" && (
        <VowScreen t={t} sankalp={sankalp} names={names} held={held} onHold={hold} />
      )}

      {phase === "mark" && (
        <div className="mt-10 text-center">
          <p className="display text-[1.6rem] leading-[1.3]">
            {failed ? t.failed.title : patraId ? t.mark.done : t.mark.writing}
          </p>
          {failed && <p className="mt-4 text-ink2">{t.failed.body}</p>}
          {!failed && <MarkLine reduced={reduced} into={into} />}
        </div>
      )}

      {phase === "done" && (
        <div className="mt-10 text-center">
          <p className="display text-[1.6rem]">{failed ? t.failed.title : t.mark.done}</p>
          {failed && (
            <button
              type="button"
              onClick={() => {
                minted.current = false;
                setOutcome({ failed: false, patraId: null });
                dispatch({ type: "retry" });
              }}
              className="label mt-8 min-h-[48px] w-full bg-spot px-6 text-paper"
            >
              {t.failed.cta}
            </button>
          )}
          {/* The page moves on by itself; this is for the browser that did
              not, and for the person who wants to press something. */}
          {patraHref && (
            <Link href={patraHref} className="label mt-8 flex min-h-[56px] items-center justify-center bg-spot px-6 text-paper">
              {t.mark.open}
            </Link>
          )}
        </div>
      )}

      {skippable && (
        <div className="mt-10">
          <button
            type="button"
            onClick={next}
            className="label flex min-h-[56px] w-full items-center justify-center border-2 border-rulestrong text-ink transition-colors hover:bg-ink hover:text-paper"
            data-next
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Five segments for the five parts, filling left to right, the way a story
 * bar does. The vow's segment fills with the thumb rather than the clock.
 * Widths are rounded numbers from the machine, so the server and the browser
 * print the same markup.
 */
function StoryBar({ t, state }: { t: Copy; state: { phase: Phase; into: number; held: number } }) {
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
        <div key={limb} className="h-[3px] flex-1 bg-rule" data-segment={limb}>
          <div className="h-full bg-ink" style={{ width: `${(fills[i] * 100).toFixed(1)}%` }} />
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
 * The waterline rises for four seconds and falls for six, at the amplitude the
 * river is actually running at. Coordinates are rounded, because a raw float
 * serialises differently on server and client and React calls that a mismatch.
 */
function BreathScreen({
  t,
  into,
  reduced,
  band,
}: {
  t: Copy;
  into: number;
  reduced: boolean;
  band: string | null;
}) {
  const cycle = BREATH_IN + BREATH_OUT;
  const at = into % cycle;
  const rising = at < BREATH_IN;
  const progress = rising ? at / BREATH_IN : 1 - (at - BREATH_IN) / BREATH_OUT;

  const height = reduced ? 0.5 : progress;
  const y = (100 - height * 46).toFixed(2);

  return (
    <div className="mt-8">
      <p className="display text-center text-[2.4rem] leading-none">
        {rising ? t.breath.in : t.breath.out}
      </p>

      <svg
        viewBox="0 0 100 100"
        className="mt-8 w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{ height: "40vh" }}
      >
        <rect x="0" y={y} width="100" height={(100 - Number(y)).toFixed(2)} fill="var(--color-spot, #b32620)" opacity="0.14" />
        <line x1="0" y1={y} x2="100" y2={y} stroke="var(--color-ink, #16130f)" strokeWidth="0.4" />
      </svg>

      {band && <p className="mt-4 text-center text-sm text-ink2">{band}</p>}
    </div>
  );
}

/** The vow, held under a thumb while the ink fills. Eleven unbroken seconds. */
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

  return (
    <div
      className="mt-6 touch-none select-none"
      onPointerDown={() => onHold(true)}
      onPointerUp={() => onHold(false)}
      onPointerCancel={() => onHold(false)}
      onPointerLeave={() => onHold(false)}
    >
      <p className="text-sm text-ink2">{names.join(", ")}</p>

      <div className="relative mt-5 border-y-2 border-rulestrong py-6">
        <div
          className="absolute inset-y-0 left-0 bg-spot/15"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
        <p className="relative display text-[1.5rem] leading-[1.45]">{sankalp}</p>
      </div>

      <p className="mt-6 text-center text-[1.02rem] text-ink2">
        {filled >= 1 ? t.vow.done : held > 0 ? t.vow.holding : t.vow.hold}
      </p>
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
