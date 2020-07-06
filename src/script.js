"use strict";
var RecipePage;
(function (RecipePage) {
    let recipes = [];
    init();
    async function init() {
        recipes = await RecipePage.loadRecipesJSON();
        displayAllRecipes();
    }
    function displayAllRecipes() {
        let main = document.body.querySelector("main");
        for (let r of recipes) {
            main.appendChild(RecipePage.generateOneRecipe(r, r.defaultGroupsize));
        }
    }
    function changeGroupAmount(_e) {
        console.log("TODO: actually recalculate this stuff.");
    }
    RecipePage.changeGroupAmount = changeGroupAmount;
})(RecipePage || (RecipePage = {}));
//# sourceMappingURL=script.js.map