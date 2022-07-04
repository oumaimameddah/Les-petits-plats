/**
 * La fonction de recherche par MAP
 * theMillTurns
 * */

export let algoSearchMap = (recipes, filter) => {
    let googledCards = [];

    recipes.map((recipe) => {
        if (
            // une recette ?
            recipe.name.toLowerCase().trim().includes(filter.toLowerCase().trim()) ||
            recipe.description
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase().trim()) ||
            // un appareil ?
            recipe.appliance
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase().trim())
        ) {
            googledCards.push(recipe);
        }

        // un ustensil ?
        recipe.ustensils.filter((elt) => {
            if (elt.toLowerCase().includes(filter.toLowerCase())) {
                googledCards.push(recipe);
            }
        });

        // un ingredient ?
        recipe.ingredients.map((ingredient) => {
            if (
                ingredient.ingredient
                    .toLowerCase()
                    .trim()
                    .includes(filter.toLowerCase().trim())
            ) {
                googledCards.push(recipe);
            }
        });
    });
    return googledCards;
};