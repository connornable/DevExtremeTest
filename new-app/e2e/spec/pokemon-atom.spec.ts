import { PageActions } from "@n-able/atoms";
import { test, Page, expect } from "@playwright/test";
import { DevExtremeTreeView } from "../page-objects/dev-extreme-tree-view.po";
import { TreeViewNodeAtom } from "../src/atoms/tree-view/tree-view-node-atoms"


test.describe("Task List>", () => {
  let page: Page;
  let devExTree: DevExtremeTreeView;
  let rootNode: TreeViewNodeAtom;
  let expandedChildNode: TreeViewNodeAtom;
  let expandedGrandchildNode: TreeViewNodeAtom;

test.beforeAll(async ({ browser }) => {
    page = await PageActions.openNewBrowserAndTab(browser);
  });


  async function treeViewOverviewBeforeSteps(pageContext: Page): Promise<DevExtremeTreeView> {
    devExTree = new DevExtremeTreeView(pageContext);
    // Example
     rootNode = devExTree.treeView.getRootNode(0);
    //  Profile
    expandedChildNode = rootNode.getChildNode(0);
    // Task
    expandedGrandchildNode = expandedChildNode.getChildNode(1);
    return devExTree;
  }

   test.describe("Expand the Example Node >", () => {

    test.beforeEach(async () => {
        await treeViewOverviewBeforeSteps(page);
      });
      test("Click Example Node Expander", async () => {
      await rootNode.clickExpander();
     expect(await expandedGrandchildNode.isVisible()).toBe(true);
      expect(await expandedGrandchildNode.getText).toBe("Tasks");


  })
});
});
