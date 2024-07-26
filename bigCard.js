responsePokemonSpecies = [];

async function fetchDataJsonPokemonSpecies(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`);         // Holt die Daten von der API
    let responseAsJsonSpecies = await response.json();                                             // Wandelt die Antwort in ein JSON-Objekt um.

    responsePokemonSpecies.push(responseAsJsonSpecies);
    gender = pokemonGenderRate(responsePokemonSpecies, i);
}


function baseStatsTablePokemon(i) {
    let hp = allPokemons[i]['stats'][0]['base_stat'];
    let attack = allPokemons[i]['stats'][1]['base_stat'];
    let defense = allPokemons[i]['stats'][2]['base_stat'];
    let spAtk = allPokemons[i]['stats'][3]['base_stat'];
    let spDef = allPokemons[i]['stats'][4]['base_stat'];
    let speed = allPokemons[i]['stats'][5]['base_stat'];
    let total = hp + attack + defense + spAtk + spDef + speed;
    let totalBar = (total / 600) * 100;

    return {hp, attack, defense, spAtk, spDef, speed, total, totalBar };
}


function pokemonGenderRate(responsePokemonSpecies, i) {
    let gender_rate = responsePokemonSpecies[i].gender_rate;
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


function typeColorBigCard(i) {
    let color = allPokemons[i]['types']['0']['type']['name'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
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
    let baseStats = baseStatsTablePokemon(i);

    let picture = allPokemons[i]['sprites']['other']['dream_world']['front_default'];
    let type_1 = allPokemons[i]['types']['0']['type']['name'];
    let type_2 = allPokemons[i]['types']['1']?.['type']['name'] || '';

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
                <img src="${picture}" class="big-picture-card" alt="">
                <div class="big-card-type-name">
                    <div>
                        <img onclick="arrowLeft(${i})" class="mini-arrow mini-arrow-left" src="./icon/black-arrow-back.png" alt="">
                    </div>
                    <div>
                        <div class="big-card-header fw-bold">
                            <div>#${allPokemons[i]['id']}</div>            <!--ID faengt bei 1 an--> 
                            <div>${allPokemons[i]['name'].toUpperCase()}</div>
                        </div>
                        <div class="big-card-type fw-semibold mb-3">
                            <div class="card-text">
                                ${type_1}  
                            </div>
                            <div class="card-text">
                                ${type_2}  
                            </div>
                        </div>
                    </div>
                    <div>
                        <img onclick="arrowRight(${i})" class="mini-arrow mini-arrow-right" src="./icon/black-arrow-forward.png" alt="">
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
                            <td class="fw-semibold">${responsePokemonSpecies[i].genera[7].genus}</td>
                        </tr>
                        <tr>
                            <td class="w-90">Height</td>
                            <td class="fw-semibold">${allPokemons[i]['height']} cm</td>
                        </tr>
                        <tr>
                            <td class="w-90">Weight</td>
                            <td class="fw-semibold">${allPokemons[i]['weight']} kg</td>
                        </tr>
                        <tr>
                            <td class="w-90">Abilities</td>
                            <td class="fw-semibold">${allPokemons[i]['abilities'][0]['ability']['name']}, ${allPokemons[i]['abilities'][1]?.['ability']['name'] || ''}</td>
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
                            <td class="fw-semibold">${responsePokemonSpecies[i].egg_groups[0].name}, ${responsePokemonSpecies[i].egg_groups[1]?.name || ''}</td>
                        </tr>
                        <tr>
                            <td class="w-90">Egg Cycle</td>
                            <td class="fw-semibold">${responsePokemonSpecies[i].hatch_counter}</td>
                        </tr>
                    </table>
                </div>
<!------------------------------------------------------------------------------------------------------------->
                <div id="baseStatsCharacter" class="h-100 d-none">
                    <div class="table-responsive m-2 h-100">
                        <table class="table-baseStats mb-3">
                            <tr>
                                <td class="pe-4">HP</td>
                                <td class="fw-semibold">${baseStats.hp}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar">
                                    <div class="progress-bar" style="width: ${baseStats.hp}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Attack</td>
                                <td class="fw-semibold">${baseStats.attack}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${baseStats.attack}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="pe-4">Defense</td>
                                <td class="fw-semibold">${baseStats.defense}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar">
                                    <div class="progress-bar" style="width: ${baseStats.defense}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sp. Atk</td>
                                <td class="fw-semibold">${baseStats.spAtk}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${baseStats.spAtk}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Sp. Def</td>
                                <td class="fw-semibold">${baseStats.spDef}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${baseStats.spDef}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td class="pe-3 fw-semibold">${baseStats.speed}</td>
                                <td class="me-3 w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${baseStats.speed}%"></div>
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td class="fw-semibold">${baseStats.total}</td>
                                <td class="w-100p">
                                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar" style="width: ${baseStats.totalBar}%"></div>
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
    typeColorBigCard(i);
}



function closeDialog() {
    document.getElementById('bgDialog').classList.add('d-none');

}


function arrowLeft(i) {
    let j = --i;

    event.stopPropagation();
    if (j < 0) {
        openDialogPokemon(allPokemons.length - 1);
        fetchDataJsonPokemonSpecies(allPokemons.length - 1);

    } else {
        openDialogPokemon(j);
        fetchDataJsonPokemonSpecies(j);
    }


}


function arrowRight(i) {
    let j = ++i;

    event.stopPropagation();
    if (j >= allPokemons.length) {
        fetchDataJsonPokemonSpecies(0);
        openDialogPokemon(0);

    } else {
        fetchDataJsonPokemonSpecies(j);
        openDialogPokemon(j);
    }
}