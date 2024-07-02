let namePokemon = [];
let urlPokemon = [];
let picturesPokemon = [];
let typesPokemon = [];
const OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";

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

        await showTypesPokemon(i);
        await showPicturePokemon(i);

    }
}


async function showTypesPokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API (https://pokeapi.co/api/v2/pokemon/${i}/)
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let typePokemonUrl = responseAsJson.types;

    // console.log('TypePokemonURL: ', typePokemonUrl);
    typesPokemon.push(typePokemonUrl[0].type.name);
    // console.log('typesPokemon: ',typesPokemon[i]);


}


async function showPicturePokemon(i) {
    let response = await fetch(urlPokemon[i]);      // Holt die Daten von der API
    let responseAsJson = await response.json();    // Wandelt die Antwort in ein JSON-Objekt um.
    let picturePokemonUrl = responseAsJson.sprites.other.dream_world.front_default;

    picturesPokemon.push(picturePokemonUrl);

    cardPokemonHTML(i, picturePokemonUrl);
    getTypeColor(typesPokemon[i], i);
}


function cardPokemonHTML(i, picturePokemonUrl) {
    return content.innerHTML += /*html*/`
        <div onclick="openDialogPokemon(${i})" id="card${i}" class="card" style="width: 18rem;">
            <img src="${picturePokemonUrl}" class="card-img-top" alt="Pokemon-Picture">
            <div class="fw-bold card-header">
                <div>#${i + 1}</div>            <!--ID faengt bei 1 an--> 
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


function getTypeColor(type, i) {
    let bgcolor = typeColors[type.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    console.log(i, bgcolor);

    document.getElementById(`card${i}`).style.backgroundColor = bgcolor;


}


function openDialogPokemon(i) {
    let dialog = document.getElementById('bgDialog');
    dialog.classList.remove('d-none');

    document.getElementById('dialogCard').innerHTML = '';
    document.getElementById('dialogCard').innerHTML += /*html*/`
        <div class="left-dialog-arrow-container">
            <img onclick="arrowLeft(${i})" class="arrow" src="./icon/black-arrow-back.png" alt="">
        </div>
        <div  class="big-card-container">
            <img src="${picturesPokemon[i]}" class="bigPictureCard" alt="">
            <div class="bigCardHeader fw-bold">
                <div>#${i + 1}</div>            <!--ID faengt bei 1 an--> 
                <div>${namePokemon[i]}</div>
            </div>
            <div class="bigCardType fw-semibold">
                <div class="card-text">
                    ${typesPokemon[i]}  
                </div>
                <div class="card-text">
                    2. type  
                </div>
            </div>
        </div>
        <div class="right-dialog-arrow-container">
            <img onclick="arrowRight(${i})" class="arrow" src="./icon/black-arrow-forward.png" alt="">
        </div>
    `
}


function closeDialog() {
    document.getElementById('bgDialog').classList.add('d-none');

}


function arrowLeft(i) {
    let j = --i;

    event.stopPropagation();
    if (j < 0) {
        openImage(images.length - 1);
    } else {
        openImage(j);
    }


}


function arrowRight(i) {
    let j = ++i;

    event.stopPropagation();
    if (j >= images.length) {
        openImage(0);
    } else {
        openImage(j);

    }
}