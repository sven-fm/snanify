/* ---------------------------------------------------------------------------
   The public identifier for a Sankalp Patra.

   A Patra's URL is snanify.com/p/<id>, and that URL is the share. It gets
   pasted into a family WhatsApp group, read off a screen, and occasionally
   typed. So the alphabet is base58: Bitcoin's, which drops 0, O, I and l
   because those are the four characters people transcribe wrongly, and drops
   the punctuation that breaks a double-click selection or a URL parser.

   Twenty-two characters of base58 is about 129 bits. That is what makes a
   Patra link-shareable with no login on it: guessing one is not a thing anyone
   can do, so the link itself is the capability.

   WHY REJECTION SAMPLING. `byte % 58` looks fine and is not: 256 is not a
   multiple of 58, so the first 24 characters of the alphabet come up about 27%
   more often than the last 34. That is a real bias in the only secret this
   product has. Bytes at or above the largest multiple of 58 are thrown away
   and redrawn instead, which costs a few extra bytes and nothing else.
   --------------------------------------------------------------------------- */

export const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export const ID_LENGTH = 22;

/** The largest multiple of 58 that fits in a byte. Bytes at or above it are rejected. */
const CEILING = Math.floor(256 / BASE58.length) * BASE58.length;

/**
 * A new identifier. Uses the platform's CSPRNG, which exists in Node, in the
 * browser and in the Vercel runtime alike.
 */
export function newId(): string {
  let out = "";
  const buf = new Uint8Array(ID_LENGTH);

  while (out.length < ID_LENGTH) {
    crypto.getRandomValues(buf);
    for (const byte of buf) {
      if (byte >= CEILING) continue;
      out += BASE58[byte % BASE58.length];
      if (out.length === ID_LENGTH) break;
    }
  }

  return out;
}

const ID_RE = new RegExp(`^[${BASE58}]{${ID_LENGTH}}$`);

/**
 * Whether a string is shaped like one of ours. Route handlers call this before
 * touching the database, so a malformed path segment never becomes a query.
 */
export function isId(value: string): boolean {
  return ID_RE.test(value);
}
