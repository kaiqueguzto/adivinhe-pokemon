const form = document.querySelector("#form");
const inputPokemon = document.querySelector("#pokemon-input");
const pokemonDOM = document.querySelector(".pokemon-image");
const resultDOM = document.querySelector(".result");

const api = 'https://pokeapi.co/api/v2/pokemon';

let pokemonName = '';

const fetchPokemon = async (id) => {

  const response = await fetch(`${api}/${id}`);
  const pokemon = await response.json();

  return pokemon;

}

const guessToPokemon = (name) => {
  resultDOM.innerHTML = '';
  const pokemonValue = inputPokemon.value;

  if (pokemonValue != name) {
    resultDOM.innerHTML =`
      <span>Ohhh que pena você errou...</span>
    `;

    return;
  }

  resultDOM.innerHTML = `
    <span>Parabéns você acertou !!</span>
    <button onClick="nextPokemon()">Próxima</button>
  `;
}

const nextPokemon = async () => {
  const randomPokemon = Math.floor(Math.random() * 888);
  const pokemon = await fetchPokemon(randomPokemon);

  const { name } = pokemon;
  pokemonName = name;

  insertPokemonToDom(pokemon);
}

const insertPokemonToDom = (pokemon) => {
  resultDOM.innerHTML = '';

  const { sprites } = pokemon;
  pokemonDOM.innerHTML = `<img src="${sprites.front_default}"></img>`;
}

const init = async () => {
  const randomPokemon = Math.floor(Math.random() * 888);
  const pokemon = await fetchPokemon(randomPokemon);

  const { name } = pokemon;
  pokemonName = name;

  insertPokemonToDom(pokemon);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  guessToPokemon(pokemonName);

});

init();
