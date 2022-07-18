import { Atom, MenuItemAtom, PageActions } from "@n-able/atoms";
import { Locator } from "@playwright/test";
import tabs from "devextreme/ui/tabs";

export class pokemon extends Atom{
  constructor (element :Locator
  ){
    super(element)
  }
  
get listItems(): Locator {
    return this.element.locator(".img");
  }
 get Items(): Locator {
    return this.listItems;
  }
     get text(): Locator {
    return this.page.locator("content-block >> nth=2");
  }

  async getItemCount(): Promise<number> {
return PageActions.count(this.listItems);

  }
async getImageByIndex(index: number): Promise<any> {
    const imageLocator: Locator = PageActions.getElementByIndex(this.listItems, index);

}
    async getTitle(): Promise<string> {
    // PAGE ACTIONS MEHTOD FOR get text
   return PageActions.getText(this.text)
  }
}