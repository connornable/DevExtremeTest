import { Atom, PageActions, TreeViewAtom,TableAtom,PaginatorAtom,PopupAtom} from "@n-able/atoms";
import { Locator, Page } from "@playwright/test";
import { on } from "events";


export class Pokemon  {
  private readonly navMenu : TreeViewAtom ;
 private readonly table:TableAtom;
  paginator: PaginatorAtom;
  popup:PopupAtom;
  //checkboxAtom:CheckboxAtom;

  constructor(private readonly page : Page) {
  this.navMenu =Atom.findIn(TreeViewAtom,this.page.locator("#Tasks"));
  this.table =Atom.findIn(TableAtom,this.page.locator("#pokemontable"));
  this.paginator =Atom.findIn(PaginatorAtom,this.page.locator("#pokemontable"));
  this.popup=Atom.findIn(PopupAtom,this.page.locator(".dx-popup-content >> nth=1"));
  }
get root():Locator{
  return this.page.locator(".dx-overlay-wrapper");
}
  // get clickCheckBox():Locator{
  //   return this.root.locator(".dx-item dx-list-item dx-list-item-selected").nth(0)
  // }
    async clickExamples():Promise<void>{
    await this.navMenu.getRootNode(1).click();
  }
  async clickTasks():Promise<void>{
     await this.navMenu.getRootNode(1).getChildNode(1).click();
  }
   async clickId(): Promise<void> {
   await this.table.clickHeaderCell(1);
  }
 async clickIdFilter():Promise<void>{
  await PageActions.click (this.table.getCell(0,1).locator(".dx-header-filter"));
 }
 async selectCheckbox():Promise<void>{
  await PageActions.click(this.popup.getPopupBox().locator(".dx-item dx-list-item ").nth(1));
 }
 async getHeaderRowText(): Promise<string> {
    return this.table.getHeaderRowText();
  }
 async pokemonRowCount():Promise<number>{
 return this.table.getTotalRowsCount()
 }
async pageNumberLinkClick(pageNumber: number): Promise<void>{
  return this.paginator.pageLinkClick(pageNumber);
}
async pokemsItemsPerPage(itemsPerPage: number | "All"): Promise<void>{
  return this.paginator.setItemsPerPage(itemsPerPage);
}
}
