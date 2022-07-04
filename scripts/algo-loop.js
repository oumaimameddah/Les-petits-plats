/**
 * CE FICHIER EST POUR L'ALGORITHME DE LA RECHERCHE PAR BOUCLE
 * */
export let algoSearchLoop = (recipes, filter) => {
    let searchedCards = [];

    /**
     * Boucle sur tout les receipes
     * On plusieurs itérations possible
     *
     *  ## 1
     * for (let i = 0; i < recipes.length; i++) {recipes[i] ...}
     *
     * ## 2
     * for (let recipe of recipes) {recipe ...}
     *
     * ## 3
     * recipes.forEach(callback())
     *
     * Dans notre cas on a utiliser la deuxème méthode for (let recipe of recipes) ...
     * */

    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1 ||
            recipe.description.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1 ||
            recipe.appliance.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1)
        {
            searchedCards.push(recipe);
        }

        for (let ustentil of recipe.ustensils) {
            if (ustentil.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1) {
                searchedCards.push(recipe);
                break;
            }
        }

        for (let el of recipe.ingredients) {
            if (el.ingredient.toLowerCase().trim().indexOf(filter.toLowerCase().trim()) > -1) {
                searchedCards.push(recipe);
                break;
            }
        }
    }

    return searchedCards;
}