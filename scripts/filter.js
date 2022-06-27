import {listHTML} from "./utils.js";
import {DISPLAY_FILTERS, displayFilterAppliance, displayFilterIngredients, displayFilterUstensils} from "./display.js";

/**
 * Fichier JS pour les filtres
 * */

export const isFilterInteractive = (btn, btnValue) => {
    const displayKeyword = btn.nextElementSibling;
    if (displayKeyword.classList.contains("filter__show")) {
        closeSelectFilter(
            // supprime le placeholder, attribue une value, attribue un type button
            displayKeyword.previousElementSibling,
            // supprime la class CSS assurant l'affichange
            displayKeyword,
            // réduit la largeur du composant
            displayKeyword.parentNode,
            // assure la rotation de la flèche vers le haut
            displayKeyword.parentNode.firstElementChild);
    } else {
        // vérifie si les filtres sont ouverts ailleurs pour les fermer
        isFilterClosed();
        // ouvre le filtre sélectionné
        changeInputTypeInText(btn, btnValue);
    }
}

export const closeSelectFilter = (inputBtn, filterShow, parentWidth, rotateArrow) => {
    inputBtn.setAttribute("type", "button");
    inputBtn.setAttribute("value", `${inputBtn.getAttribute("data-value")}`);
    inputBtn.removeAttribute("placeholder");
    filterShow.classList.remove("filter__show");
    parentWidth.style.width = "170px";
    rotateArrow.classList.remove("filter__custom-arrow--rotate");
}

export const isFilterClosed = () => {
    document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
        if (filter.classList.contains("filter__show")) {
            closeSelectFilter(
                // supprime le placeholder, attribue une value, attribue un type button
                filter.previousElementSibling,
                // supprime la class CSS assurant l'affichage
                filter,
                // réduit la largeur du composant
                filter.parentNode,
                // assure la rotation de la flèche vers le haut
                filter.parentNode.firstElementChild
            );
        }
    });
}

export const changeInputTypeInText = (button, buttonValue) => {
    button.setAttribute("type", "text");
    button.setAttribute("data-value", `${buttonValue}`);
    // button.removeAttribute("value");
    button.value = "";

    switch (buttonValue) {
        case "Appareil":
            // élargie le button type texte
            button.parentNode.style.width = "66%";
            // set un placeholder
            button.setAttribute("placeholder", "Recherche un appareil");
            // affiche la liste
            button.nextElementSibling.classList.add("filter__show");
            // rotate de la fleche
            button.previousElementSibling.classList.add(
                "filter__custom-arrow--rotate"
            );

            break;
        case "Ingrédients":
            button.parentNode.style.width = "66%";
            button.setAttribute("placeholder", "Recherche un ingrédient");
            button.nextElementSibling.classList.add("filter__show");
            button.previousElementSibling.classList.add(
                "filter__custom-arrow--rotate"
            );

            break;
        case "Ustensiles":
            button.parentNode.style.width = "66%";
            button.setAttribute("placeholder", "Recherche un ustensile");
            button.nextElementSibling.classList.add("filter__show");
            button.previousElementSibling.classList.add(
                "filter__custom-arrow--rotate"
            );

            break;
        default:
            break;
    }
}


export const remplireFilter = (data, value, btn, datacolor, filter) => {
    switch (value) {
        case "Ingrédients":
            // console.log(data, filter);
            btn.insertAdjacentHTML(
                "afterend",
                `
        <ul class="filter__custom-menu filter__custom-menu--primary">
      ${listHTML(displayFilterIngredients(data, filter), datacolor)}
      </ul>`
            );
            break;
        case "Appareil":
            btn.insertAdjacentHTML(
                "afterend",
                `
        <ul class="filter__custom-menu filter__custom-menu--success">
      ${listHTML(displayFilterAppliance(data, filter), datacolor)}
      </ul>`
            );
            break;
        case "Ustensiles":
            btn.insertAdjacentHTML(
                "afterend",
                `
        <ul class="filter__custom-menu filter__custom-menu--danger">
      ${listHTML(displayFilterUstensils(data, filter), datacolor)}
      </ul>`
            );
            break;
        default:
            break;
    }
}

// FERME LE FILTRE ET CHARGE NOUVEAUX ELEMENTS
export const isFilterReload = (data) => {
    document.querySelectorAll(".filter__custom-menu").forEach((filter) => {
        if (filter.classList.contains("filter__show")) {
            let btn = filter.previousElementSibling;
            let btnvalue = btn.getAttribute("value");

            // SUPPRESSION DES PRECEDENTES UL CONTENANT LES LI
            document.querySelectorAll(".filter__custom-menu").forEach((ul) => {
                ul.remove();
            });
            // HYDRATE LES LI AVEC LA NOUVELLE RECHERCHE
            DISPLAY_FILTERS(data);
            // OUVRE A NOUVEAU L'INPUT EN MODE TEXTE
            changeInputTypeInText(btn, btnvalue);
        }
    });
};
