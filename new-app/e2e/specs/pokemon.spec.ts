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
   test.beforeEach(async () => {
    await pokemon.clickTasks();
  });
test ("Click on the Id cell",async () =>{
 await pokemon.clickId();
})
test ("Click on the Id filter",async () =>{
 
  await pokemon.clickIdFilter();
})
test("click the checkbox",async () =>{
  await pokemon.selectCheckbox();
})
test("Get the pokemon header row text" , async () =>{
const expectedText = "Sprite,Id,Name,Height,Type,";
expect(await pokemon.getHeaderRowText()).toBe(expectedText)
})
test("Get the total rows count ",async () =>{
  expect(await pokemon.pokemonRowCount()).toBe(12);
})
test("Click on the pagenumbers link ", async () =>{
await pokemon.pageNumberLinkClick(3);
})
test("Click on the count page number links",async () =>{
await pokemon.pokemsItemsPerPage(10);
})
 });

