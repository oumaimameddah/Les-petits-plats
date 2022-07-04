/**
 * LE SCRIPT RESPONSABLE DE L'AFFICHAGE
 * */
import {capitalize, shuffle} from "./utils.js";
import {remplireFilter} from "./filter.js";
import {listenFilter} from "./tags.js";

export const DISPLAY_CARDS = (data) => {
    /**
     * Cette Fonction permet de faire l'affichage des données
     * */
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";

    if (data.length === 0) {
        // SI ON A PAS DE DONNEES
        let templateNoData = `
                <div class="cards__no-recipes">
                    <p class="cards__no-recipes-text">Aucune recette ne correspond à votre critère… </p>
                 </div>`;
        cards.insertAdjacentHTML("afterbegin", templateNoData);
    } else {
        // Pour chaque recipe (recette)
        data.forEach((element) => {
            let templateIngredientsHtml = "";
            element.ingredients.map((elt) => {
                // préparation de la liste des ingrédients
                templateIngredientsHtml += `
                    <li class="card__ingredient">
                        <span class="card__ingredient--bold">${elt.ingredient ? capitalize(elt.ingredient).trim() : ""}</span>
                        ${elt.quantity ? elt.quantity.toString().trim() : ""} ${elt.unit ? elt.unit.toLowerCase().trim() : ""}
                    </li>`;
                return templateIngredientsHtml;
            });

            // Template
            let templateCard = `
                <article class="card">
                    <a href="#">
                        <div class="card__thumb"></div>
                        <div class="card__body">
                            <div class="card__head">
                                <h2 class="card__title">${capitalize(element.name.trim())}</h2>
                                <div class="card__time">
                                    <i class="card__timeclock"></i>
                                    <p class="card__minutes">${element.time.toString().trim()} min</p>
                                </div>
                            </div>
                            <div class="card__content">
                                <ul class="card__ingredients">
                                    ${templateIngredientsHtml}
                                </ul>
                                <p class="card__description">
                                    ${element.description.trim()}
                                </p>
                            </div>
                        </div>
                    </a>
                </article>
            `;

            // Ajouter la carte dans la section
            cards.insertAdjacentHTML("afterbegin", templateCard);
        });
    }
}


export const DISPLAY_FILTERS = (data, btn, filter, value, color) => {
    if (btn && filter && value && color) {
        remplireFilter(data, value, btn, color, filter);
    } else if (data) {
        document.querySelectorAll(".filter__select").forEach((button) => {
            let value = button.getAttribute("value");
            let datacolor = button.getAttribute("data-color");
            remplireFilter(data, value, button, datacolor);
        });
    }

    // ECOUTE L'ENSEMBLE DES LI (textcontent et color)
    listenFilter(data, document.querySelectorAll(".filter__custom-option"));
}

// NEW SET : distinct INGREDIENTS
export const displayFilterIngredients = (data, filter) => {

        const distinctIngredients = [
            ...new Set(
                data
                    .map((recipe) =>
                        recipe.ingredients.map((ingredient) =>
                            ingredient.ingredient.toLowerCase().trim()
                        )
                    )
                    .flat()
                    .sort()
            ),
        ];

        // SI RECHERCHE DANS INPUT....
        if (filter) {
            return distinctIngredients.filter((ingredient) =>
                ingredient.includes(filter.toLowerCase().trim())
            );
        }
        // SANS RECHERCHE
        return shuffle(distinctIngredients);
};

// NEW SET : distinct APPLIANCE
export const displayFilterAppliance = (data, filter) => {
        const distinctAppliance = [
            ...new Set(
                data.map((recipe) => recipe.appliance.toLowerCase().trim()).sort()
            ),
        ];

        // SI RECHERCHE DANS INPUT....
        if (filter) {
            return distinctAppliance.filter((appliance) =>
                appliance.includes(filter.toLowerCase().trim())
            );
        }
        // SANS RECHERCHE
        return distinctAppliance;
};

// NEW SET : distinct USTENSILS
export const displayFilterUstensils = (data, filter) => {
        const distinctUstensils = [
            ...new Set(
                data
                    .map((recipe) =>
                        recipe.ustensils.map((item) => item.toLowerCase().trim())
                    )
                    .flat()
                    .sort()
            ),
        ];
        // SI RECHERCHE DANS INPUT....
        if (filter) {
            return distinctUstensils.filter((ustensil) =>
                ustensil.includes(filter.toLowerCase().trim())
            );
        }
        // SANS RECHERCHE
        return distinctUstensils;
};