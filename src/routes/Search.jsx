import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import pokemonNames from "../assets/pokemonNames.json";
import pokemonTypes from "../assets/pokemonTypes.json";
import SearchBar from "../components/SearchBar";
import NavButtons from "../components/NavButtons";

const fetchPokemonsByType = async (selectedType) => {
  const type = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
  const typeData = await type.json();
  const pokemons = typeData.pokemon.map(({ pokemon }) => pokemon);
  return pokemons;
};

export default function Search() {
  const types = pokemonTypes.results;
  const [Pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("true");
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredResults = Pokemons.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    let ignore = false;
    if (!selectedType) {
      setPokemons(pokemonNames.results);
      return;
    }
    const handleFetchPokemons = async () => {
      setIsLoading(true);

      try {
        const filteredPokemons = await fetchPokemonsByType(selectedType);
        if (!ignore) {
          setError(null);
          setPokemons(filteredPokemons);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchPokemons();
    return () => {
      ignore = true;
    };
  }, [selectedType]);

  useEffect(() => {
    const search = localStorage.getItem("search");
    const type = localStorage.getItem("type");
    if (type) {
      setSelectedType(type);
    }
    if (search) {
      setSearchTerm(search);
    }
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    localStorage.setItem("search", search);
    setCurrentPage(1);
  };

  const handleTypeToggle = (e, type) => {
    if (e.target.value === selectedType) {
      setSelectedType("");
      localStorage.setItem("type", "");
    } else {
      setSelectedType(type);
      localStorage.setItem("type", type);
    }
    setCurrentPage(1);
  };

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
      <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
      <div className="align-center mt-2 flex max-w-xl flex-wrap justify-center gap-2">
        {types.map((type) => {
          return (
            <button
              key={type.name}
              value={type.name}
              onClick={(e) => handleTypeToggle(e, type.name)}
              className={
                "rounded-lg px-4 py-2 text-zinc-300 transition-colors " +
                (selectedType === type.name
                  ? " bg-zinc-600 text-zinc-100"
                  : "bg-zinc-800 hover:bg-zinc-700")
              }
            >
              {type.name}
            </button>
          );
        })}
      </div>
      {totalPages > 0 && (
        <div>
          <PokemonList
            results={paginatedResults}
            currentPage={currentPage}
            totalPages={totalPages}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
          {totalPages > 1 && (
            <NavButtons
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      )}
    </div>
  );
}
