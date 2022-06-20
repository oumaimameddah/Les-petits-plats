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

const init = () => {
    AFFICHER_RECIPES();
}

/**
 * LANCER LA PAGE D'INDEX
 * */
init();