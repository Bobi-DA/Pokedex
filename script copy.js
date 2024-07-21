let allPokemons = [];
let allPokemonsNameIndex = [];
let urlPokemon = [];    //https://pokeapi.co/api/v2/pokemon/{id}/ - ID fängt bei 1 an
let picturesPokemon = [];
let typesPokemon1 = [];
let typesPokemon2 = [];
let singlePokemonJson = [];     //https://pokeapi.co/api/v2/pokemon/{id}/ - ID fängt bei 1 an
let account = 20;
let OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

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
    // fetchPokemonData();
    render();
    await fetchAllPokemonData();
    await fetchDataJsonOffset();
}


function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}

async function fetchAllPokemonData() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`); // API-Aufruf für Pokémon-Daten
    let pokemon = await response.json(); // Antwort in JSON-Objekt umwandeln
    let names = pokemon['results'];

    for (let i = 0; i < names.length; i++) {
        let name = names[i]['name'];
        allPokemons.push(name); // Pokémon zum Array hinzufügen
        allPokemonsNameIndex.push({
            'name': name,
            'index': i,
        }); // Pokémon zum Array hinzufügen
    }
}


async function fetchDataJsonOffset() {
    let response = await fetch(OFFSET);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let results = responseAsJson['results'];    // Speichert das Ergebnis in der Variable - namePoke = (5) [{…}, {…}, {…}, {…}, {…}]

    document.getElementById('bgLoadSpinner').classList.remove('d-none');

    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        // namePokemon.push(result.name);
        urlPokemon.push(result.url);

        await showTypesPokemon(i);
        await showPicturePokemon(i);
        await fetchDataJsonPokemonSpecies(i);
    }
    document.getElementById('bgLoadSpinner').classList.add('d-none');
}


async function showTypesPokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API (https://pokeapi.co/api/v2/pokemon/ID/)
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let typePokemonUrl = responseAsJson.types;
    singlePokemonJson.push(responseAsJson);

    typesPokemon1.push(typePokemonUrl[0].type.name);
    typesPokemon2.push(typePokemonUrl[1]?.type.name || '');
}


async function showPicturePokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let picturePokemonUrl = responseAsJson.sprites.other.dream_world.front_default;

    picturesPokemon.push(picturePokemonUrl);

    smallCardPokemonHTML(i);
    getTypeColor(typesPokemon1[i], i);
}


function smallCardPokemonHTML(i) {
    let pictureURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`;
    content.innerHTML += /*html*/`
        <div onclick="openDialogPokemon(${i})" id="card${i}" class="card" style="width: 18rem;">
            <img src="${pictureURL}" class="card-img-top" alt="Pokemon-Picture">
            <div class="fw-bold card-header">
                <div>#${i + 1}</div>            <!--ID faengt bei 1 an--> 
                <div>${allPokemons[i].toUpperCase()}</div>
            </div>
            <div class="fw-semibold card-body">
                <div class="card-text">
                   ${typesPokemon1[i]}  
                </div>
                <div class="card-text">
                ${typesPokemon2[i]}  
                </div>
            </div>
        </div>
`;
}


function getTypeColor(type, i) {
    let bgcolor = typeColors[type.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden

    document.getElementById(`card${i}`).style.backgroundColor = bgcolor;
}




async function loadMoreButton() {
    singlePokemonJson = [];
    typesPokemon1 = [];
    typesPokemon2 = [];
    picturesPokemon = [];

    account = account + 10;
    limit = account - 10;
    OFFSET = `https://pokeapi.co/api/v2/pokemon?limit=${account}&offset=${limit}`;

    await init();
}

async function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase();
    let names = allPokemonsNameIndex.filter(pokemon => pokemon.name.toLowerCase().includes(search));

    if (search.length >= 3) {
        render();
        names.forEach(async pokemon => {
            console.log(pokemon.name);
            console.log(pokemon.index);

            await showPicturePokemon(pokemon.index);
        });
    }
}

// async function filterPokemon() {
//     let search = document.getElementById('search').value.toLowerCase();
//     let names = allPokemonsName.filter(pokemon => pokemon.name.toLowerCase().includes(search));

//     if (search) {
//         render();
//         for (let pokemon of names) {
//             console.log(pokemon.name);
//             console.log(pokemon.index);

//             await showPicturePokemon(pokemon.index);
//         }
//     }
// }
