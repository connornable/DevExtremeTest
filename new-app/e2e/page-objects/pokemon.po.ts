import { Atom, PageActions, TreeViewAtom,TableAtom} from "@n-able/atoms";
import { Locator, Page } from "@playwright/test";


export class Pokemon {
  private readonly navMenu : TreeViewAtom ;
 private readonly table:TableAtom;
 private readonly rowTable:TableAtom; 
 private readonly rows:TableAtom;
  constructor(private readonly page : Page) {
    this.navMenu =Atom.findIn(TreeViewAtom,this.page.locator("#Tasks"));
  this.table =Atom.findIn(TableAtom,this.page.locator("#pokemontable"));
  this.rowTable =Atom.findIn(TableAtom,this.page.locator(".dx-datagrid-table"));
  this.rows=Atom.findIn(TableAtom,this.page.locator(".dx-row"));
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
 async pokemonRowCount():Promise<number>{
return  this.rowTable.getTotalRowsCount();
 }

 }
