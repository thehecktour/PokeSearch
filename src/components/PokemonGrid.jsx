/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import PokemonPreview from "./PokemonPreview";

const fetchPokemon = async (pokemonUrl) => {
  const pokemonPromise = await fetch(pokemonUrl);
  const pokemonData = await pokemonPromise.json();
  const name = pokemonData.name;
  const id = pokemonData.id;
  const url = pokemonData.sprites.other["official-artwork"].front_default;

  return {
    name,
    id,
    url,
  };
};

export default function PokemonGrid({ pokemonUrls }) {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const handleFetchPokemons = async () => {
      try {
        const pokemonPromises = pokemonUrls.map(fetchPokemon);
        const pokemons = await Promise.all(pokemonPromises);
        if (!ignore) {
          setPokemons(pokemons);
          setError(null);
        }
      } catch (err) {
        setError(err);
      }
    };
    handleFetchPokemons();
    return () => {
      ignore = true;
    };
  }, [pokemonUrls]);
  if (error) {
    return (
      <h2 className="text-3xl text-red-200">Failed to fetch pokemon data </h2>
    );
  }
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <PokemonPreview key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
