/**
 * SCRIPT DES OUTILS
 * */

import {DISPLAY_CARDS, DISPLAY_FILTERS} from "./display.js";
import {showListOfTags, tagsArray} from "./tags.js";
import {isFilterReload} from "./filter.js";

export const capitalize = (str) => {
    // METTRE LA PREMIERE LETTRE EN LETTRE CAPITALE
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const listHTML = (distinctData, datacolor) => {
    let list = "";
    distinctData.map((setLi) => {
        list += `<li class="filter__custom-option" data-color="${datacolor}">${capitalize(
            setLi
        )}</li>`;
    });
    return list;
};

export const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

// CLOSE TAGS
export const tagIsNoneSuccess = () => {
    document.getElementsByClassName("tags__item--success").style.display = "none";
};
export const tagIsNoneDanger = () => {
    document.getElementsByClassName("tags__item--danger").style.display = "none";
};
export const tagIsNonePrimary = () => {
    document.getElementsByClassName("tags__item--primary").style.display = "none";
};

export const deleteDuplicatesGoogled = (array) => {
    let cleanDuplicate = [];
    array.forEach((item) => {
        cleanDuplicate.indexOf(item) === -1 ? cleanDuplicate.push(item) : "";
    });
    return cleanDuplicate;
};

export let theMillTurns = (recipes, filter) => {
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

// LISTEN INPUT BARRE DE RECHERCHE
export let IS_GOOGLE = (recipes) => {
    const takeIt = document.querySelector(".search__input");

    takeIt.addEventListener("input", () => {
        // si le nbre de lettre dépasse 2 alors :  LANCER ALGO
        if (takeIt.value.length > 2) {
            const googledRecipes = theMillTurns(recipes, takeIt.value);
            const googledRecipesDistinct = deleteDuplicatesGoogled(googledRecipes);
            // console.log(googledRecipesDistinct);
            DISPLAY_CARDS(googledRecipesDistinct);
            DISPLAY_FILTERS(googledRecipesDistinct);
            isFilterReload(recipes);
        } else {
            // SINON TABLEAU DES RECETTES
            DISPLAY_CARDS(recipes);
            isFilterReload(recipes);
            // ON VIDE LE TABLEAY DEStags
            while (tagsArray.length > 0) {
                tagsArray.pop();
            }
            showListOfTags(tagsArray);

            document.querySelectorAll(".filter__custom-option").forEach((li) => {
                li.classList.add("filter__custom-option");
                li.classList.remove("filter__custom-option--enable");
            });
        }
    });
};

// LISTEN FOREACH INPUT FILTER
export let IS_TAGGED = (recipes) => {
    // LISTEN INPUT BARRE DE RECHERCHE DU FILTRE
    const takeFilter = document.querySelectorAll(".filter__select");

    takeFilter.forEach((input) => {
        input.addEventListener("input", (e) => {
            e.preventDefault();
            e.stopPropagation();

            // ON VIDE LE TABLEAU DES TAGS
            while (tagsArray.length > 0) {
                tagsArray.pop();
            }
            showListOfTags(tagsArray);
            DISPLAY_CARDS(recipes);

            let value = input.getAttribute("data-value");
            let color = input.getAttribute("data-color");

            input.nextElementSibling.remove();

            DISPLAY_FILTERS(recipes, input, input.value, value, color);
            input.parentNode.style.width = "66%";
            input.setAttribute("placeholder", "Recherche un ingrédient");
            input.nextElementSibling.classList.add("filter__show");
            input.previousElementSibling.classList.add(
                "filter__custom-arrow--rotate"
            );
        });
    });
};