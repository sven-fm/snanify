import Link from "next/link";

/* Shared primitives. Everything visual that more than one page needs lives
   here so the ghat pages, booking flow and marketing pages stay one system. */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inscription flex items-center gap-3 text-[0.68rem] text-gold">
      <span className="h-px w-8 bg-gold/50" />
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
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display mt-5 text-4xl sm:text-5xl">{title}</h2>
      {lede && <p className="mt-5 text-ink2">{lede}</p>}
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
      className={`scroll-mt-20 border-t border-line/60 ${tinted ? "bg-bg2/40" : ""} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300 whitespace-nowrap";

const buttonVariants = {
  solid:
    "bg-gold text-bg font-medium hover:brightness-110 shadow-[0_8px_30px_-12px_var(--gold)] hover:shadow-[0_12px_36px_-10px_var(--gold)] hover:-translate-y-0.5",
  ghost: "border border-line text-ink hover:border-gold hover:text-gold",
  quiet: "text-ink2 hover:text-gold",
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

/** A real link styled as a button. */
export function LinkButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

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
      className={`rounded-2xl border p-8 transition-all duration-500 ${
        featured
          ? "border-gold/60 bg-bg2 shadow-[0_30px_80px_-40px_var(--gold)]"
          : "border-line/70 bg-bg2/40 hover:border-ink2/40"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Status pill. The dot only pulses when `live` is true — a pulsing dot reads as
 * "a stream is running right now", so it must never decorate a static label.
 */
export function StatusBadge({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  return (
    <p className="inscription inline-flex items-center gap-2.5 rounded-full border border-line/70 bg-bg2/60 px-4 py-1.5 text-[0.62rem] text-ink2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-teal" : "bg-ink2/40"}`}
        style={live ? { animation: "pulse-dot 2.4s ease-in-out infinite" } : undefined}
      />
      {children}
    </p>
  );
}
