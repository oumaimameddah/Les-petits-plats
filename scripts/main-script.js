/**
 * SCRIPT PRINCIPALE DE SITE
 * */
import {getDataFromServer} from "./api/server.js";
import {DISPLAY_CARDS, DISPLAY_FILTERS} from "./display.js";
import {isFilterInteractive} from "./filter.js";
import {IS_GOOGLE, IS_TAGGED} from "./utils.js";

// AFFICHER LES DONNES
export const AFFICHER_RECIPES = () => {
    getDataFromServer()
        .then(res => {
            DISPLAY_CARDS(res);
            DISPLAY_FILTERS(res);
            IS_GOOGLE(res);
            IS_TAGGED(res);
        });
}

// AJOUTER LES EVNEMENTS AUX FILTRES
let buttons = document.querySelectorAll(".filter__select");
let buttonValue;
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttonValue = btn.getAttribute("value");
        // Verifier si y'a un filtre ouvert ou non
        isFilterInteractive(btn, buttonValue);
        console.log(btn.getAttribute("value"))
    })
})

const init = () => {
    AFFICHER_RECIPES();
}

/**
 * LANCER LA PAGE D'INDEX
 * */
init();