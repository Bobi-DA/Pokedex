let namePokemon = [];
let urlPokemon = [];
let picturesPokemon = [];
let typesPokemon = [];
const OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";





function init() {       // initialisierung
    fetchDataJsonOffset();
    render();
}


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}


async function fetchDataJsonOffset() {
    let response = await fetch(OFFSET);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let results = responseAsJson['results'];    // Speichert das Ergebnis in der Variable - namePoke = (5) [{…}, {…}, {…}, {…}, {…}]

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        namePokemon.push(result.name);
        urlPokemon.push(result.url);

        showTypesPokemon(i);
        showPicturePokemon(i);
    }
}


async function showPicturePokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let picturePokemonUrl = responseAsJson.sprites.other.dream_world.front_default;

    cardPokemonHTML(i, picturePokemonUrl);
}


async function showTypesPokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let typePokemonUrl = responseAsJson.types;


    // console.log('Type 0: ', typePokemonUrl[0].type.name);
    typesPokemon.push(typePokemonUrl[0].type.name);

    console.log('typesPokemon:', typesPokemon);
    console.log('typesPokemon[i]:', typesPokemon[i]);
}



function cardPokemonHTML(i, picturePokemonUrl) {
    return content.innerHTML += /*html*/`
        <div class="card" style="width: 18rem;">
            <img src="${picturePokemonUrl}" class="card-img-top" alt="Pokemon-Picture">
            <div class="fw-bold card-header">
                <div>#${i + 1}</div>
                <div>${namePokemon[i]}</div>
            </div>
            <div class="fw-semibold card-body">
                <div class="card-text">
                   ${typesPokemon[i]}  
                </div>
                <div class="card-text">
                   2. type  
                </div>
            </div>
        </div>
`;
}