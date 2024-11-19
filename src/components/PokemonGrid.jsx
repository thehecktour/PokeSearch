/* eslint-disable react/prop-types */
import PokemonPreview from "./PokemonPreview";

export default function PokemonGrid({ pokemons, error }) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">
          Failed to load pokemon preview
        </h2>
        <h3 className="text-xl">Error description: {error.message}</h3>
      </div>
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
