"use strict";
var RecipePage;
(function (RecipePage) {
    async function loadRecipesJSON() {
        let response = await fetch("./recipes.json");
        let recipes = await response.json();
        return recipes;
    }
    RecipePage.loadRecipesJSON = loadRecipesJSON;
    function generateOneRecipe(_recipe, _groupsize) {
        let wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("recipe");
        wrapperDiv.id = _recipe.id.toString();
        let headline = document.createElement("h2");
        headline.innerText = _recipe.name;
        wrapperDiv.appendChild(headline);
        wrapperDiv.appendChild(generateIngredients(_recipe, _groupsize));
        wrapperDiv.append(...generateInstructions(_recipe));
        return wrapperDiv;
    }
    RecipePage.generateOneRecipe = generateOneRecipe;
    function generateIngredients(_recipe, _groupsize) {
        let ingredientsDiv = document.createElement("div");
        ingredientsDiv.classList.add("ingredients");
        let heading = document.createElement("h3");
        heading.innerText = "Zutaten";
        ingredientsDiv.appendChild(heading);
        let groupInput = document.createElement("input");
        groupInput.type = "number";
        groupInput.value = _groupsize.toString();
        groupInput.addEventListener("input", RecipePage.changeGroupAmount);
        groupInput.disabled = true;
        ingredientsDiv.appendChild(groupInput);
        let table = document.createElement("table");
        table.classList.add("ingredients");
        let tbody = table.createTBody();
        for (let i of _recipe.ingredients) {
            let trow = tbody.insertRow();
            let amountCell = trow.insertCell();
            if (i.amount?.min) {
                amountCell.innerText = i.amount?.min + "-" + i.amount?.max;
            }
            else if (i.amount) {
                amountCell.innerText = i.amount.toString();
            }
            let unitCell = trow.insertCell();
            unitCell.innerText = i.unit != RecipePage.UNIT.NONE ? i.unit : "";
            let nameCell = trow.insertCell();
            nameCell.innerText = i.name;
        }
        ingredientsDiv.appendChild(table);
        return ingredientsDiv;
    }
    function generateInstructions(_recipe) {
        let elements = [];
        for (let i of _recipe.instructions) {
            let p = document.createElement("p");
            p.innerText = i;
            elements.push(p);
        }
        return elements;
    }
})(RecipePage || (RecipePage = {}));
//# sourceMappingURL=load.js.map