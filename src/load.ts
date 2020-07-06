namespace RecipePage {
  export async function loadRecipesJSON(): Promise<Recipe[]> {
    let response: Response = await fetch("./recipes.json");
    let recipes: Recipe[] = await response.json();
    return recipes;
  }

  export function generateOneRecipe(_recipe: Recipe, _groupsize: number): HTMLElement {
    let wrapperDiv: HTMLDivElement = document.createElement("div");
    wrapperDiv.classList.add("recipe");
    wrapperDiv.id = _recipe.id.toString();
    let headline: HTMLHeadingElement = document.createElement("h2");
    headline.innerText = _recipe.name;
    wrapperDiv.appendChild(headline);
    wrapperDiv.appendChild(generateIngredients(_recipe, _groupsize));
    wrapperDiv.append(...generateInstructions(_recipe));
    return wrapperDiv;
  }

  function generateIngredients(_recipe: Recipe, _groupsize: number): HTMLElement {
    let ingredientsDiv: HTMLDivElement = document.createElement("div");
    ingredientsDiv.classList.add("ingredients");

    let heading: HTMLHeadingElement = document.createElement("h3");
    heading.innerText = "Zutaten";
    ingredientsDiv.appendChild(heading);

    let groupInput: HTMLInputElement = document.createElement("input");
    groupInput.type = "number";
    groupInput.value = _groupsize.toString();
    groupInput.addEventListener("input", changeGroupAmount);
    groupInput.disabled = true;
    ingredientsDiv.appendChild(groupInput);

    let table: HTMLTableElement = document.createElement("table");
    table.classList.add("ingredients");
    let tbody: HTMLTableSectionElement = table.createTBody();
    for (let i of _recipe.ingredients) {
      let trow: HTMLTableRowElement = tbody.insertRow();
      let amountCell: HTMLTableCellElement = trow.insertCell();
      if ((<MinMax>i.amount)?.min) {
        amountCell.innerText = (<MinMax>i.amount)?.min + "-" + (<MinMax>i.amount)?.max;
      }
      else if (<number>i.amount) {
        amountCell.innerText = i.amount.toString();
      }
      let unitCell: HTMLTableCellElement = trow.insertCell();
      unitCell.innerText = i.unit != UNIT.NONE ? i.unit : "";
      let nameCell: HTMLTableCellElement = trow.insertCell();
      nameCell.innerText = i.name;
    }
    ingredientsDiv.appendChild(table);

    return ingredientsDiv;
  }

  function generateInstructions(_recipe: Recipe): HTMLElement[] {
    let elements: HTMLElement[] = [];
    for (let i of _recipe.instructions) {
      let p: HTMLParagraphElement = document.createElement("p");
      p.innerText = i;
      elements.push(p);
    }
    return elements;
  }
}