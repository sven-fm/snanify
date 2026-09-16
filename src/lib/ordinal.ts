/**
 * "42nd", not "42th". English ordinals for the percentile rank; Hindi keeps
 * the bare number, because its suffix is in the copy ("{n}वाँ").
 */
export function ordinal(n: number, lang: string = "en"): string {
  if (lang !== "en") return String(n);
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
