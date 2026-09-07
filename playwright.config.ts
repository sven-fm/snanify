import { defineConfig, devices } from "@playwright/test";

/* Browser tests. The viewport is the one the site is designed for first,
   390 by 844, because over ninety percent of readers arrive on a phone. Pixel 5 is the
   Chromium phone profile; only Chromium is installed. */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 60_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Pixel 5"],
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
