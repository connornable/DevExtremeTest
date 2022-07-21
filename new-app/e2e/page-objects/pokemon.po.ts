import { Atom, PageActions, TreeViewAtom,TableAtom,PaginatorAtom,PopupAtom, ButtonAtom,DialogAtom} from "@n-able/atoms";
import { Locator, Page } from "@playwright/test";
import { on } from "events";


export class Pokemon  {
  private readonly navMenu : TreeViewAtom ;
 private readonly table:TableAtom;
  paginator: PaginatorAtom;
  dialog:DialogAtom;
  button:ButtonAtom;

  //checkboxAtom:CheckboxAtom;

  constructor(private readonly page : Page) {
  this.navMenu =Atom.findIn(TreeViewAtom,this.page.locator("#Tasks"));
  this.table =Atom.findIn(TableAtom,this.page.locator("#pokemontable"));
  this.paginator =Atom.findIn(PaginatorAtom,this.page.locator("#pokemontable"));
  this.dialog=Atom.findIn(DialogAtom,this.page.locator(".dx-popup-wrapper"));
    this.button=Atom.findIn(ButtonAtom,this.page.locator("#Show"));
  }
get root():Locator{
  return this.page.locator(".dx-overlay-wrapper");
}
  get CheckBox():Locator{
    return this.root.locator(".dx-scrollview-content >> .dx-item.dx-list-item").nth(0);
  }
 async IsDailogOpened(): Promise<boolean> {
  return this.dialog.isDisplayed();
 }
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
  await PageActions.click(this.CheckBox);
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
async clickOnPokemonRow(indexNumber:number){
  return this.table.clickRow(indexNumber);
}
async clickOnButton():Promise<void>{
  return this.button.click();
}
async getImagesSource():Promise<string>{
  const image :Locator = this.dialog.getElement().locator("img")
return`${await PageActions.getAttribute(image,"src")}`
}
async closeDialog():Promise<void>{
return this.dialog.clickCloseButton();
}

}
