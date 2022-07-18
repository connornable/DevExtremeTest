import { Atom, TreeViewAtom } from "@n-able/atoms";
import { Page } from "@playwright/test";

export class Pokemon {
  private readonly navMenu : TreeViewAtom ;

  constructor(private readonly page : Page) {
    this.navMenu =Atom.findIn(TreeViewAtom,this.page.locator("#Tasks"))
  }

  async clickExamples():Promise<void>{
    await this.navMenu.getRootNode(1).click()
  }
}