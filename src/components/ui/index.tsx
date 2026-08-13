import Link from "next/link";
import { CURRENCIES } from "@/lib/currency";
import type { Prices, TierKey } from "@/content/prices";
import { PRICE } from "@/content/prices";

/* Shared primitives, cut for the printed panchang. Everything here is flat:
   solid fills, hard rules, one spot colour. No radius, no soft shadow. */

/** A section label, set as a ruled column heading. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-spot">
      <span className="h-[2px] w-6 bg-spot" />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display mt-4 text-[2.1rem] sm:text-[2.9rem]">{title}</h2>
      {lede && <p className="mt-5 max-w-2xl leading-relaxed text-ink2">{lede}</p>}
    </div>
  );
}

export function Section({
  id,
  tinted = false,
  children,
  className = "",
}: {
  id?: string;
  tinted?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 border-t-2 border-rulestrong ${tinted ? "tint" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">{children}</div>
    </section>
  );
}

const buttonBase =
  "label inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-colors duration-150";

const buttonVariants = {
  /* The press impression: solid spot colour, inverted type. */
  solid: "bg-spot text-paper hover:bg-ink hover:text-paper",
  /* A ruled box that fills with ink on hover. Opaque, not transparent: the
     hero sits this button on top of the river, and ripples reading through the
     type made the label almost unreadable. */
  ghost: "border border-rulestrong bg-paper text-ink hover:bg-ink hover:text-paper",
  quiet: "text-ink underline decoration-spot decoration-2 hover:text-spot px-0 py-1",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

export function buttonClass(variant: ButtonVariant = "solid", className = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${className}`;
}

/** Visual-only button surface, for wrapping in an <a> or <Link>. */
export function CTA({
  children,
  variant = "solid",
  className = "",
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return <span className={buttonClass(variant, className)}>{children}</span>;
}

export function LinkButton({
  href,
  hrefLang,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  /** Set when the target is in another language, which `deepHref` decides. */
  hrefLang?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} hrefLang={hrefLang} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

/**
 * A ruled block. `featured` gets the misregistered second impression rather
 * than a glow, the two-colour press slipping by a few points.
 */
export function Card({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`boxed p-7 ${featured ? "misregister border-2" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * A boxed label. The square only fills with the spot colour when something is
 * genuinely live, it must never decorate a static line.
 */
export function StatusBadge({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  return (
    <p className="label inline-flex items-center gap-2.5 border border-rulestrong px-3 py-2 text-ink">
      <span className={`h-2 w-2 ${live ? "bg-spot" : "border border-ink2"}`} />
      {children}
    </p>
  );
}

/**
 * A two-column ruled data row, the almanac's basic unit.
 * Used wherever the old design would have reached for a card.
 */
export function DataRow({
  term,
  children,
  className = "",
}: {
  term: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-1 border-b border-rule py-3 sm:grid-cols-[11rem_1fr] sm:gap-6 ${className}`}
    >
      <dt className="label pt-1 text-ink2">{term}</dt>
      <dd className="text-ink">{children}</dd>
    </div>
  );
}

/**
 * One price, in the reader's own currency.
 *
 * Every currency is written into the markup and CSS shows exactly one, keyed
 * off `data-cur` on <html>. That is what lets a page carrying prices stay fully
 * prerendered: no request-time render, no client fetch, and no flash of the
 * wrong number. See src/lib/currency.ts.
 */
export function Price({ prices, className = "" }: { prices: Prices; className?: string }) {
  return (
    <>
      {CURRENCIES.map((c) => (
        <span key={c} className={`cur cur-${c} ${className}`}>
          {prices[c]}
        </span>
      ))}
    </>
  );
}

/**
 * A sentence with a price in it, filled from prices.ts at render.
 *
 * Copy writes `{price:eleven}` and gets the reader's own currency, the same
 * way `{price}` works on the landing hero. A locale file that spells a figure
 * out ships one currency to twelve audiences, which is the bug this exists to
 * prevent: a rupee price read in Toronto is simply the wrong number.
 */
export function PriceText({ children }: { children: string }) {
  const parts = children.split(/(\{price:(?:one|eleven|sixty)\})/);
  return (
    <>
      {parts.map((part, i) => {
        const tier = /^\{price:(one|eleven|sixty)\}$/.exec(part);
        return tier ? (
          <span key={i} className="tabular-nums">
            <Price prices={PRICE[tier[1] as TierKey]} />
          </span>
        ) : (
          part
        );
      })}
    </>
  );
}
