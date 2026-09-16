/* ---------------------------------------------------------------------------
   A small rate limit, per instance, for the routes that draw a sheet.

   Drawing a Sankalp Patra costs about a second of CPU. The share image is
   almost always a redirect to the stored file and the specimen is cached an
   hour for strangers, so an honest reader never meets this; a script pulling
   the routes in a loop meets it fast. It is per function instance, so a
   determined flood still needs the WAF rule in plan.md; this is the floor.
   --------------------------------------------------------------------------- */

const hits = new Map<string, { n: number; from: number }>();

/** True when `key` may have another go within its window. */
export function allow(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const cur = hits.get(key);
  if (!cur || now - cur.from > windowMs) {
    hits.set(key, { n: 1, from: now });
    if (hits.size > 5000) for (const [k, v] of hits) if (now - v.from > windowMs) hits.delete(k);
    return true;
  }
  cur.n += 1;
  return cur.n <= limit;
}

/** The caller, as well as a request can say. */
export function clientKey(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : request.headers.get("x-real-ip")) || "anon";
}
