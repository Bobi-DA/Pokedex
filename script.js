let namePokemon = [];
let picturePokemon = [];

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/1";
const OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";





function init() {
    render();
    fetchDataJsonOffset();
    fetchDataJsonBase();
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

        cardPokemonHTML(i);
    }
}


async function fetchDataJsonBase() {
    let response = await fetch(BASE_URL);
    let responseAsJson2 = await response.json();
    let re = responseAsJson2;

    console.log(re);
    picturePokemon.push(re.sprites.other.dream_world.front_default);

}


function cardPokemonHTML(i) {
    return content.innerHTML += /*html*/`

    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <div>#${i + 1}</div>
            <div>${namePokemon[i]}</div>
        </div>
        <img src="${picturePokemon[i]}" class="card-img-top" alt="">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
        </div>
    </div>
`;

}