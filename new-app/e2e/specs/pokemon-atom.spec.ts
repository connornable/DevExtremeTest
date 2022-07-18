import { getInterpolationArgsLength } from "@angular/compiler/src/render3/view/util";
import { MenuItemAtom, PageActions } from "@n-able/atoms";
import { test, Page, expect } from "@playwright/test";
import { DevExtremeTreeView } from "../page-objects/dev-extreme-tree-view.po";
import { DevExtreme } from "../page-objects/dev-extreme.po";
import { pokemon } from "../src/atoms/pokemon-atoms";
import { TreeViewNodeAtom } from "../src/atoms/tree-view/tree-view-node-atoms";



test.describe("Task List>", () => {
 let page: Page;
  let pokemon:pokemon;
  let devExtreme : DevExtreme;
 

 
  test.beforeAll(async ({ browser }) => {
    page = await (await browser.newContext()).newPage();
    await page.goto("/home");
    devExtreme = new DevExtreme(page);

  });

  test("click on Example", async () =>{
await devExtreme.clickExamples()
  })

// test("GET TITLE",async () => {
//    expect(await pokemon.getTitle()).toBe("Pokemon");
// })
// test("Get Count of images",async () => {
//    expect(await pokemon.getItemCount(this.listItems()));
// })

});
