let namePokemon = [];
let urlPokemon = [];
let picturesPokemon = [];
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/1";
const OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";





function init() {
    render();
    fetchDataJsonOffset();
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
        
        showPicturePokemon(i);
    }
}

async function showPicturePokemon(i) {
    let response = await fetch(urlPokemon[i]);       // Holt die Daten von der API
    let responseAsJson2 = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let picturePokemonUrl = responseAsJson2.sprites.other.dream_world.front_default;

    console.log('Picture: ', picturePokemonUrl);

    cardPokemonHTML(i, picturePokemonUrl);
}



function cardPokemonHTML(i, picturePokemonUrl) {
    return content.innerHTML += /*html*/`

    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <div>#${i + 1}</div>
            <div>${namePokemon[i]}</div>
        </div>
        <img src="${picturePokemonUrl}" class="card-img-top m-4" alt="Pokemon-Picture">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
        </div>
    </div>
`;

}