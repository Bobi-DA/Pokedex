let allPokemon = [];
let currentIndex = 0;
const loadMoreCount = 10;

async function fetchPokemonData() {
    for (let i = 1; i <= 100; i++) { // Es werden die ersten 100 Pokémon geladen
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let pokemon = await response.json();
        allPokemon.push(pokemon);
    }
}

function displayPokemon(startIndex, count) {
    const container = document.getElementById('pokemonContainer');
    for (let i = startIndex; i < startIndex + count && i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        const pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = `
            <p>#${pokemon.id} ${pokemon.name}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        `;
        container.appendChild(pokemonDiv);
    }
}

document.getElementById('loadMoreBtn').addEventListener('click', () => {
    displayPokemon(currentIndex, loadMoreCount);
    currentIndex += loadMoreCount;
    if (currentIndex >= allPokemon.length) {
        document.getElementById('loadMoreBtn').style.display = 'none';
    }
});

// Initialisierung
fetchPokemonData().then(() => {
    displayPokemon(currentIndex, loadMoreCount);
    currentIndex += loadMoreCount;
});
