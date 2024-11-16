import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pokemonData from "../pokemonapi.json";

export default function Search() {
  const pokemonList = pokemonData.results;
  const [searchTerm, setSearchTerm] = useState("");

  const results = pokemonList
    .filter((pokemon) => pokemon.name.startsWith(searchTerm))
    .slice(0, 10);

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    localStorage.setItem("search", search);
  };

  useEffect(() => {
    const search = localStorage.getItem("search");
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  return (
    <div>
      <div className="mt-36 flex flex-col items-center justify-center">
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Search Pokemon"
          className="w-96 rounded-md bg-zinc-700 p-2 pl-4 text-xl"
        />
      </div>
      <ul className="mt-5 flex max-w-5xl flex-col flex-wrap items-start gap-4">
        {results.map((pokemon, i) => {
          return (
            searchTerm && (
              <li key={pokemon.name} className="flex flex-row text-2xl">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className={
                    "text-zinc-400 transition-colors hover:text-zinc-200"
                  }
                >
                  <span>{i}.&nbsp;</span>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </Link>
              </li>
            )
          );
        })}
      </ul>
    </div>
  );
}
