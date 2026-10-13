import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { config } from "@/proxy";

/* ---------------------------------------------------------------------------
   The proxy leaves BotID's paths alone.

   `withBotId` rewrites a fixed prefix to Vercel's bot check, and those
   rewrites run after the proxy. A path the proxy catches gets the locale
   rewrite and the site's own 404, the challenge script never loads, and every
   server action that calls `checkBotId()` (saving setup, paying) dies in the
   browser. The prefix is read from the installed package, so an upgrade that
   moves it fails here rather than at the pay button.
   --------------------------------------------------------------------------- */

const BOTID_CONFIG = "node_modules/botid/dist/next/config/index.mjs";

function botidPaths(): { challenge: string; proxy: string } {
  const src = readFileSync(BOTID_CONFIG, "utf8");
  const challenge = src.match(/"(\/[0-9a-f-]{36}\/[0-9a-f-]{36}\/[^"]+\.js)"/)?.[1];
  const prefix = src.match(/"(\/[0-9a-f-]{36}\/[0-9a-f-]{36})"/)?.[1];
  if (!challenge || !prefix) throw new Error(`BotID's paths are no longer where ${BOTID_CONFIG} kept them`);
  return { challenge, proxy: `${prefix}/p.js` };
}

/** The matcher as Next applies it: the whole pathname, anchored. */
function matches(pathname: string): boolean {
  return config.matcher.some((m) => new RegExp(`^${m}$`).test(pathname));
}

describe("the proxy matcher", () => {
  it("skips BotID's challenge and proxy paths", () => {
    const { challenge, proxy } = botidPaths();
    expect(matches(challenge)).toBe(false);
    expect(matches(proxy)).toBe(false);
  });

  it("still runs for pages, product paths and stray dotted paths", () => {
    for (const path of ["/", "/rivers", "/hi/live", "/begin", "/setup", "/wp-login.php"]) {
      expect(matches(path), path).toBe(true);
    }
  });
});
