import {
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  Project,
} from "@playwright/test";
import { BrowserName } from "../../e2e/src/enums/browser-name.enum";
import { EnvironmentType } from "../../e2e/src/enums/environment-type.enum";

enum Directory {
  E2e = "./e2e",
  SmokeTesting = "./smoke-tests/testing",
  SmokeStaging = "./smoke-tests/staging",
  SmokeProduction = "./smoke-tests/production",
}

function getReportsPathPrefix(): string {
  switch (process.env.envType) {
    case EnvironmentType.Testing:
      return Directory.SmokeTesting;
    case EnvironmentType.Staging:
      return Directory.SmokeStaging;
    case EnvironmentType.Production:
      return Directory.SmokeProduction;
    default:
      return Directory.E2e;
  }
}

const reportsFolder = "/reports";
const reportsPath = `${getReportsPathPrefix()}${reportsFolder}`;

const recordingsFolder = `${reportsFolder}/recordings`;

export const e2eApplicationConfigBaseUrl: string = process.env.baseUrl ?? "http://localhost:4200";
export const e2eApplicationConfigBaseSuite: Project<
  PlaywrightTestOptions,
  PlaywrightWorkerOptions
> = {
  retries: 0,
  timeout: 120000,
  use: {
    baseURL: e2eApplicationConfigBaseUrl,
    browserName: BrowserName.Chrome,
    headless: true,
    screenshot: "only-on-failure",
    trace: { mode: "retain-on-failure", screenshots: false, snapshots: true, sources: false },
    viewport: {
      width: 1920,
      height: 1080,
    },
  },
};

export const e2eApplicationE2eSuite: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  ...e2eApplicationConfigBaseSuite,
  name: "e2e",
  outputDir: `${Directory.E2e}${recordingsFolder}`,
  testDir: `${Directory.E2e}/specs`,
};

export const e2eApplicationE2eLocalSuite: Project<
  PlaywrightTestOptions,
  PlaywrightWorkerOptions
> = {
  ...e2eApplicationE2eSuite,
  name: "e2e-local",
};

export const e2eApplicationTestingSuite: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  ...e2eApplicationConfigBaseSuite,
  name: "smoke-testing",
  outputDir: `${Directory.SmokeTesting}${recordingsFolder}`,
  testDir: Directory.SmokeTesting,
};

export const e2eApplicationStagingSuite: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  ...e2eApplicationConfigBaseSuite,
  name: "smoke-staging",
  outputDir: `${Directory.SmokeStaging}${recordingsFolder}`,
  testDir: Directory.SmokeStaging,
};

export const e2eApplicationProductionSuite: Project<
  PlaywrightTestOptions,
  PlaywrightWorkerOptions
> = {
  ...e2eApplicationConfigBaseSuite,
  name: "smoke-production",
  outputDir: `${Directory.SmokeProduction}${recordingsFolder}`,
  testDir: Directory.SmokeProduction,
};

/**
 * Limitations (including configuration previously supported by Protractor but not Playwright):
 * - Ability to define the HTML report name. It will always default to `index.html` but was `report.html` with Protractor
 * - HTML report will remove the JUnit report when they are written to the same folder
 */
export const e2eApplicationConfig: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  maxFailures: 1,
  projects: [],
  reporter: [
    ["list"],
    ["junit", { outputFile: `${reportsPath}/junit/results.xml` }],
    [
      "html",
      {
        outputFolder: `${reportsPath}/html`,
        open: process.env.CI ? "never" : "on-failure",
      },
    ],
  ],
  workers: 4,
};