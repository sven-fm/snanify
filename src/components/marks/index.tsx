/* The marks: small things from the puja thali that do the work rules and
   tracked labels used to do. Each is used once where it means something; see
   DESIGNSYSTEM.md, Marks. All are SVG, because the base layer squares every
   box and a mark is round, and all are sized in em so they scale with the type
   beside them. All are decoration, so all are hidden from assistive tech. */

type MarkProps = { className?: string };

/**
 * A vertical vermillion stroke ending in a bindu, set in the gutter beside the
 * one headline that matters on a page. Its height follows the em of its box:
 * set the font size of the headline's wrapper and it spans about two lines.
 */
export function Tilak({ className = "" }: MarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 64"
      className={`h-[2.2em] w-[0.28em] shrink-0 text-sindoor ${className}`}
    >
      <rect x="2" y="0" width="4" height="50" fill="currentColor" />
      <circle cx="4" cy="58.5" r="4" fill="currentColor" />
    </svg>
  );
}

/** Three vermillion dots, the middle one larger: a turn between the big
 *  movements of a long page. Centred by default. */
export function Kumkum({ className = "" }: MarkProps) {
  return (
    <div aria-hidden="true" className={`flex justify-center py-2 text-sindoor ${className}`}>
      <svg viewBox="0 0 40 10" className="h-[0.6em] w-[2.4em]">
        <circle cx="8" cy="5" r="2.4" fill="currentColor" />
        <circle cx="20" cy="5" r="3.4" fill="currentColor" />
        <circle cx="32" cy="5" r="2.4" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * The mauli thread: vermillion with a dashed haldi thread twisted along it.
 * The one divider, above the packs, at the foot of the sheet, over the footer.
 * It stretches to its box; the strokes keep their weight at any width.
 */
export function Mauli({ className = "" }: MarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={`block h-[0.75em] w-full ${className}`}
    >
      <path
        d="M0 6 C25 2 50 10 100 6 S175 2 200 6"
        fill="none"
        stroke="var(--sindoor)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 7 C25 3 50 11 100 7 S175 3 200 7"
        fill="none"
        stroke="var(--haldi)"
        strokeWidth="1.25"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** One vermillion dot: the selected radio, the current step. `faint` is the
 *  step still ahead. A prop rather than a colour class, because two text
 *  colours on one element resolve by stylesheet order, not by class order. */
export function Bindu({ className = "", tone = "sindoor" }: MarkProps & { tone?: "sindoor" | "faint" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" className={`h-[0.5em] w-[0.5em] ${className}`}>
      <circle cx="5" cy="5" r="5" fill={tone === "sindoor" ? "var(--sindoor)" : "var(--rule)"} />
    </svg>
  );
}

/**
 * A diya: a haldi flame that flickers over a bowl in the current colour, so
 * on a vermillion button the bowl prints in paper. The flame on the primary
 * button and in the sitting, nowhere else.
 */
export function Diya({ className = "" }: MarkProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 18" className={`h-[1.15em] w-[0.9em] ${className}`}>
      <path className="flicker" d="M7 1 C10 6 11 9 7 12 C3 9 4 6 7 1Z" fill="var(--haldi)" />
      <path d="M1 13 H13 L11 17 H3 Z" fill="currentColor" />
    </svg>
  );
}

type Petal = {
  /** Start position, as a percentage of the layer. */
  x: number;
  y: number;
  /** Width in px. */
  size: number;
  tone: "haldi" | "sindoor";
  /** Seconds for one pass. */
  d: number;
  delay: number;
};

/* A fixed set rather than a random one, so the server and the client draw the
   same petals and the page hydrates clean. Mostly marigold, one in vermillion. */
const PETALS: Petal[] = [
  { x: 8, y: 34, size: 9, tone: "haldi", d: 19, delay: -4 },
  { x: 22, y: 62, size: 7, tone: "haldi", d: 23, delay: -11 },
  { x: 41, y: 48, size: 8, tone: "sindoor", d: 21, delay: -7 },
  { x: 58, y: 78, size: 10, tone: "haldi", d: 17, delay: -2 },
  { x: 74, y: 56, size: 7, tone: "haldi", d: 25, delay: -15 },
];

/**
 * Petals riding the water. An absolute layer over a water element: give the
 * parent `relative`. `drift` is how far, in px, a petal travels in one pass.
 * Keep to the hero river and the end of the sitting.
 */
export function Petals({
  petals = PETALS,
  drift = 120,
  className = "",
}: {
  petals?: Petal[];
  drift?: number;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 10 6"
          className="petal absolute"
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${(p.size * 0.6).toFixed(2)}px`,
              "--x": `${drift}px`,
              "--d": `${p.d}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <path
            d="M0 3 C2 0 8 0 10 3 C8 6 2 6 0 3Z"
            fill={p.tone === "haldi" ? "var(--haldi)" : "var(--sindoor)"}
          />
        </svg>
      ))}
    </div>
  );
}
