import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PokemonDetailedCard from "../components/PokemonDetailedCard";
import ErrorMessage from "../components/ErrorMessage";

const fetchAbility = async ({ ability, is_hidden }) => {
  const response = await fetch(ability.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ability: ${response.status}`);
  }
  const data = await response.json();

  const description =
    data.effect_entries.find((entry) => entry.language.name === "en")
      ?.short_effect ||
    data.flavor_text_entries.find((entry) => entry.language.name === "en")
      ?.flavor_text ||
    "No description available";
  return {
    name: ability.name,
    isHidden: is_hidden,
    description,
  };
};

const fetchPokemon = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon, status: ${response.status}`);
  }
  const pokemonData = await response.json();

  const abilitiesPromises = pokemonData.abilities.map(fetchAbility);
  const abilities = await Promise.all(abilitiesPromises);

  const types = pokemonData.types.map((type) => type.type.name);
  const stats = pokemonData.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
  const spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
  const moves = pokemonData.moves.slice(0, 4).map((move) => move.move.name);
  const height = pokemonData.height / 10;
  const weight = pokemonData.weight / 10;

  return {
    name,
    spriteUrl,
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

    const handleFetchPokemon = async () => {
      try {
        const pokemon = await fetchPokemon(name);
        setPokemon(pokemon);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchPokemon();
  }, [name]);

  if (isLoading) {
    return (
      <div className="mt-56">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage 
        title="Failed to fetch pokemon data"
        message={`Error description: ${error.message}`}
      />
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <PokemonDetailedCard pokemon={pokemon} />
    </main>
  );
}
