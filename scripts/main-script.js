/**
 * SCRIPT PRINCIPALE DE SITE
 * */
import {getDataFromServer} from "./api/server.js";
import {DISPLAY_CARDS} from "./display.js";

// AFFICHER LES DONNES
export const AFFICHER_RECIPES = () => {
    getDataFromServer()
        .then(res => {
            DISPLAY_CARDS(res);
        });
}

// AJOUTER LES EVNEMENTS AUX FILTRES
let buttons = document.querySelectorAll(".filter__select");
let buttonValue;
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        buttonValue = btn.getAttribute("value");
        console.log(buttonValue, btn);
    })
})

const init = () => {
    AFFICHER_RECIPES();
}

/**
 * LANCER LA PAGE D'INDEX
 * */
init();