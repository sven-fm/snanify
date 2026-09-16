import { todayContent } from "@/content/today";
import { snanContent } from "@/content/snan";
import type { Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The sitting, shown before it is bought: the five screens inside a phone,
   each held two seconds, on a ten-second loop drawn entirely by the
   stylesheet (`.loop` in globals.css). Nothing here is a morning's figure:
   where the reading prints a number, this prints a rule, because the number
   is the day's and the page is prerendered. Reduced motion shows the first
   screen alone.
   --------------------------------------------------------------------------- */

const BEZEL = 3;
const SCREEN_W = 84;
const SCREEN_H = (SCREEN_W * 1920) / 1080;
const FRAME_W = SCREEN_W + BEZEL * 2;
const FRAME_H = SCREEN_H + BEZEL * 2;
const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(3)}%`;

function Blank() {
  return <span className="mt-2 inline-block h-px w-16 bg-rulestrong align-middle" aria-hidden="true" />;
}

export function SittingLoop({ lang }: { lang: Lang }) {
  const t = todayContent[lang];
  const limbs = snanContent[lang].form.limbs;
  const names = limbs.map((l) => l.title);

  return (
    <figure className="loop pull" aria-label={names.join(", ")}>
      <div
        className="relative mx-auto w-full max-w-[280px] bg-ink"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}`, clipPath: "inset(0 round 1.4rem)" }}
      >
        <div
          className="absolute overflow-hidden bg-paper text-ink"
          style={{
            left: pct(BEZEL, FRAME_W),
            top: pct(BEZEL, FRAME_H),
            width: pct(SCREEN_W, FRAME_W),
            height: pct(SCREEN_H, FRAME_H),
            clipPath: "inset(0 round 0.8rem)",
          }}
        >
          {/* the story bar: five segments, each filling in its own two seconds */}
          <div className="loop-bar absolute inset-x-4 top-9 flex gap-1" aria-hidden="true">
            {names.map((n, i) => (
              <span key={n} className="loop-seg h-[3px] flex-1 bg-rule" style={{ ["--i" as string]: i }} />
            ))}
          </div>
          <p className="loop-name absolute inset-x-4 top-12 text-[0.65rem] text-ink2" aria-hidden="true">
            {names.map((n, i) => (
              <span key={n} className="loop-screen absolute left-0" style={{ ["--i" as string]: i }}>
                {n}
              </span>
            ))}
          </p>

          {/* 1. the reading */}
          <div className="loop-screen absolute inset-x-4 top-24" style={{ ["--i" as string]: 0 }}>
            <p className="display text-[1.15rem] leading-tight">{lang === "hi" ? "गंगा" : "Ganga"}</p>
            <p className="mt-0.5 text-[0.65rem] text-ink2">{lang === "hi" ? "हर की पौड़ी, हरिद्वार" : "Har Ki Pauri, Haridwar"}</p>
            <dl className="mt-4 border-t-2 border-rulestrong text-[0.65rem]">
              {[t.reading.flowLabel, t.reading.rankLabel, t.reading.distanceLabel].map((k) => (
                <div key={k} className="flex items-baseline justify-between border-b border-rule py-1.5">
                  <dt className="text-ink2">{k}</dt>
                  <dd>
                    <Blank />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 2. the breath: the water rising and falling in the spot colour */}
          <div className="loop-screen absolute inset-0" style={{ ["--i" as string]: 1 }}>
            <div className="loop-water absolute inset-x-0 bottom-0 bg-spot opacity-90" aria-hidden="true" />
            <p className="display absolute inset-x-4 top-24 text-[1.15rem] leading-tight">
              <span className="loop-in">{t.breath.in}</span>
              <span className="loop-out">{t.breath.out}</span>
            </p>
          </div>

          {/* 3. the sankalp, the ink filling under a thumb */}
          <div className="loop-screen absolute inset-x-4 top-24" style={{ ["--i" as string]: 2 }}>
            <p className="text-[0.65rem] text-ink2">{t.vow.label}</p>
            <p className="display mt-2 text-[1rem] leading-[1.35]">
              {lang === "hi" ? "आपके अपने शब्द, आपके अँगूठे के नीचे।" : "Your own words, under your thumb."}
            </p>
            <div className="mt-5 h-px w-full bg-rule">
              <div className="loop-ink h-px bg-spot" />
            </div>
            <p className="mt-3 text-[0.65rem] text-ink2">{t.vow.hold}</p>
          </div>

          {/* 4. the stillness, dark */}
          <div className="loop-screen absolute inset-0 bg-[#0b0a08] text-[#8a836f]" style={{ ["--i" as string]: 3 }}>
            <p className="display absolute inset-x-4 top-1/2 -translate-y-1/2 text-center text-[1rem] leading-[1.3] text-[#b5ad99]">
              {t.stillness.line}
              <span className="display mt-3 block text-[2.2rem] leading-none text-[#6f685a] tabular-nums">60</span>
            </p>
          </div>

          {/* 5. the mark, a line writing itself */}
          <div className="loop-screen absolute inset-x-4 top-1/2 -translate-y-1/2 text-center" style={{ ["--i" as string]: 4 }}>
            <p className="display text-[1rem] leading-[1.3]">{t.mark.writing}</p>
            <div className="mx-auto mt-5 h-px w-4/5 bg-rule">
              <div className="loop-ink h-px bg-spot" />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bg-ink"
          style={{ left: pct(28, FRAME_W), top: pct(BEZEL + 2.2, FRAME_H), width: pct(34, FRAME_W), height: pct(5, FRAME_H), clipPath: "inset(0 round 999px)" }}
        />
      </div>
    </figure>
  );
}
