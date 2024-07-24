let allPokemons = [];
let limit = 20;
let OFFSET_ = "https://pokeapi.co/api/v2/pokemon/";


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
    let response = await fetch(OFFSET_);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let results = responseAsJson['results'];    // Speichert das Ergebnis in der Variable - namePoke = (5) [{…}, {…}, {…}, {…}, {…}]

    document.getElementById('bgLoadSpinner').classList.remove('d-none');

    for (let i = 0; i < results.length; i++) {
        await fetchDataPokemon(i);
        await smallCardPokemonHTML(i);
    }
    document.getElementById('bgLoadSpinner').classList.add('d-none');
}


async function fetchDataPokemon(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.

    let name = responseAsJson['name'];
    let id = responseAsJson['id'];
    let picture = responseAsJson['sprites']['other']['dream_world']['front_default'];
    let type_1 = responseAsJson['types']['0']['type']['name'];
    let type_2 = responseAsJson['types']['1']?.['type']['name'] || '';

    allPokemons.push(
        {
            "name": name,
            "id": id,
            "picture": picture,
            "types": [type_1, type_2]
        }
    )

}


async function smallCardPokemonHTML(i) {

    content.innerHTML += /*html*/`
        <div onclick="openDialogPokemon(${i})" id="card${i}" class="card" style="width: 18rem;">
            <img src="${allPokemons[i]['picture']}" class="card-img-top" alt="Pokemon-Picture">
            <div class="fw-bold card-header">
                <div>#${allPokemons[i]['id']}</div>            <!--ID faengt bei 1 an--> 
                <div>${allPokemons[i]['name']}</div>
            </div>
            <div class="fw-semibold card-body">
                <div class="card-text">
                   ${allPokemons[i]['types'][0]}  
                </div>
                <div class="card-text">
                ${allPokemons[i]['types'][1]}  
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

    limit = limit + 10;
    let offset = limit - 10;
    OFFSET_ = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    await init();
}


async function filterPokemon() {
    let search = document.getElementById('search').value.toLowerCase().trim();

    if (search.length >= 2) {  // Nur filtern, wenn mindestens 2 Zeichen eingegeben wurden
        let names = pokemonsNameIndex.filter(pokemon => pokemon.name.toLowerCase().includes(search));

        render();

        for (let pokemon of names) {

            await showPicturePokemon(pokemon.index);
        }
    } if (search.length == 0) {
        await init();
    }
}

// async function filterPokemon() {
//     let search = document.getElementById('search').value.toLowerCase().trim();
//     let names = allPokemonsNameIndex.filter(pokemon => pokemon.name.toLowerCase().includes(search));

//     if (search.length >= 2) {

//         console.log(search);
//         render();

//         names.forEach(async pokemon => {
//             // console.log(pokemon.name);
//             // console.log(pokemon.index);

//             await showPicturePokemon(pokemon.index);
//         });
//     }else{
//         await init();
//     }

// }
