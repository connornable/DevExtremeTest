import { Atom, PageActions, TreeViewAtom,TableAtom,PaginatorAtom,PopupAtom, ButtonAtom,DialogAtom,TabHeadingGroupAtom,CheckboxAtom} from "@n-able/atoms";
import { Locator, Page } from "@playwright/test";
import { on } from "events";


export class Pokemon  {
  private readonly navMenu : TreeViewAtom ;
 private readonly table:TableAtom;
  paginator: PaginatorAtom;
  dialog:DialogAtom;
  button:ButtonAtom;
  tab:TabHeadingGroupAtom;
  workstationCheckbox:CheckboxAtom;
  serverStationCheckbox:CheckboxAtom;
  laptopCheckbox:CheckboxAtom;

  constructor(private readonly page : Page) {
  this.navMenu =Atom.findIn(TreeViewAtom,this.page.locator("#Tasks"));
  this.table =Atom.findIn(TableAtom,this.page.locator("#pokemontable"));
  this.paginator =Atom.findIn(PaginatorAtom,this.page.locator("#pokemontable"));
  this.dialog=Atom.findIn(DialogAtom,this.page.locator(".dx-popup-wrapper"));
  this.button=Atom.findIn(ButtonAtom,this.page.locator("#Show"));
  this.tab =Atom.findIn(TabHeadingGroupAtom,this.page.locator("#monitorDevices"));
  this.serverStationCheckbox=Atom.findIn(CheckboxAtom,this.page.locator("#monitorDevices"),0) ;
  this.workstationCheckbox=Atom.findIn(CheckboxAtom,this.page.locator("#monitorDevices"),1) ;
  this.laptopCheckbox=Atom.findIn(CheckboxAtom,this.page.locator("#monitorDevices"),1) ;
  }
get root():Locator{
  return this.page.locator(".dx-list-group");
}
   get deviceDropDown():Locator{
    return this.root.locator(".dx-list-group-header >> nth=0",);
   }
  get osDropDown():Locator{
    return this.root.locator(".dx-list-group-header >> nth=1",);
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
async getRowText(indexNumber:number){
return this.table.getRowText(indexNumber);
}
async clickFiltersIcon(indexnumber:number):Promise<void>{
  await (await this.tab.getTabByIndex(indexnumber)).click();
}

async selectWorkstationCheckBox() :Promise<void>{
  await this.workstationCheckbox.setChecked(true);
}
async deselectWorkstationCheckBox() :Promise<void>{
  await this.workstationCheckbox.setChecked(false);
}
async selectServersCheckbox():Promise<void>{
  await this.serverStationCheckbox.setChecked(true);
}
async deselectServersCheckbox():Promise<void>{
  await this.serverStationCheckbox.setChecked(false);
}
async selectLaptopsCheckbox():Promise<void>{
  await this.laptopCheckbox.setChecked(true);
}
async  deselectLaptopsCheckbox():Promise<void>{
  await this.laptopCheckbox.setChecked(false);
}
async isWorkstationCheckBoxDisplayed() :Promise<boolean>{
  return this.workstationCheckbox.isDisplayed();
}

async waitForWorkstationCheckBoxToBeDisplayed() :Promise<void>{
  const checkbox: Locator = this.workstationCheckbox.getElement();
  await PageActions.waitForElementToBeVisible(checkbox, 3000);
}
async clickOnDevicesDropDown():Promise<void>{
 await this.deviceDropDown.click();
}
async clickOnOsDropDown():Promise<void>{
await this.osDropDown.click();
}
}


