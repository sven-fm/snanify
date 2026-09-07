import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/* Unit tests only. Browser flows live under tests/e2e and run with Playwright,
   which has its own config; the two directories never overlap. */
export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    coverage: { provider: "v8", reporter: ["text"] },
  },
});
