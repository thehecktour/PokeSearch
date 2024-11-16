import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PokemonCard from "../components/PokemonCard";

const fetchAbility = async (abilityName) => {
  const abilityPromise = await fetch(
    `https://pokeapi.co/api/v2/ability/${abilityName}`,
  );
  const abilityData = await abilityPromise.json();

  const ability =
    abilityData.effect_entries[1]?.short_effect ||
    abilityData.flavor_text_entries.filter(
      (entry) => entry.language.name == "en",
    )[0].flavor_text ||
    "No abilities";
  return ability;
};

const fetchPokemon = async (name) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonData = await pokemon.json();

  const spriteUrl = pokemonData.sprites.front_default;
  const abilityName = pokemonData.abilities[0].ability.name;
  const ability = await fetchAbility(abilityName);

  return {
    name,
    spriteUrl,
    ability,
  };
};

export default function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const generatePokemon = async () => {
      try {
        const pokemon = await fetchPokemon(name);
        setPokemon(pokemon);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    generatePokemon();
  }, [name]);

  if (isLoading) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">Failed to fetch pokemon data </h2>
        <h3 className="text-xl">Error description: {error.message}</h3>
      </div>
    );
  }
  return (
    <div className="mt-24 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-5">
        <PokemonCard
          name={pokemon.name}
          spriteUrl={pokemon.spriteUrl}
          ability={pokemon.ability}
        />
      </div>
    </div>
  );
}
