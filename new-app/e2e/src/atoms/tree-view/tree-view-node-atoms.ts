import { Locator } from "@playwright/test/types/test";
import { Atom} from "@n-able/atoms";
import { PageActions } from "@n-able/atoms";

export class TreeViewNodeAtom extends Atom {
  
  static override CSS_CLASS = "dx-treeview-node";

 private readonly childNodeContainerSelector = "xpath=./ul";

 get text(): Locator {
    return this.content.locator("span");
  }

   get content(): Locator {
    return this.element.locator(".dx-item-content >> nth=1");
  }

 get expander(): Locator {
    return this.element.locator(".dx-treeview-toggle-item-visibility >> nth=1");
  }


   get childNodeContainer(): Locator {
    return this.element.locator(this.childNodeContainerSelector);
  }

 
  get childNodes(): Locator {
    return this.element.locator(`${this.childNodeContainerSelector}/li`);
  }

  constructor(element: Locator) {
    super(element);
  }
  
 async waitForExpanderToBeClickable(): Promise<void> {
    await PageActions.waitForElementToBeClickable(this.expander);
  }


  async getText(): Promise<string> {
    return PageActions.getText(this.text);
  }
 async clickExpander(): Promise<void> {
    await PageActions.click(this.expander);
    await PageActions.waitForElementToBeStable(this.childNodeContainer);
  }
  async expandedGrandchildNodeClick():Promise<void> {
    await PageActions.click(this.childNodes)
  }
    async isVisible(): Promise<boolean> {
    return PageActions.isVisible(this.element);
  }

   getChildNode(index: number): TreeViewNodeAtom {
    const nodeLocator = PageActions.getElementByIndex(this.childNodes, index);
    return new TreeViewNodeAtom(nodeLocator);
  }

  

}
