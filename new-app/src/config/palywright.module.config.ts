import { PlaywrightTestConfig } from "@playwright/test";
import { BrowserName } from "../../e2e/src/enums/browser-name.enum";



export const e2eModuleConfig: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  maxFailures: 5,
  outputDir: "./reports/recordings",
  reporter: [
    ["list"],
    ["junit", { outputFile: "./e2e/reports/junit/results.xml" }],
    ["html", { outputFolder: "./reports/html" }],
  ],
  retries: 0,
  testDir: "./specs",
  timeout: 180000,
  use: {
    baseURL: "http://localhost:4200",
    browserName: BrowserName.Chrome,
    headless: true,
    screenshot: "only-on-failure",
    trace: { mode: "retain-on-failure", screenshots: false, snapshots: true, sources: false },
    viewport: {
      width: 1280,
      height: 720,
    },
  },
  workers: 4,
};