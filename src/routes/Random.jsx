import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";

const POKEMON_COUNT = 3;
const MAX_POKEMON_ID = 1025;

const fetchAbility = async (abilityName) => {
  const abilityPromise = await fetch(
    `https://pokeapi.co/api/v2/ability/${abilityName}`
  );
  const abilityData = await abilityPromise.json();

  const ability =
    abilityData.effect_entries[1]?.short_effect ||
    abilityData.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    )[0].flavor_text ||
    "No abilities";
  return ability;
};

const fetchPokemon = async (id) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await pokemon.json();

  const name = pokemonData.name;
  const spriteUrl = pokemonData.sprites.front_default;
  const abilityName = pokemonData.abilities[0].ability.name;
  const ability = await fetchAbility(abilityName);

  return {
    name,
    spriteUrl,
    ability,
  };
};

const getRandomIds = (count) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1
  );
};

export default function Random() {
  const [id, setId] = useState(() => getRandomIds(POKEMON_COUNT));
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    const handleFetchPokemon = async () => {
      setIsLoading(true);
      
      try {
        const pokemonPromises = id.map((id) => fetchPokemon(id));
        const pokemonData = await Promise.all(pokemonPromises);

        if (!ignore) {
          setError(null);
          setPokemon(pokemonData);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchPokemon();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleClick = () => {
    setId(getRandomIds(POKEMON_COUNT));
  };

  return isLoading ? (
    <div className="flex flex-col items-center justify-center mt-56">
      <Loading />
    </div>
  ) : error ? (
    <div className="flex flex-col items-center justify-center mt-56">
      <h2 className="text-red-500">{error}</h2>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="flex flex-row gap-5 items-center justify-center ">
        {pokemon?.map((pokemon, i) => (
          <PokemonCard
            key={i}
            name={pokemon.name}
            spriteUrl={pokemon.spriteUrl}
            ability={pokemon.ability}
          />
        ))}
      </div>
      <button
        className="bg-zinc-800 text-zinc-300 rounded-lg py-3 px-4 mt-6 text-xl focus:bg-zinc-600 hover:bg-zinc-700 transition-colors"
        onClick={handleClick}
      >
        Refresh
      </button>
    </div>
  );
}
