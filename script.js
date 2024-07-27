let allPokemons = [];
let nOffset = 0;
let OFFSET = "https://pokeapi.co/api/v2/pokemon/";


const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#a8a878'
};


async function init() {       // initialisierung
    render();
    await fetchDataJsonOffset();
}


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}


async function fetchDataJsonOffset() {
    let response = await fetch(OFFSET);         // Holt die Daten von der API
    responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let results = responseAsJson['results'];    // Speichert das Ergebnis in der Variable - namePoke = (5) [{…}, {…}, {…}, {…}, {…}]

    document.getElementById('bgLoadSpinner').classList.remove('d-none');
    for (let i = 0; i < results.length; i++) {
        await fetchDataPokemon(i);
    }
    document.getElementById('bgLoadSpinner').classList.add('d-none');
}


async function fetchDataPokemon(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.

    allPokemons.push(responseAsJson);
    smallCardPokemonHTML(i);
    getTypeColor(allPokemons, i);
    await fetchDataJsonPokemonSpecies(i);
}


function smallCardPokemonHTML(i) {
    let picture = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let type_1 = allPokemons[i]['types']['0']['type']['name'];
    let type_2 = allPokemons[i]['types']['1']?.['type']['name'] || '';

    content.innerHTML += /*html*/`
        <div onclick="openDialogPokemon(${i})" id="card${i}" class="card" style="width: 18rem;">
            <img src="${picture}" class="card-img-top" alt="Pokemon-Picture">
            <div class="fw-bold card-header">
                <div>#${allPokemons[i]['id']}</div>            <!--ID faengt bei 1 an--> 
                <div>${allPokemons[i]['name']}</div>
            </div>
            <div class="fw-semibold card-body">
                <div class="card-text">
                    ${type_1}  
                </div>
                <div class="card-text">
                    ${type_2}  
                </div>
            </div>
        </div>
`;
}


function getTypeColor(type, i) {
    let color = type[i]['types']['0']['type']['name'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(`card${i}`).style.backgroundColor = bgcolor;
}


async function loadMoreButton() {
    if (!OFFSET) return; // Wenn keine nächste Seite verfügbar ist, nichts tun

    let response = await fetch(OFFSET);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];

    OFFSET = responseAsJson['next']; // Setzt die neue OFFSET URL für die nächste Anfrage

    document.getElementById('bgLoadSpinner').classList.remove('d-none');
    for (let i = 0; i < results.length; i++) {
        await fetchDataPokemon(allPokemons.length); // Läd die Pokemon-Daten basierend auf der aktuellen Länge des allPokemons Arrays
    }
    document.getElementById('bgLoadSpinner').classList.add('d-none');
}



async function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase().trim(); // Eingabewert des Suchfeldes holen und in Kleinbuchstaben umwandeln
    console.log('Search', search);

    if (search.length >= 2) { // Nur filtern, wenn mindestens 2 Zeichen eingegeben wurden
        let names = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search)); // Pokemon nach dem Suchbegriff filtern
        render(); // Inhalt löschen

        for (let pokemon of names) { // Für jedes gefilterte Pokemon
            await fetchDataPokemon(pokemon.id - 1); // Pokemon Daten basierend auf der ID abrufen
        }
    } else if (search.length == 0) { // Wenn das Suchfeld leer ist, initialisiere die ursprünglichen Pokemon
        allPokemons = [];
        await init();
    }
}

