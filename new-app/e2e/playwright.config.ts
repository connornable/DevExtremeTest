import { PlaywrightTestConfig } from "@playwright/test";
import { e2eModuleConfig } from "@n-able/atoms";

const config: PlaywrightTestConfig = {
  ...e2eModuleConfig,
}

export default config;