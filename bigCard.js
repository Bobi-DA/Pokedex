let species = "";
let eggGroups = "";
let height = "";
let weight = "";
let abilitie1 = "";
let abilitie2 = "";
let gender = "";
let eggCycle = "";

let hp = "";
let attack = "";
let defense = "";
let spAtk = "";
let spDef = "";
let speed = "";
let total = "";
let totalBar = "";


async function fetchDataJsonPokemonSpecies(i) {
    let id = i + 1;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);         // Holt die Daten von der API
    let responseAsJson = await response.json();                                             // Wandelt die Antwort in ein JSON-Objekt um.

    await aboutTablePokemon(responseAsJson, i);
    await baseStatsTablePokemon(i);
}

async function aboutTablePokemon(responseAsJson, i) {
    species = responseAsJson.genera[7].genus;
    eggGroups = responseAsJson.egg_groups[0].name;
    height = singlePokemon[i].height * 10;
    weight = singlePokemon[i].weight / 10;
    abilitie1 = singlePokemon[i].abilities[0].ability.name;
    abilitie2 = singlePokemon[i].abilities[1]?.ability.name || '';
    gender = pokemonGenderRate(responseAsJson);
    eggCycle = responseAsJson.hatch_counter;
}


async function baseStatsTablePokemon(i) {
    hp = singlePokemon[i]['stats'][0]['base_stat'];
    attack = singlePokemon[i]['stats'][1]['base_stat'];
    defense = singlePokemon[i]['stats'][2]['base_stat'];
    spAtk = singlePokemon[i]['stats'][3]['base_stat'];
    spDef = singlePokemon[i]['stats'][4]['base_stat'];
    speed = singlePokemon[i]['stats'][5]['base_stat'];
    total = hp + attack + defense + spAtk + spDef + speed;
    totalBar = (total / 600) * 100;
}


function pokemonGenderRate(responseAsJson) {
    let gender_rate = responseAsJson.gender_rate;
    let strGender = "";

    if (gender_rate === -1) {
        strGender = "genderless";
    } else {
        let fPerecent = (gender_rate / 8) * 100;
        let mPercent = 100 - fPerecent;
        strGender = `&#9794 ${mPercent}% - &#9792 ${fPerecent}%`
    }
    return strGender;
}



function typeColorBigCard(type, i) {
    let bgcolor = typeColors[type.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden

    document.getElementById(`bigCardContainer${i}`).style.backgroundColor = bgcolor;
}


function showAbout() {
    document.getElementById('aboutCharacter').classList.remove('d-none');
    document.getElementById('baseStatsCharacter').classList.add('d-none');
    document.getElementById('evolutionCharacter').classList.add('d-none');
    document.getElementById('movesCharacter').classList.add('d-none');
}

function showBaseStats() {
    document.getElementById('baseStatsCharacter').classList.remove('d-none');
    document.getElementById('aboutCharacter').classList.add('d-none');
    document.getElementById('evolutionCharacter').classList.add('d-none');
    document.getElementById('movesCharacter').classList.add('d-none');
}

function showEvolution() {
    document.getElementById('evolutionCharacter').classList.remove('d-none');
    document.getElementById('baseStatsCharacter').classList.add('d-none');
    document.getElementById('movesCharacter').classList.add('d-none');
    document.getElementById('aboutCharacter').classList.add('d-none');
}

function showMoves() {
    document.getElementById('movesCharacter').classList.remove('d-none');
    document.getElementById('baseStatsCharacter').classList.add('d-none');
    document.getElementById('aboutCharacter').classList.add('d-none');
    document.getElementById('evolutionCharacter').classList.add('d-none');
}





async function openDialogPokemon(i) {
    await fetchDataJsonPokemonSpecies(i);

    let dialog = document.getElementById('bgDialog');
    dialog.classList.remove('d-none');

    let dialogCard = document.getElementById('dialogCard');
    dialogCard.innerHTML = '';
    dialogCard.innerHTML += /*html*/`
        <div class="left-dialog-arrow-container">
            <img onclick="arrowLeft(${i})" class="arrow" src="./icon/black-arrow-back.png" alt="">
        </div>
        <div id="bigCardContainer${i}" class="big-card-container" onclick="event.stopPropagation()">
            <div class="big-card-top">
                <img src="${picturesPokemon[i]}" class="big-picture-card" alt="">
                <div class="big-card-type-name">
                    <div class="big-card-header fw-bold">
                        <div>#${i + 1}</div>            <!--ID faengt bei 1 an--> 
                        <div>${namePokemon[i].toUpperCase()}</div>
                    </div>
                    <div class="big-card-type fw-semibold mb-3">
                        <div class="card-text">
                            ${typesPokemon1[i]}  
                        </div>
                        <div class="card-text">
                            ${typesPokemon2[i]}  
                        </div>
                    </div>
                </div>  
            </div>
            <div class="info-container p-3">
                <ul class="">
                    <li><a href="#about" onclick="showAbout()">About</a></li>
                    <li><a href="#baseStats" onclick="showBaseStats()">Base Stats</a></li>
                    <li><a href="#evolution" onclick="showEvolution()">Evolution</a></li>
                    <li><a href="#moves" onclick="showMoves()">Moves</a></li>
                </ul>
<!--------------------------------------------------------------------------------------->
                <div id="aboutCharacter" class="about-character">
                    <table class="about-table-pokemon">
                        <tr>
                            <td class="w-90">Species</td>
                            <td class="fw-semibold">${species}</td>
                        </tr>
                        <tr>
                            <td class="w-90">Height</td>
                            <td class="fw-semibold">${height} cm</td>
                        </tr>
                        <tr>
                            <td class="w-90">Weight</td>
                            <td class="fw-semibold">${weight} kg</td>
                        </tr>
                        <tr>
                            <td class="w-90">Abilities</td>
                            <td class="fw-semibold">${abilitie1}, ${abilitie2}</td>
                        </tr>
                        <tr>
                            <td class="h5"><b>Breeding</b></td>
                        </tr>
                        <tr>
                            <td class="w-90">Gender</td>
                            <td class="fw-semibold">${gender}</td>
                        </tr>
                        <tr>
                            <td class="w-90">Egg Groups</td>
                            <td class="fw-semibold">${eggGroups}</td>
                        </tr>
                        <tr>
                            <td class="w-90">Egg Cycle</td>
                            <td class="fw-semibold">${eggCycle}</td>
                        </tr>
                    </table>
                </div>
<!------------------------------------------------------------------------------------------------------------->
                <div id="baseStatsCharacter" class="h-100 d-none">
                    <div class="table-responsive m-2 h-100">
                        <table class="table-baseStats mb-3">
                            <tr>
                                <td class="pe-4">HP</td>
                                <td class="fw-semibold">${hp}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar">
                                    <div class="progress-bar" style="width: ${hp}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td class="fw-semibold">${attack}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${attack}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="pe-4">Defense</td>
                                <td class="fw-semibold">${defense}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar">
                                    <div class="progress-bar" style="width: ${defense}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sp. Atk</td>
                                <td class="fw-semibold">${spAtk}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${spAtk}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sp. Def</td>
                                <td class="fw-semibold">${spDef}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${spDef}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td class="pe-3 fw-semibold">${speed}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${speed}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td class="fw-semibold">${total}</td>
                                <td class="w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${totalBar}%"></div>
                                </div>
                                </td>
                            </tr>
                        </table>
                        <!-- <p class="mb-1"><b>Type defenses</b></p>
                        <p>abc</p> -->
                    </div>
                </div>
                <div id="evolutionCharacter" class="d-none comming-soon">
                    COMMING SOON
                </div>

                <div id="movesCharacter" class="d-none comming-soon">
                    COMMING SOON
                </div>
            </div>  
    </div>
        <div class="right-dialog-arrow-container">
            <img onclick="arrowRight(${i})" class="arrow" src="./icon/black-arrow-forward.png" alt="">
        </div>
    `;
    typeColorBigCard(typesPokemon1[i], i);
}



function closeDialog() {
    document.getElementById('bgDialog').classList.add('d-none');

}


function arrowLeft(i) {
    let j = --i;

    event.stopPropagation();
    if (j < 0) {
        openDialogPokemon(picturesPokemon.length - 1);
        fetchDataJsonPokemonSpecies(picturesPokemon.length - 1);

    } else {
        openDialogPokemon(j);
        fetchDataJsonPokemonSpecies(j);
    }


}


function arrowRight(i) {
    let j = ++i;

    event.stopPropagation();
    if (j >= picturesPokemon.length) {
        fetchDataJsonPokemonSpecies(0);
        openDialogPokemon(0);

    } else {
        fetchDataJsonPokemonSpecies(j);
        openDialogPokemon(j);
    }
}