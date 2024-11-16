import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import pokemonData from "../pokemonapi.json";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const pokemonList = pokemonData.results;
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResults = pokemonList.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    localStorage.setItem("search", search);
    setCurrentPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    const search = localStorage.getItem("search");
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div>
      <SearchBar handleChange={handleChange} searchTerm={searchTerm} />
      {!searchTerm || totalPages === 0 || (
        <PokemonList
          results={paginatedResults}
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      )}
    </div>
  );
}
