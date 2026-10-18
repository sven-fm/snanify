/* ---------------------------------------------------------------------------
   The band: a strip of ink with marigold Martel 800 words, turned -2deg,
   running off both edges of the column. It says the one thing to do. At most
   one per page, and only on the selling pages (the landing, /snan, /begin)
   and the snan's ready screen; never on the Patra or inside the sitting.

   It overhangs the column by `bleed` on each side and the turn lifts its
   corners further, so its parent clips it (overflow-x: clip on the section),
   never the page scrolling sideways at 390px.
   --------------------------------------------------------------------------- */

export function Band({
  children,
  bleed = "1.25rem",
  className = "",
}: {
  children: React.ReactNode;
  /** How far it runs past the column on each side: the column's own gutter. */
  bleed?: string;
  className?: string;
}) {
  return (
    <p
      data-band
      className={`relative py-2 font-body dark:border-y-2 dark:border-ink text-[0.9375rem] leading-[1.3] text-marigold ${className}`}
      style={{
        fontWeight: 800,
        transform: "rotate(-2deg)",
        marginInline: `calc(${bleed} * -1)`,
        paddingInline: `calc(${bleed} + 0.25rem)`,
        /* The day ink in both editions: marigold on the light night ink would
           not read. At night a light ink edge keeps the strip off the paper. */
        backgroundColor: "var(--on-marigold)",
      }}
    >
      {children}
    </p>
  );
}
