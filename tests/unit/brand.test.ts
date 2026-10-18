import { expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { TYPE } from "@/lib/palette";
import { brandTokens } from "../../scripts/brand-tokens.mjs";

/* brand/ is the kit anyone outside the repo builds from. Its tokens are
   generated from palette.ts by `npm run brand`; this fails when the two drift. */

it("brand/tokens.json is what palette.ts generates (run npm run brand)", () => {
  const onDisk = JSON.parse(readFileSync("brand/tokens.json", "utf8"));
  expect(onDisk).toEqual(JSON.parse(JSON.stringify(brandTokens())));
});

it("the type in palette.ts matches globals.css", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  const block = (name: string) => css.slice(css.indexOf(`@utility ${name} {`)).split("}")[0];
  const wordmark = block("wordmark");
  expect(wordmark).toContain(`font-weight: ${TYPE.roles.wordmark.weight}`);
  expect(wordmark).toContain(`letter-spacing: ${TYPE.roles.wordmark.letterSpacing}`);
  expect(wordmark).toContain(`line-height: ${TYPE.roles.wordmark.lineHeight}`);
  const label = block("label");
  expect(label).toContain(`font-size: ${TYPE.roles.label.size}`);
  expect(label).toContain(`line-height: ${TYPE.roles.label.lineHeight}`);
  const press = css.slice(css.indexOf(".press {")).split("}")[0];
  expect(press).toContain(`font-size: ${TYPE.roles.button.size}`);
  expect(press).toContain(`font-weight: ${TYPE.roles.button.weight}`);
});

it("every logo the README names exists", () => {
  for (const piece of ["mark", "wordmark", "lockup"])
    for (const edition of ["light", "dark", "on-marigold"])
      for (const ext of ["svg", "png"]) expect(existsSync(`brand/logo/${piece}-${edition}.${ext}`)).toBe(true);
});
