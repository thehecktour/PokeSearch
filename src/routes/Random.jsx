import Pokemon from "../components/Pokemon";

import { useState, useEffect } from "react";

const POKEMON_COUNT = 3;

const fetchPokemon = async (id) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const ability = await fetch(`https://pokeapi.co/api/v2/ability/${id}/`);
  const pokemonData = await pokemon.json();
  const abilityData = await ability.json();
  return {
    name: pokemonData.name,
    url: pokemonData.sprites.front_default,
    ability: abilityData.effect_entries[1].short_effect,
  };
};

const getRandomId = () => {
  return Math.floor(Math.random() * 151) + 1;
};

export default function Random() {
  const [id, setId] = useState(Array(POKEMON_COUNT).fill(0).map(getRandomId));
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    let ignore = false;

    const generatePokemon = async () => {
      const pokemonPromises = id.map((id) => fetchPokemon(id));
      const pokemonData = await Promise.all(pokemonPromises);

      if (!ignore) {
        setPokemon(pokemonData);
      }
    };

    generatePokemon();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleClick = () => {
    setId(id.map(() => getRandomId()));
  };

  return (
    <div className="flex flex-col items-center justify-center my-auto">
      <div className="flex flex-row items-center justify-center ">
        {pokemon?.map((pokemon, i) => (
          <Pokemon
            key={i}
            name={pokemon.name}
            url={pokemon.url}
            ability={pokemon.ability}
          />
        ))}
      </div>
      <button
        className="bg-zinc-800 text-zinc-300 rounded-lg py-3 px-4 mt-6 text-xl hover:bg-zinc-700 transition-colors"
        onClick={handleClick}
      >
        Refresh
      </button>
    </div>
  );
}
