import {DISPLAY_CARDS} from "./display.js";
import {isFilterReload} from "./filter.js";
import {deleteDuplicatesGoogled} from "./utils.js";
import {algoSearchMap} from "./algo-map.js";

let originalRecipes = [];
let distinctFilteredRecipes = [];

export var tagsArray = [];

// LISTENNER DES TAGS
const listenToTags = function (data) {
    document.querySelectorAll(".tags__close").forEach((X) => {
        X.addEventListener("click", tagIsNone);
    });
};

const tagIsNone = (e) => {
    let ID = e.currentTarget.id;

    ID = parseInt(ID);
    tagsArray.splice(ID, 1);

    if (tagsArray.length === 0) {

        DISPLAY_CARDS(originalRecipes[0]);
        isFilterReload(originalRecipes[0]);
    } else if (tagsArray.length >= 1) {
        let tagReload = [];
        tagReload.push(originalRecipes[0]);
        // console.log(tagReload);
        tagsArray.forEach((item) => {
            let distinctFilteredRecipes = deleteDuplicatesGoogled(
                algoSearchMap(tagReload[0], item.title)
            );
            // console.log(distinctFilteredRecipes);
            tagReload[0] = [...distinctFilteredRecipes];
        });
        isFilterReload(tagReload[0]);
        DISPLAY_CARDS(tagReload[0]);
    }
    showListOfTags(tagsArray);
};

export const listenFilter = (data, keywordlist) => {
    originalRecipes.push(data);

    for (const keyword of keywordlist) {
        keyword.addEventListener("click", () => {
            let dataTitle = keyword.textContent;
            let dataColor = keyword.getAttribute("data-color");
            let tagObject = { title: `${dataTitle}`, color: `${dataColor}` };

            // VERIFIE SI LE TAG EST PRESENT pour éviter doublons OU lancer algo
            let inTagsArray = false;

            tagsArray.forEach((tag) => {
                inTagsArray = tag.title === tagObject.title;
            });

            if (!inTagsArray) {
                // AU CLICK LES LI DEVIENT UN TAG AFFICHé
                tagsArray.push(tagObject);
                showListOfTags(tagsArray, data);

                //ON FAIT LA RECHERCHE SUR CHAQUE TAG
                tagsArray.forEach((item) => {
                    distinctFilteredRecipes = deleteDuplicatesGoogled(
                        algoSearchMap(data, item.title)
                    );
                    data = [...distinctFilteredRecipes];
                });

                isFilterReload(distinctFilteredRecipes);
                DISPLAY_CARDS(distinctFilteredRecipes);

                // SI RESTE UNE CARD ALORS DESACTIVATION DES LI
                if (distinctFilteredRecipes.length === 1) {
                    document.querySelectorAll(".filter__custom-option").forEach((li) => {
                        li.classList.remove("filter__custom-option");
                        li.classList.add("filter__custom-option--enable");
                    });
                }

                // AU CLICK LE LI DEVIEN INACTIF ET GRISE
                tagsArray.forEach((tag) => {
                    document.querySelectorAll(".filter__custom-option").forEach((li) => {
                        if (tag.title.includes(li.textContent)) {
                            li.classList.remove("filter__custom-option");
                            li.classList.add("filter__custom-option--enable");
                        }
                    });
                });
            }
        });
    }
};

export const showListOfTags = function (arrayOfTags, data) {
    let tag_HTML = "";

    arrayOfTags.forEach((tag, index, data) => {
        tag_HTML += `<span class="tags__item tags__item--${tag.color}">
    <span  class="tags__name">${tag.title}</span>
    <span id="${index}" class="tags__close">
    <img src="./assets/img/remove-icon.png" alt=""
    /></span>
    </span>`;
    });
    document.querySelector(".tags").innerHTML = tag_HTML;

    listenToTags(data);
};