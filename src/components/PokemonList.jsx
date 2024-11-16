/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PokemonList({ results }) {
  return (
    <ul className="mt-5 flex max-w-5xl flex-col flex-wrap items-start gap-4">
      {results.map((pokemon, i) => {
        return (
          <li key={pokemon.name} className="flex flex-row text-2xl">
            <Link
              to={`/pokemon/${pokemon.name}`}
              className={"text-zinc-400 transition-colors hover:text-zinc-200"}
            >
              <span>{i+1}.&nbsp;</span>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
