import { Frame, FrameLocator, Locator, Page } from "@playwright/test/types/test";
import { Atom, TreeViewNodeAtom } from "@n-able/atoms";
import { PageActions } from "@n-able/atoms";
import { BasePage } from "../src/page-objects/base-page.po";

export abstract class DevExtremeBase extends BasePage{
  
   get folder(): Locator {
    return this.page.locator(". dx-icon-folder");
  }

   get demoOverlay(): Locator {
    return this.page.locator(".dx-overlay-wrapper");
  }

  constructor(page: Page, route: string) {
    super(page, route);
  }


}
