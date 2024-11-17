import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PokemonDetails from "../components/PokemonDetails";

const fetchAbilities = async (abilities) => {
  const abilitiesPromises = abilities.map(async (abilityData) => {
    const response = await fetch(abilityData.ability.url);
    const data = await response.json();
    
    return {
      name: abilityData.ability.name,
      isHidden: abilityData.is_hidden,
      description: data.effect_entries.find(entry => entry.language.name === "en")?.short_effect ||
        data.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text ||
        "No description available"
    };
  });

  return Promise.all(abilitiesPromises);
};

const fetchPokemon = async (name) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemonData = await pokemon.json();

  const abilities = await fetchAbilities(pokemonData.abilities);

  const types = pokemonData.types.map((type) => type.type.name);
  const stats = pokemonData.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
  const moves = pokemonData.moves.slice(0, 4).map((move) => move.move.name);
  const height = pokemonData.height / 10;
  const weight = pokemonData.weight / 10;

  return {
    name,
    spriteUrl: pokemonData.sprites.front_default,
    abilities,
    types,
    stats,
    height,
    weight,
    moves,
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
    <main className="container mx-auto px-4 py-8">
      <PokemonDetails pokemon={pokemon} />
    </main>
  );
}
