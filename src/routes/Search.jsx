import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";

function fetchPokemons(search) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    .then((response) => response.json())
    .then((data) => data);
}

export default function Search() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
    setPokemon();
  };

  useEffect(() => {
    let ignore = false;

    const getPokemons = async () => {
      const pokemonData = await fetchPokemons(search);
      console.log(pokemonData);
      if (!ignore) {
        setPokemon(pokemonData);
      }
    };

    getPokemons();
    return () => {
      ignore = true;
    };
  });

  return (
    <div className="mt-36">
      <input
        onChange={handleChange}
        value={search}
        type="text"
        placeholder="Search Pokemon"
        className="mt-4 w-96 rounded-md bg-zinc-700 p-2 pl-4 text-xl"
      />
      {pokemon?.sprites && (
        <div className="flex flex-row justify-center mt-5">
          <PokemonCard
            name={pokemon.name}
            url={pokemon.sprites.front_default}
            ability={pokemon.abilities[0].ability.name}
          />
        </div>
      )}
    </div>
  );
}
