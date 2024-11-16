import { useState } from "react";
import pokemonData from "../pokemonapi.json";
import { Link } from "react-router-dom";
// function fetchPokemons(search) {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
//     .then((response) => response.json())
//     .then((data) => data);
// }

export default function Search() {
  const pokemonList = pokemonData.results;
  const [searchTerm, setSearchTerm] = useState("");

  const results = pokemonList
    .filter((pokemon) => pokemon.name.startsWith(searchTerm))
    .slice(0, 10);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="mt-36 flex flex-col  justify-center items-center ">
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Search Pokemon"
          className="w-96 rounded-md bg-zinc-700 p-2 pl-4 text-xl"
        />
      </div>
      <ul className="flex flex-col gap-4 max-w-5xl flex-wrap items-start mt-5">
        {results.map((pokemon, i) => {
          return (
            searchTerm && (
              <li key={pokemon.name} className="flex flex-row text-2xl">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className={
                    "text-zinc-400 hover:text-zinc-200 transition-colors"
                  }
                >
                  <span>{i}.&nbsp;</span>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
