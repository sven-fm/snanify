"use client";

import { useId } from "react";

/**
 * The Bindu Ripple.
 *
 * A bindu (sun / drop / the point of intention) sits above three widening
 * ripples, the whole thing clipped into a struck-coin seal. Read one way it is
 * dawn over a ghat; read the other it is the instant a body enters water.
 */
export function Mark({ className = "" }: { className?: string }) {
  const id = useId();
  const clip = `${id}-clip`;
  const sun = `${id}-sun`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="24" cy="24" r="20" />
        </clipPath>
        <linearGradient id={sun} x1="24" y1="11" x2="24" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--sun-2)" />
          <stop offset="1" stopColor="var(--sun)" />
        </linearGradient>
      </defs>

      {/* aura */}
      <circle cx="24" cy="24" r="22.2" stroke="currentColor" strokeWidth="1.3" opacity="0.32" />

      <g clipPath={`url(#${clip})`}>
        {/* bindu */}
        <circle cx="24" cy="18.4" r="6.5" fill={`url(#${sun})`} />

        {/* ripples — each wider, fainter, and further down than the last */}
        <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
          <path d="M12.8 29.6Q24 35.8 35.2 29.6" opacity="0.92" />
          <path d="M6.6 33.9Q24 42.4 41.4 33.9" opacity="0.6" />
          <path d="M0.6 38.4Q24 49.2 47.4 38.4" opacity="0.3" />
        </g>
      </g>
    </svg>
  );
}

/** Full lockup: seal + inscriptional wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8 text-ink" />
      <span className="wordmark text-[0.95rem] text-ink">Snanify</span>
    </span>
  );
}

/**
 * Hero treatment: the same seal, but the ripples actually travel outward —
 * three rings on a staggered loop, as if something just entered the water.
 */
export function SealAnimated({ className = "" }: { className?: string }) {
  const id = useId();
  const sun = `${id}-sun`;
  const fade = `${id}-fade`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={sun}>
          <stop offset="0%" stopColor="var(--sun-2)" />
          <stop offset="55%" stopColor="var(--sun)" />
          <stop offset="100%" stopColor="var(--sun)" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id={fade}>
          <stop offset="0%" stopColor="var(--sun)" stopOpacity="0.3" />
          <stop offset="70%" stopColor="var(--sun)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* warm bloom behind everything */}
      <circle cx="100" cy="100" r="98" fill={`url(#${fade})`} />

      {/* travelling ripples */}
      <g style={{ transformOrigin: "100px 100px" }}>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r="58"
            stroke="var(--teal)"
            strokeWidth="1.1"
            style={{
              transformOrigin: "100px 100px",
              animation: `ripple-out 7s cubic-bezier(0.22,0.61,0.36,1) ${i * 1.75}s infinite`,
            }}
          />
        ))}
      </g>

      {/* mandala rings */}
      <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <circle
        cx="100"
        cy="100"
        r="62"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.28"
        strokeDasharray="1.5 7"
      />

      {/* 24 rays — a subtle chakra, only legible up close.
          Coordinates are rounded: raw floats serialize differently on server
          and client, which React reports as a hydration mismatch. */}
      <g stroke="var(--sun-2)" strokeWidth="1.2" opacity="0.45" strokeLinecap="round">
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * Math.PI * 2) / 24;
          const p = (r: number) => (100 + Math.cos(a) * r).toFixed(3);
          const q = (r: number) => (100 + Math.sin(a) * r).toFixed(3);
          return <line key={i} x1={p(44)} y1={q(44)} x2={p(50)} y2={q(50)} />;
        })}
      </g>

      {/* the bindu itself */}
      <circle
        cx="100"
        cy="100"
        r="33"
        fill={`url(#${sun})`}
        style={{ transformOrigin: "100px 100px", animation: "breathe 6s ease-in-out infinite" }}
      />
    </svg>
  );
}
