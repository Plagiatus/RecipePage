namespace RecipePage {
  let recipes: Recipe[] = [];
  init();

  async function init(): Promise<void> {
    recipes = await loadRecipesJSON();
    displayAllRecipes();
  }

  function displayAllRecipes(): void {
    let main: HTMLElement = document.body.querySelector("main")!;
    for (let r of recipes) {
      main.appendChild(generateOneRecipe(r, r.defaultGroupsize));
    }
  }

  export function changeGroupAmount(_e: Event): void {
    console.log("TODO: actually recalculate this stuff.");
  }
}