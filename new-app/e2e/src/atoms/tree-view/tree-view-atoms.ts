import { Locator } from "@playwright/test";

import { PageActions } from "@n-able/atoms";
import { Atom } from "@n-able/atoms";
import { TreeViewNodeAtom } from "@n-able/atoms";

export class TreeViewAtom extends Atom {
  static CSS_CLASS = "dx-treeview";

  private get rootNodes(): Locator {
    return this.element.locator("[aria-level='1']");
  }

  /**
   * @param element The root element of the DevExtreme Tree View component is a `<dx-tree-view>` tag with a `dx-treeview` class
   */
  constructor(element: Locator) {
    super(element);
  }

  /**
   * This gets all nodes in the root element by name with an EXACT case sensitive match
   */
  async getNodesByName(name: string): Promise<TreeViewNodeAtom[]> {
    const nodes: Locator = PageActions.getElementByText(this.element, name);
    const count: number = await PageActions.count(nodes);
    const nodeAtoms: TreeViewNodeAtom[] = [];

    for (let i = 0; i < count; i++) {
      const node: Locator = PageActions.getElementByIndex(nodes, i);
      const nodeRoot: Locator = node.locator(
        `xpath=ancestor::div[contains(@class, '${TreeViewNodeAtom.CSS_CLASS}')]`
      );

      nodeAtoms.push(new TreeViewNodeAtom(nodeRoot));
    }

    return nodeAtoms;
  }

  async expandAll(): Promise<void> {
    const count: number = await this.getRootNodesCount();

    for (let i = 0; i < count; i++) {
      const node: TreeViewNodeAtom = this.getRootNode(i);
      const isExpandable: boolean = await node.hasExpander();
      const isExpanded: boolean = await node.isExpanded();

      if (isExpandable && !isExpanded) {
        await node.clickExpander();
      }

      await this.expandChildNodes(node);
    }
  }

  async getRootNodesCount(): Promise<number> {
    return PageActions.count(this.rootNodes);
  }

  getRootNode(index: number): TreeViewNodeAtom {
    const nodeLocator = PageActions.getElementByIndex(this.rootNodes, index);
    return new TreeViewNodeAtom(nodeLocator);
  }

  private async expandChildNodes(node: TreeViewNodeAtom): Promise<void> {
    const childCount: number = await node.getChildNodesCount();

    for (let j = 0; j < childCount; j++) {
      const childNode: TreeViewNodeAtom = node.getChildNode(j);
      const isChildNodeExpandable: boolean = await childNode.hasExpander();
      const isChildNodeExpanded: boolean = await childNode.isExpanded();

      if (isChildNodeExpandable && !isChildNodeExpanded) {
        await childNode.clickExpander();
      }

      await this.expandChildNodes(childNode);
    }
  }
}