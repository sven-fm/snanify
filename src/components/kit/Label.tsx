import type { Prices } from "@/content/prices";
import { Price } from "@/components/ui";

/* ---------------------------------------------------------------------------
   The matchbox label: marigold ground, a 3px ink frame, a 1.5px sindoor rule
   inset, the words centred. Used sparingly: only for the eleven-morning pack,
   on the landing and /begin. Nowhere else.

   The ink on marigold is the day ink in both editions, because marigold does
   not change at night and the night's light ink would vanish on it.
   --------------------------------------------------------------------------- */

export function Label({
  kicker,
  title,
  price,
  className = "",
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  price?: Prices;
  className?: string;
}) {
  return (
    <div data-label className={`bg-marigold p-[5px] ${className}`} style={{ border: "3px solid var(--ink)", color: "var(--on-marigold)" }}>
      <div className="px-3 py-2.5 text-center" style={{ border: "1.5px solid var(--sindoor)" }}>
        {kicker ? (
          <p className="font-body text-[0.75rem] leading-[1.4]" style={{ fontWeight: 700, color: "var(--sindoor)" }}>
            {kicker}
          </p>
        ) : null}
        <p className="display text-[1.5rem] leading-[1.05]" style={{ fontWeight: 800 }}>
          {title}
        </p>
        {price ? (
          <p className="display tabular-nums text-[1.25rem] leading-[1.2]" style={{ fontWeight: 800, color: "var(--sindoor)" }}>
            <Price prices={price} />
          </p>
        ) : null}
      </div>
    </div>
  );
}
