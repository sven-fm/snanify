import type { Lang } from "@/lib/locales";
import type { Prices } from "@/content/prices";
import { ordinal } from "@/lib/ordinal";
import { nthMorning } from "@/lib/mornings";
import { Price } from "@/components/ui";

/* ---------------------------------------------------------------------------
   The seal: a round sindoor stamp, marigold Eczar 800 lettering, a dashed
   marigold ring inset 6px. Two uses only. The price seal ("11 for €11") on
   the landing and /begin, turned -8deg; the morning badge ("7th morning") on
   the Patra, its page and the mark, turned +10deg. The disc is SVG, because
   the base layer squares every box; the words sit over it as type, so the
   price can be <Price> and the head script picks the reader's currency.
   --------------------------------------------------------------------------- */

const priceWords = {
  en: { lead: "11", join: "for" },
  hi: { lead: "11", join: "सुबहें" },
} satisfies Record<Lang, { lead: string; join: string }>;

type SealProps = { size?: number; stamp?: boolean; className?: string } & (
  | { kind: "price"; prices: Prices; lang: Lang }
  | { kind: "morning"; n: number; lang: Lang }
);

/** "7th morning" / "सातवीं सुबह". */
export function morningWords(n: number, lang: Lang): string {
  return lang === "hi" ? `${nthMorning(n, "hi")} सुबह` : `${ordinal(n, "en")} morning`;
}

export function Seal(props: SealProps) {
  if (props.kind === "morning" && props.n < 2) return null;
  const size = props.size ?? 78;
  const turn = props.kind === "price" ? -8 : 10;
  const ring = 6;
  const c = size / 2;
  const fontSize = Math.round(size * (props.kind === "morning" ? 0.15 : props.lang === "hi" ? 0.155 : 0.17));

  const words =
    props.kind === "price" ? (
      <>
        <span className="block">{priceWords[props.lang].lead}</span>
        <span className="block">{priceWords[props.lang].join}</span>
        <span className="block tabular-nums">
          <Price prices={props.prices} />
          {props.lang === "hi" ? " में" : ""}
        </span>
      </>
    ) : (
      <span className="block">{morningWords(props.n, props.lang)}</span>
    );

  return (
    <span
      data-seal={props.kind}
      className={`relative inline-grid shrink-0 place-items-center ${props.stamp ? "stamp" : ""} ${props.className ?? ""}`}
      style={
        {
          width: size,
          height: size,
          transform: `rotate(${turn}deg)`,
          "--seal-turn": `${turn}deg`,
        } as React.CSSProperties
      }
    >
      <svg aria-hidden="true" viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0">
        <circle cx={c} cy={c} r={c} fill="var(--sindoor)" />
        <circle
          cx={c}
          cy={c}
          r={(c - ring).toFixed(2)}
          fill="none"
          stroke="var(--marigold)"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
      </svg>
      <span
        className="display relative text-center text-marigold"
        style={{ fontWeight: 800, fontSize, lineHeight: props.lang === "hi" ? 1.2 : 1.05, maxWidth: size - 2 * ring - 10 }}
      >
        {words}
      </span>
    </span>
  );
}
