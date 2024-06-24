let namePokemon = [];
const BASE_URL = "https://pokeapi.co/api/v2/";
const OFFSET = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0";





function init() {
    render();
    fetchDataJsonOffset();
    fetchDataJsonBase();
}

async function fetchDataJsonOffset() {
    let response = await fetch(OFFSET);         // Holt die Daten von der API
    let responseAsJson = await response.json(); // Wandelt die Antwort in ein JSON-Objekt um.
    let results = responseAsJson['results'];   // Speichert das Ergebnis in der Variable - namePoke = (5) [{…}, {…}, {…}, {…}, {…}]


    for (let i = 0; i < results.length; i++) {
        const result = results[i];

        console.log(result.name);
        namePokemon.push(result.name);

        cardPokemon(i);
    }
}

async function fetchDataJsonBase() {
    let response = await fetch(BASE_URL);
    let responseAsJson2 = await response.json();
    // let re = responseAsJson['r'];   
    console.log(responseAsJson2);

    // for (let i = 0; i < re.length; i++) {
    //     const res = re[i];

    //     console.log(res.name);
    //     // namePokemon.push(res.name);

    //     // cardPokemon(i);
    // }
}



function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
}


function cardPokemon(i) {
    return content.innerHTML += /*html*/`

    <div class="card" style="width: 18rem;">
        <div class="card-header">
            <div>#${i + 1}</div>
            <div>${namePokemon[i]}</div>
        </div>
        <img src="./img/001.png" class="card-img-top" alt="">
        <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                card's content.</p>
        </div>
    </div>
`;

}