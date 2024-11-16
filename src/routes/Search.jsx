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
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Search Pokemon"
          className="w-96 rounded-md bg-zinc-700 p-2 pl-4 text-xl"
        />
      </div>
      {searchTerm && <PokemonList results={results} />}
    </div>
  );
}
