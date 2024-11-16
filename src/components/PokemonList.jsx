/* eslint-disable react/prop-types */
import NavButtons from "./NavButtons";
import PokemonLink from "./PokemonLink";

export default function PokemonList({
  results,
  currentPage,
  totalPages,
  handleNextPage,
  handlePrevPage,
}) {
  return (
    <>
      <ul className="mt-5 flex max-w-5xl flex-col flex-wrap items-start gap-4">
        {results.map((pokemon, i) => {
          return (
            <li key={pokemon.name} className="flex flex-row text-2xl">
              <PokemonLink
                name={pokemon.name}
                i={i}
                currentPage={currentPage}
              />
            </li>
          );
        })}
      </ul>
      <NavButtons
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
