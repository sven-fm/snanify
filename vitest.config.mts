import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/* Unit tests only. Browser flows live under tests/e2e and run with Playwright,
   which has its own config; the two directories never overlap. */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      /* `server-only` is a build-time guard: importing it outside a React
         Server Component throws. Vitest is neither, so it resolves to an empty
         module here and the guard keeps doing its job in the app. */
      "server-only": fileURLToPath(new URL("./tests/unit/helpers/empty.ts", import.meta.url)),
    },
  },
  test: {
    /* The portrait test presses a photograph through sharp, which takes two
       seconds here and more on a shared CI runner. */
    testTimeout: 30000,
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    coverage: { provider: "v8", reporter: ["text"] },
  },
});
