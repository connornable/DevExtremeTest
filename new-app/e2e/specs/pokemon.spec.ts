import { test, Page, expect } from "@playwright/test";
import { Pokemon } from "../page-objects/pokemon.po";

test.describe("Task List>", () => {
 let page: Page;
  let pokemon : Pokemon;
 
  test.beforeAll(async ({ browser }) => {
    page = await (await browser.newContext()).newPage();
    await page.goto("/home");
    pokemon = new Pokemon(page);

  });

  test("click on Example", async () =>{
await pokemon.clickExamples()
  })

// test("GET TITLE",async () => {
//    expect(await pokemon.getTitle()).toBe("Pokemon");
// })
// test("Get Count of images",async () => {
//    expect(await pokemon.getItemCount(this.listItems()));
// })

});
