let allPokemon = []; // Array zur Speicherung aller geladenen Pokémon
let currentIndex = 0; // Index, um zu verfolgen, wie viele Pokémon bereits angezeigt wurden
const loadMoreCount = 10; // Anzahl der Pokémon, die bei jedem Klick auf "Load More" angezeigt werden



// Funktion, um Pokémon-Daten von der API zu laden
async function fetchPokemonData() {
    for (let i = 1; i <= 151; i++) { // Annahme: Es werden die ersten 151 Pokémon geladen
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`); // API-Aufruf für Pokémon-Daten
        let pokemon = await response.json(); // Antwort in JSON-Objekt umwandeln
        allPokemon.push(pokemon); // Pokémon zum Array hinzufügen
    }
}


// Funktion, um Pokémon anzuzeigen
function displayPokemon(startIndex, count) {
    const container = document.getElementById('pokemonContainer'); // Container-Element
    for (let i = startIndex; i < startIndex + count && i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];  // Pokémon aus dem Array holen
        const pokemonDiv = document.createElement('div'); // Neues div-Element für Pokémon erstellen
        pokemonDiv.innerHTML = `
            <p>#${pokemon.id} ${pokemon.name}</p> <!-- Pokémon-ID und -Name anzeigen -->
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"> <!-- Pokémon-Bild anzeigen -->
        `;
        container.appendChild(pokemonDiv); // Pokémon-Element zum Container hinzufügen
    }
}

function loadMoreButton() {
    displayPokemon(currentIndex, loadMoreCount); // Nächste 10 Pokémon anzeigen
    currentIndex += loadMoreCount; // Index aktualisieren
    if (currentIndex >= allPokemon.length) { // Wenn alle Pokémon angezeigt wurden
        document.getElementById('loadMoreBtn').style.display = 'none'; // Button ausblenden
    }
}


// // Event-Listener für den "Load More"-Button
// document.getElementById('loadMoreBtn').addEventListener('click', () => {
//     displayPokemon(currentIndex, loadMoreCount); // Nächste 10 Pokémon anzeigen
//     currentIndex += loadMoreCount; // Index aktualisieren
//     if (currentIndex >= allPokemon.length) { // Wenn alle Pokémon angezeigt wurden
//         document.getElementById('loadMoreBtn').style.display = 'none'; // Button ausblenden
//     }
// });


// Initialisierung
fetchPokemonData().then(() => {
    displayPokemon(currentIndex, loadMoreCount); // Erste 10 Pokémon anzeigen
    currentIndex += loadMoreCount; // Index aktualisieren
});


