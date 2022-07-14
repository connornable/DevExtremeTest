import { Page } from "@playwright/test";

 import { PageActions } from "@n-able/atoms";

export abstract class BasePage {
  constructor(protected readonly page: Page, protected readonly route: string) {}

  async goTo(url: string = this.route): Promise<void> {
    await PageActions.goTo(this.page, url);
  }
}