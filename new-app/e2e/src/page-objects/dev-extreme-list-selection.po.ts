import { test, Page, expect, Locator } from "@playwright/test";

import { Atom } from "@n-able/atoms";
import { SelectAtom } from "@n-able/atoms";
import { PageActions } from "@n-able/atoms";

import { DevExtremeListBase } from "./dev-extreme-list-base.po";

export class DevExtremeListSelection extends DevExtremeListBase {
  private _selectionMode: SelectAtom;

  private get optionSelects(): Locator {
    return this.demoContainer.locator(`.${SelectAtom.CSS_CLASS}`);
  }

  get selectionMode(): SelectAtom {
    return Atom.initialise(this._selectionMode, () => {
      const select = PageActions.getElementByIndex(this.optionSelects, 0);
      return new SelectAtom(select);
    });
  }

  constructor(page: Page) {
    super(page, "/Demos/WidgetsGallery/Demo/List/ListSelection/Angular/Light");
  }
}
