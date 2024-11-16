import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
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
        <div className="flex flex-row items-center">
          <input
            onChange={handleChange}
            value={searchTerm}
            type="text"
            placeholder="Search Pokemon"
            className="w-96 rounded-md border border-zinc-700 bg-zinc-700 p-2 pl-4 text-xl outline-none focus:border-zinc-200"
          />

          <form className="ml-2 w-auto">
            <select
              id="tag"
              className="block w-auto rounded-lg border border-zinc-700 bg-zinc-700 p-3 text-white placeholder-gray-400 focus:border-zinc-200"
            >
              <option value="name">--Search by--</option>
              <option selected value="name">
                Name
              </option>
              <option value="ability">Ability</option>
            </select>
          </form>
        </div>
      </div>
      {searchTerm && <PokemonList results={results} />}
    </div>
  );
}
