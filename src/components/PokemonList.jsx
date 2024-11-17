/* eslint-disable react/prop-types */
import PokemonListItem from "./PokemonListItem";

export default function PokemonList({ results, currentPage }) {
  return (
    <ul className="mx-auto mt-5 grid max-w-xl grid-cols-2 gap-4 p-2">
      {results.map((pokemon, i) => {
        return (
          <li key={pokemon.name} className="flex justify-center">
            <PokemonListItem
              name={pokemon.name}
              i={i}
              currentPage={currentPage}
            />
          </li>
        );
      })}
    </ul>
  );
}
