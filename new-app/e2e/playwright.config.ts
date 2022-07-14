import {
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  Project,
} from "@playwright/test";
import { e2eModuleConfig } from "../src/config/palywright.module.config";
import { BrowserName } from "./src/enums/browser-name.enum";



const commonProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  use: {
    ...e2eModuleConfig.use,
    baseURL: "https://js.devexpress.com",
  },
};

const chromeProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "chrome",
  use: {
    ...commonProject.use,
    browserName: BrowserName.Chrome,
  },
};

const firefoxProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "firefox",
  use: {
    ...commonProject.use,
    browserName: BrowserName.Firefox,
  },
};

const safariProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "safari",
  use: {
    ...commonProject.use,
    browserName: BrowserName.Safari,
  },
};

const config: PlaywrightTestConfig = {
  ...e2eModuleConfig,
  // TODO: (QSR-1516) Pipeline does not currently support Firefox and Safari
  projects: process.env.CI ? [chromeProject] : [chromeProject, firefoxProject, safariProject],
};

export default config;