/* Renders the specimen Sankalp Patra at ad sizes: the 9:16 memento and the 4:5 sheet,
   in English and Hindi, from today's live figure. Run from the repo root:
   npx tsx --conditions=react-server --env-file=.env.local ads/src/render-patra.ts */
import { writeFile } from "node:fs/promises";
import { renderPatra, renderPatraSheet } from "@/lib/patra-image";
import { specimenView } from "@/lib/specimen";

async function main() {
  for (const lang of ["en", "hi"] as const) {
    const view = await specimenView(lang, new Date());
    await writeFile(`ads/out/patra-916-${lang}.png`, await renderPatra(view));
    await writeFile(`ads/out/patra-45-${lang}.png`, await renderPatraSheet(view));
    console.log(lang, "done");
  }
}

main();
