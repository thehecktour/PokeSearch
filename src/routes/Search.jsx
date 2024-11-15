import { useState, useEffect } from "react";
import pokemonData from "../pokemonapi.json";
import PokemonCard from "../components/PokemonCard";

function fetchPokemons(search) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then((response) => response.json())
    .then((data) => data);
}

export default function Search() {
  const pokemonList = pokemonData.results;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mt-36 flex flex-col  justify-center items-center ">
      <input
        onChange={handleChange}
        value={searchTerm}
        type="text"
        placeholder="Search Pokemon"
        className="w-96 rounded-md bg-zinc-700 p-2 pl-4 text-xl"
      />
      <ul className="flex flex-row gap-4 max-w-5xl flex-wrap justify-center items-center">
        {filteredPokemonList.map((pokemon) => {
          return (
            <li key={pokemon.id} className="flex flex-row justify-center mt-5">
              <PokemonCard
                name={pokemon.name}
                url="https://img.pokemondb.net/sprites/diamond-pearl/shiny/pikachu-f.png"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
