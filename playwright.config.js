import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "restfull-booker",
      testMatch: /.*restfull-booker\/.*\.spec\.js/,
    },
    {
      name: "reqres",
      testMatch: /.*reqres\/.*\.spec\.js/,
      use: {
        baseURL: "https://reqres.in",
        extraHTTPHeaders: {
          "x-api-key": process.env.REQRES_API_KEY || "",
        },
      },
    },
  ],
});
