"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Phone, PHONE_STATUS_OVER } from "@/components/kit/Phone";
import { todayContent } from "@/content/today";
import { snanContent } from "@/content/snan";
import { PALETTE } from "@/lib/palette";
import { waveRows } from "@/lib/river-geometry";
import type { Lang } from "@/lib/locales";
import type { WalkData } from "@/lib/walkthrough";

/* ---------------------------------------------------------------------------
   The snan, walked through in a phone, on /snan.

   The launch video's cut (ads/launch/launch.html), live on the page: five
   screens drawn from the kit and simplified to read at a phone's size (the
   reading, the breath, the sankalp, the stillness, the Sankalp Patra) swipe
   through the phone, each under its caption in capitals. Each screen moves a
   little while it is shown: the dot finds its place and pulses, the river
   rises, the ink fills, the seconds fall, the seal lands. The figure is the
   specimen's morning (src/lib/walkthrough.ts): today's, the same as /live.

   ONE CLOCK. Every moving thing is a pure function of t, set by frame(t) on
   refs, never through React state, so a frame costs no render. It runs only
   while the phone is on screen. A sixth slide repeats the reading, so the
   loop swipes forward into it and snaps back to the first without a seam.

   The numbered row under the phone jumps to a part and holds the loop there
   for a while. Under reduced motion nothing plays: the row steps the screens,
   each shown at rest.

   The screens are drawn in their own units, 588 wide (the launch video's
   screen), and scaled by --u, so the picture is the same at any phone width.
   Their colours are the day palette whatever the site's theme, as the
   specimen's are: it is a picture of the app.
   --------------------------------------------------------------------------- */

const W = 588;
/** The content box, nine by sixteen, plus the status bar the track paints over. */
const STATUS = 79.65;
const H = (W * 16) / 9 + STATUS;

const HOLD = 3.4;
const SWIPE = 0.8;
const N = 5;
const CYCLE = N * HOLD;
/** After a tap, the loop waits on the chosen part this long before it moves on. */
const PAUSE = 6;

const C = PALETTE.day;
const NIGHT = { paper: "#0b0a08", line: "#b5ad99", sec: "#8a836f", dim: "#6f685a", bar: "#2a2622" };
const GAUGE = { w: [1, 2, 4, 2, 1], c: ["#f2ead9", "#e8dcc0", "#c9d7d2", "#7fa3a6", "#1d5a6a"] };

/** "01", in Devanagari numerals in the Hindi edition, as the parts list sets them. */
const DEVA = "०१२३४५६७८९";
const numeral = (n: number, lang: Lang) =>
  [...String(n).padStart(2, "0")].map((d) => (lang === "hi" ? DEVA[Number(d)] : d)).join("");

const u = (n: number) => `calc(var(--u) * ${n})`;
const f2 = (n: number) => n.toFixed(2);
const clamp = (x: number, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const span = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out3 = (x: number) => 1 - Math.pow(1 - x, 3);

/** Slide position at loop time t: slide i is fully in from i * HOLD. */
function position(t: number): number {
  let p = 0;
  for (let i = 1; i <= N; i++) p += inOut(span(t, i * HOLD - SWIPE, i * HOLD));
  return p;
}
/** Seconds since screen i finished arriving (negative while it is still on its way). */
const local = (t: number, i: number) => t - i * HOLD;

/* --- the drawn parts ----------------------------------------------------- */

function River({
  id,
  top,
  horizon = 74,
  night = false,
  breathe = false,
}: {
  id: string;
  top: number;
  horizon?: number;
  night?: boolean;
  breathe?: boolean;
}) {
  const w = W;
  const h = H - top;
  const k = w / 260;
  const rows = waveRows({ width: w, height: h, rows: 11, top: horizon + 8 });
  const sunX = 400;
  const sunR = 54;
  const ink = night ? "#3a3530" : C.ink;
  const wave = night ? "#16404a" : C.teal;
  const path = night ? "#5a4a1c" : C.marigold;
  const glints = rows.flatMap((row, i) => {
    const t = rows.length > 1 ? i / (rows.length - 1) : 0;
    const centre = sunX + (w / 2 - sunX) * t;
    const total = (5 + 64 * t) * k;
    const n = t < 0.3 ? 1 : t < 0.7 ? 2 : 3;
    const gw = total / (2 * n - 1);
    const left = centre - total / 2;
    const gh = Math.max(1.6, row.stroke * k * 0.45) * 2.4;
    return Array.from({ length: n }, (_, d) => ({ x: left + d * 2 * gw, y: row.y - gh / 2, w: gw, h: gh }));
  });
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${w} ${f2(h)}`}
      className="absolute left-0"
      style={{ top: u(top), width: u(w), height: u(h) }}
    >
      <clipPath id={`walk-sky-${id}`}>
        <rect width={w} height={horizon} />
      </clipPath>
      <circle
        cx={sunX}
        cy={f2(horizon + 0.35 * sunR)}
        r={sunR}
        fill={night ? "#4a1410" : C.sindoor}
        clipPath={`url(#walk-sky-${id})`}
      />
      <g data-waves={breathe ? "breath" : ""}>
        {rows.map((r, i) => (
          <polyline
            key={i}
            data-wave=""
            data-p={f2(r.period)}
            data-d={f2(r.drift)}
            points={r.points}
            fill="none"
            stroke={wave}
            strokeWidth={f2(Math.max(1.6, r.stroke * k * 0.45))}
          />
        ))}
        {glints.map((g, i) => (
          <rect key={i} data-glint="" x={f2(g.x)} y={f2(g.y)} width={f2(g.w)} height={f2(g.h)} fill={path} />
        ))}
      </g>
      <rect y={f2(horizon - 2.5)} width={w} height="5" fill={ink} />
    </svg>
  );
}

function Prog({ n, night = false, label }: { n: number; night?: boolean; label: string }) {
  return (
    <>
      <div className="absolute flex" style={{ left: u(40), right: u(40), top: u(94), gap: u(10) }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <i
            key={i}
            className="block flex-1"
            style={{
              height: u(5),
              background: i <= n ? (night ? NIGHT.dim : C.ink) : night ? NIGHT.bar : C.rule,
            }}
          />
        ))}
      </div>
      <p className="absolute" style={{ left: u(40), top: u(114), fontSize: u(24), color: night ? NIGHT.dim : C.ink2 }}>
        {label}
      </p>
    </>
  );
}

/** Where the reading's dot sets off from, at the left of the strip. */
const DOT_FROM = 10;

function Gauge({ percentile, top, width, height = 40, mode = "live" }: {
  percentile: number | null;
  top: number;
  width?: number;
  height?: number;
  /** live: the reading's dot, moved by the clock, pulsing once it lands. still:
      the Patra's, at its place. start: the clone's, where the live one sets off. */
  mode?: "live" | "still" | "start";
}) {
  const still = mode !== "live";
  const place = percentile === null ? null : clamp(percentile / 100, 0.02, 0.98) * 100;
  const at = place === null ? null : mode === "start" ? DOT_FROM : place;
  return (
    <div
      className="absolute flex"
      style={{
        left: u(40),
        ...(width ? { width: u(width) } : { right: u(40) }),
        top: u(top),
        height: u(height),
        border: `${u(3)} solid ${C.ink}`,
      }}
    >
      {GAUGE.w.map((w, i) => (
        <b key={i} className="block h-full" style={{ flex: w, background: GAUGE.c[i] }} />
      ))}
      <i
        className="absolute"
        style={{ left: "50%", top: u(-12), bottom: u(-12), borderLeft: `${u(3)} dashed ${C.ink}` }}
      />
      {at !== null ? (
        <svg
          viewBox="0 0 40 40"
          className="absolute overflow-visible"
          data-dot={still ? undefined : String(place)}
          style={{
            left: `${f2(at)}%`,
            top: "50%",
            width: u(height),
            height: u(height),
            marginLeft: u(-height / 2),
            marginTop: u(-height / 2),
          }}
        >
          {still ? null : <circle data-ring="" className="pulse-ring" cx="20" cy="20" r="17" fill={C.sindoor} />}
          <circle cx="20" cy="20" r="17" fill={C.sindoor} stroke={C.ink} strokeWidth="3" />
        </svg>
      ) : null}
    </div>
  );
}

/** A caption or a headline: "|" breaks the line, the *starred* word goes sindoor. */
function marked(text: string): ReactNode {
  return text.split("|").map((line, i) => (
    <span key={i} className="block">
      {line.split(/\*(.+?)\*/).map((part, j) => (j % 2 ? <span key={j} className="text-sindoor">{part}</span> : part))}
    </span>
  ));
}

/* --- the component ------------------------------------------------------- */

export function Walkthrough({ lang, data }: { lang: Lang; data: WalkData }) {
  const t = todayContent[lang];
  const w = snanContent[lang].walk;
  const hi = lang === "hi";
  const root = useRef<HTMLDivElement>(null);
  const [part, setPart] = useState(0);
  const jump = useRef<((i: number) => void) | null>(null);

  const big: CSSProperties = {
    fontWeight: 800,
    lineHeight: hi ? 1.25 : 0.95,
    letterSpacing: hi ? 0 : "-0.01em",
    textTransform: hi ? "none" : "uppercase",
  };
  const display = "display";

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = <T extends Element>(s: string) => el.querySelector<T>(s);
    const qa = <T extends Element>(s: string) => [...el.querySelectorAll<T>(s)];

    const track = q<HTMLElement>("[data-track]");
    const caps = qa<HTMLElement>("[data-cap]");
    const dot = q<SVGElement>("[data-dot]");
    const ring = q<SVGElement>("[data-ring]");
    const breathWaves = q<SVGGElement>('[data-waves="breath"]');
    const breathNum = q<HTMLElement>("[data-num]");
    const ink = q<HTMLElement>("[data-ink]");
    const sec = q<HTMLElement>("[data-sec]");
    const seal = q<HTMLElement>("[data-seal]");
    const waves = qa<SVGPolylineElement>("[data-wave]");
    const glints = qa<SVGRectElement>("[data-glint]");
    const dotAt = dot ? Number(dot.dataset.dot) : 0;

    let shown = -1;
    const frame = (time: number, lt: number) => {
      const p = position(lt);
      if (track) track.style.transform = `translateX(${f2((-p * 100) / (N + 1))}%)`;
      const cur = Math.round(p) % N;
      caps.forEach((c, i) => {
        /* Caption i rides with slide i; the first also rides in with the clone. */
        let side = i - p;
        if (side < -N / 2) side += N;
        c.style.opacity = f2(clamp(1 - Math.abs(side) * 2.4));
        c.style.transform = `translateX(${f2(side * 40)}%)`;
      });
      if (cur !== shown) {
        shown = cur;
        setPart(cur);
      }

      /* What moves inside each screen. The reading also runs on the clone's
         side of the loop, so it is at rest when the loop snaps back. */
      const l0 = local(lt, 0);
      if (dot) dot.style.left = `${f2(DOT_FROM + (dotAt - DOT_FROM) * out3(span(l0, 0.4, 1.6)))}%`;
      if (ring) ring.style.visibility = l0 > 1.6 ? "visible" : "hidden";
      const l1 = local(lt, 1);
      const lvl = inOut(span(l1, 0, 2.8));
      breathWaves?.setAttribute("transform", `translate(0 ${f2(60 * (1 - lvl))}) scale(1 ${f2(0.75 + 0.25 * lvl)})`);
      const c1 = clamp(l1, 0, 3.99);
      if (breathNum) {
        breathNum.textContent = String(4 - Math.floor(c1));
        breathNum.style.opacity = f2(1 - (c1 % 1) * 0.6);
      }
      if (ink) ink.style.width = `${f2(100 * clamp(0.12 + 0.8 * inOut(span(local(lt, 2), 0, 2.6))))}%`;
      if (sec) sec.textContent = String(60 - Math.floor(clamp(local(lt, 3), 0, 3)));
      if (seal) {
        const k = out3(span(local(lt, 4), 0.3, 0.6));
        seal.style.opacity = local(lt, 4) < 0.3 ? "0" : "1";
        seal.style.transform = `rotate(${f2(-20 + 12 * k)}deg) scale(${f2(1.25 - 0.25 * k)})`;
      }

      /* flow: each wave drifts a period at its own pace; the path shimmers. */
      waves.forEach((wv) => {
        const per = Number(wv.getAttribute("data-p"));
        const dd = Number(wv.getAttribute("data-d"));
        wv.setAttribute("transform", `translate(${f2(-(((time / dd) * per) % per))} 0)`);
      });
      glints.forEach((g, j) => g.setAttribute("opacity", f2(0.75 + 0.25 * Math.sin(time * 1.4 + j * 0.9))));
    };

    /* At rest: screen i, with its motion finished. */
    const rest = (i: number) => frame(0, i * HOLD + HOLD - SWIPE - 0.05);

    if (reduced) {
      rest(0);
      jump.current = (i) => rest(i);
      return () => {
        jump.current = null;
      };
    }

    let raf = 0;
    let visible = false;
    let last = performance.now();
    let clock = 0;
    let held = 0;
    let stopAt = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      /* Held on a tapped part: its motion plays out, then it waits. */
      if (held > 0) {
        held -= dt;
        clock = Math.min(clock + dt, stopAt);
      } else clock = (clock + dt) % CYCLE;
      frame(now / 1000, clock);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    jump.current = (i) => {
      /* Arrived, with its motion still to play. */
      clock = i * HOLD;
      stopAt = i * HOLD + HOLD - SWIPE - 0.05;
      held = PAUSE;
      frame(performance.now() / 1000, clock);
    };

    frame(performance.now() / 1000, 0);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(el);
    const vis = () => (visible && !document.hidden ? start() : stop());
    document.addEventListener("visibilitychange", vis);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
      jump.current = null;
    };
  }, []);

  const names = data.names.slice(0, 2);
  const reading = (clone: boolean) => (
    <div key={clone ? "clone" : "reading"} className="relative h-full flex-none overflow-hidden" style={{ width: `${100 / (N + 1)}%` }}>
      <Prog n={0} label={t.reading.label} />
      <p className={`${display} absolute`} style={{ ...big, left: u(40), right: u(40), top: u(180), fontSize: u(104), color: C.sindoor }}>
        {data.river}
      </p>
      <p className="absolute" style={{ left: u(40), right: u(40), top: u(hi ? 316 : 296), fontSize: u(28), color: C.ink2 }}>
        {data.place}
      </p>
      <p className={`${display} absolute`} style={{ left: u(40), right: u(40), top: u(360), fontSize: u(58), lineHeight: 1.1, fontWeight: 700 }}>
        {data.state}
      </p>
      {data.plain ? (
        <p className="absolute" style={{ left: u(40), right: u(40), top: u(440), fontSize: u(26), lineHeight: 1.4, color: C.ink2 }}>
          {data.plain}
        </p>
      ) : null}
      <Gauge percentile={data.percentile} top={530} mode={clone ? "start" : "live"} />
      <p className="absolute tabular-nums" style={{ left: u(40), right: u(40), top: u(596), fontSize: u(24), color: C.ink2 }}>
        {data.figure}
      </p>
      <River id={clone ? "r0c" : "r0"} top={700} />
    </div>
  );

  const slide = (key: string, children: ReactNode, night = false) => (
    <div
      key={key}
      className="relative h-full flex-none overflow-hidden"
      style={{ width: `${100 / (N + 1)}%`, background: night ? NIGHT.paper : C.paper }}
    >
      {children}
    </div>
  );

  return (
    <figure ref={root} className="w-full" aria-label={w.captions.map((c) => c.replace(/[*|]/g, " ")).join(" ")}>
      {/* The captions: one per screen, stacked, crossing as the screens swipe. */}
      <div
        aria-hidden="true"
        className={`${display} relative overflow-hidden text-ink ${hi ? "h-[5.6rem] text-[2rem]" : "h-[5.2rem] text-[2.35rem] min-[380px]:text-[2.5rem]"}`}
        style={big}
      >
        {w.captions.map((c, i) => (
          <p key={i} data-cap="" className="absolute inset-x-0 top-0" style={{ opacity: i === 0 ? 1 : 0 }}>
            {marked(c)}
          </p>
        ))}
      </div>

      <Phone className="mt-5 max-w-[300px]" screenClassName="bg-[#f2ead9] text-[#141210]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ top: `-${PHONE_STATUS_OVER}`, ["--u" as string]: `calc(93cqw / ${W})`, background: C.paper, color: C.ink }}
        >
          <div data-track="" className="flex h-full" style={{ width: `${(N + 1) * 100}%` }}>
            {reading(false)}

            {slide(
              "breath",
              <>
                <Prog n={1} label={t.breath.label} />
                <p className={`${display} absolute text-center`} style={{ ...big, left: u(40), right: u(40), top: u(220), fontSize: u(hi ? 70 : 78) }}>
                  {t.breath.in}
                </p>
                <p data-num="" className={`${display} absolute text-center tabular-nums`} style={{ left: u(40), right: u(40), top: u(330), fontSize: u(110), fontWeight: 800, lineHeight: 1, color: C.ink2 }}>
                  4
                </p>
                <River id="r1" top={600} horizon={60} breathe />
              </>,
            )}

            {slide(
              "vow",
              <>
                <Prog n={2} label={t.vow.label} />
                <p className="absolute" style={{ left: u(40), right: u(40), top: u(200), fontSize: u(26), color: C.ink2 }}>
                  {names.join(", ")}
                </p>
                <p className={`${display} absolute`} style={{ left: u(40), right: u(40), top: u(250), fontSize: u(hi ? 50 : 56), lineHeight: hi ? 1.35 : 1.1, fontWeight: 700 }}>
                  {data.sankalp}
                </p>
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: u(40),
                    right: u(48),
                    top: u(500),
                    height: u(88),
                    border: `${u(3)} solid ${C.ink}`,
                    boxShadow: `${u(8)} ${u(8)} 0 0 ${C.ink}`,
                    background: C.paper,
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center" style={{ fontSize: u(30), fontWeight: 700 }}>
                    {t.vow.holding}
                  </span>
                  <i data-ink="" className="absolute inset-y-0 left-0 overflow-hidden not-italic" style={{ width: "12%", background: C.sindoor }}>
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center" style={{ width: u(494), fontSize: u(30), fontWeight: 700, color: "#fff" }}>
                      {t.vow.holding}
                    </span>
                  </i>
                </div>
                <River id="r2" top={700} />
              </>,
            )}

            {slide(
              "still",
              <>
                <Prog n={3} night label={t.stillness.label} />
                <p className={`${display} absolute text-center`} style={{ left: u(40), right: u(40), top: u(250), fontSize: u(46), fontWeight: 700, color: NIGHT.line }}>
                  {t.stillness.line}
                </p>
                <p data-sec="" className={`${display} absolute text-center tabular-nums`} style={{ left: u(40), right: u(40), top: u(340), fontSize: u(150), fontWeight: 800, lineHeight: 1, color: NIGHT.sec }}>
                  60
                </p>
                <p className="absolute text-center" style={{ left: u(40), right: u(40), top: u(520), fontSize: u(26), color: NIGHT.dim }}>
                  {t.stillness.note}
                </p>
                <River id="r3" top={700} night />
              </>,
              true,
            )}

            {slide(
              "patra",
              <>
                <p className={`${display} absolute whitespace-nowrap`} style={{ left: u(40), right: u(40), top: u(96), fontSize: u(32), fontWeight: 700, lineHeight: 1.1, color: C.sindoor }}>
                  {data.sheetTitle}
                </p>
                <p className="absolute whitespace-nowrap" style={{ left: u(40), right: u(40), top: u(140), fontSize: u(21), color: C.ink2 }}>
                  {data.dateLine}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/waters/ganga-haridwar.webp"
                  alt=""
                  loading="lazy"
                  className="absolute object-cover"
                  style={{ left: u(40), right: u(40), top: u(178), width: u(508), height: u(236), objectPosition: "center 30%", mixBlendMode: "multiply" }}
                />
                <div data-seal="" className="absolute" style={{ right: u(26), top: u(196), width: u(124), height: u(124), opacity: 0 }}>
                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                    <circle cx="50" cy="50" r="50" fill={C.sindoor} />
                    <circle cx="50" cy="50" r="43" fill="none" stroke={C.marigold} strokeWidth="2" strokeDasharray="4 3" />
                  </svg>
                  <div className={`${display} absolute inset-0 flex flex-col items-center justify-center`} style={{ color: C.marigold, fontWeight: 800, lineHeight: 1.05 }}>
                    <span style={{ fontSize: u(hi ? 26 : 32) }}>{data.badge[0]}</span>
                    <span style={{ fontSize: u(19) }}>{data.badge[1]}</span>
                  </div>
                </div>
                <p className={`${display} absolute`} style={{ ...big, left: u(40), right: u(20), top: u(436), fontSize: u(hi ? 46 : 50), whiteSpace: "nowrap" }}>
                  {names.map((n) => (
                    <span key={n} className="block">
                      {n}
                    </span>
                  ))}
                </p>
                <p className="absolute" style={{ left: u(40), right: u(40), top: u(hi ? 572 : 552), fontSize: u(26) }}>
                  {data.placeLine[0]}
                  <span style={{ color: C.sindoor }}>{data.placeLine[1]}</span>
                  {data.placeLine[2]}
                </p>
                <p className={`${display} absolute`} style={{ left: u(40), right: u(40), top: u(630), fontSize: u(40), fontWeight: 700, lineHeight: 1 }}>
                  {data.state}
                </p>
                <Gauge percentile={data.percentile} top={690} width={300} height={30} mode="still" />
                <p className="absolute tabular-nums" style={{ left: u(40), right: u(40), top: u(740), fontSize: u(20), color: C.ink2 }}>
                  {data.timeLine}
                </p>
                <River id="r4" top={800} />
              </>,
            )}

            {reading(true)}
          </div>
        </div>
      </Phone>

      {/* The parts, numbered: a tap shows that screen and holds it. */}
      <div className="mx-auto mt-4 flex max-w-[300px] gap-1.5">
        {w.captions.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={w.show.replace("{n}", String(i + 1))}
            aria-pressed={part === i}
            onClick={() => {
              setPart(i);
              jump.current?.(i);
            }}
            className="group flex min-h-[44px] flex-1 flex-col justify-center gap-1.5"
          >
            <span className={`block h-[3px] w-full ${part === i ? "bg-sindoor" : "bg-rule group-active:bg-ink2"}`} />
            <span className={`text-[0.75rem] tabular-nums ${part === i ? "text-sindoor" : "text-ink2"}`}>
              {numeral(i + 1, lang)}
            </span>
          </button>
        ))}
      </div>
    </figure>
  );
}
