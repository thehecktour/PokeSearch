import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";
import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
import ErrorMessage from "../components/ErrorMessage";
import LoadingCards from "../components/LoadingCards";

const POKEMON_COUNT = 3;
const MAX_POKEMON_ID = 1025;

const fetchAbility = async (abilityName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/ability/${abilityName}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch ability, status: ${response.status}`);
  }
  const abilityData = await response.json();
  const ability =
    abilityData.effect_entries[1]?.short_effect ||
    abilityData.flavor_text_entries.find(
      (entry) => entry.language.name === "en",
    )?.flavor_text ||
    "No abilities";
  return ability;
};

const fetchPokemon = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon, status: ${response.status}`);
  }
  const pokemonData = await response.json();

  const name = pokemonData.name;
  const spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
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
    () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1,
  );
};

export default function Random() {
  const [id, setId] = useState(() => getRandomIds(POKEMON_COUNT));
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleRefresh = () => {
    setId(getRandomIds(POKEMON_COUNT));
  };


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
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    handleFetchPokemon();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!pokemon || isLoading) {
    return (
      <PageTransition>
        <LoadingCards count={POKEMON_COUNT} />
      </PageTransition>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load pokemon card"
        message={error.message}
      />
    );
  }

  return (
    <>
      <div className="mt-5 flex flex-col items-center md:mt-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pokemon?.map((pokemon) => (
            <Link
              to={`/pokemon/${pokemon.name}`}
              key={pokemon.name}
              className="cursor-pointer"
            >
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                spriteUrl={pokemon.spriteUrl}
                ability={pokemon.ability}
              />
            </Link>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="mb-5 flex items-center gap-3 rounded-lg bg-zinc-800 px-4 py-3 text-xl text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}
