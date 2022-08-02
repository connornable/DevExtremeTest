import { test, Page, expect } from "@playwright/test";
import { Pokemon } from "../page-objects/pokemon.po";

test.describe("Task List>", () => {
  let page: Page;
  let pokemon: Pokemon;
  const itemCount = 20

  test.beforeAll(async ({ browser }) => {
    page = await (await browser.newContext()).newPage();
    await page.goto("/home");
    pokemon = new Pokemon(page);

  });
  test.beforeEach(async () => {
    await pokemon.clickTasks();

  });
  // test.afterEach(async () => {
  //  //await page.waitForTimeout(3000);
  // })

  test("Click on the Id cell", async () => {
    await pokemon.clickId();
  })
  test("Click on the Id filter", async () => {
    await pokemon.clickIdFilter();
    expect(await pokemon.IsDailogOpened()).toBe(true);
  })
  // test("click the checkbox",async () =>{
  //   await pokemon.selectCheckbox();
  // });
  test("Get the pokemon header row text", async () => {
    const expectedText = "Sprite,Id,Name,Height,Type,";
    expect(await pokemon.getHeaderRowText()).toBe(expectedText);
  })
  test("Get the total rows count ", async () => {
    expect(await pokemon.pokemonRowCount()).toBe(12);
  })
  test("Click on the pagenumbers link ", async () => {
    const pageNumbers: number[] = [5, 16, 1]
    for (const pageNumber of pageNumbers) {
      await pokemon.pageNumberLinkClick(pageNumber);
    }

  })
  test("Click on the count page number links", async () => {
    await pokemon.pokemsItemsPerPage(20);
    expect(await pokemon.pokemonRowCount()).toBe(22);
  })
  test("click on show button", async () => {
    await pokemon.clickOnPokemonRow(4);
    await pokemon.clickOnButton();
    expect(await pokemon.getImagesSource()).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png");
    await pokemon.closeDialog();
  })
  test("Get the row text from table", async () => {
    expect(await pokemon.getRowText(2)).toBe(
      ",1,bulbasaur,7,grass,"
    )
  });
  test.describe("Select Monitor Devices>", () => {

    test.beforeEach(async () => {
      await pokemon.clickFiltersIcon(1);
    });
    test(" monitor device displayed", async () => {
      await pokemon.waitForWorkstationCheckBoxToBeDisplayed()
    });
    test("click on workstations checkbox ", async () => {
      await pokemon.selectWorkstationCheckBox();
      await pokemon.deselectWorkstationCheckBox();
    });
    test("click on servers checkbox ", async () => {
      await pokemon.selectServersCheckbox();
      await pokemon.deselectServersCheckbox();
    });
    test("click on laptop checkbox ", async () => {
      await pokemon.selectLaptopsCheckbox();
      await pokemon.deselectServersCheckbox();
    });
    test("click on device Drop down" , async () => {
      await pokemon.clickOnDevicesDropDown();
    })
    test("click on the os dropdown",async () =>{
      await pokemon.clickOnOsDropDown();
    })
  });
});
