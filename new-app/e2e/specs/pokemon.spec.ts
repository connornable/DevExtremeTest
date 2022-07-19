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
await pokemon.clickExamples();
  });

test("click on the task bar ",async () => {
  await pokemon.clickTasks();
});
test ("Click on the Id cell",async () =>{
  await pokemon.clickId();
})
test ("Click on the Id filter",async () =>{
  await pokemon.clickIdFilter();
})
test.only("Get the total rows count ",async () =>{
   await pokemon.clickTasks();
   await page.waitForTimeout(5000);
  expect(await pokemon.pokemonRowCount()).toBe(1);
})
});
