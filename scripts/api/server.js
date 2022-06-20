/**
 * SERVEUR BACKEND
 * */

export const getDataFromServer = async () => {
    /**
     * Cette fonction permet de simuler un appel HTTP vers un serveur BACKEND lors de l'ouverture de la page
     * */
    let url = './data/recipes.json';
    let response = await fetch(url, { mode: "no-cors"});
    return await response.json()
}