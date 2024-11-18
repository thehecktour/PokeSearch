import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import NavButtons from "../components/NavButtons";
import Loading from "../components/Loading";

const fetchPokemonsByType = async (selectedType) => {
  const type = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
  const typeData = await type.json();
  return typeData.pokemon.map(({ pokemon }) => pokemon);
};

export default function Search() {
  const types = pokemonTypes.results;
  const allPokemons = pokemonList.results;
  const itemsPerPage = 10;

  const [pokemons, setPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const paginatedResults = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!selectedType) {
      setPokemons(allPokemons);
      return;
    }
    let ignore = false;
    const handleFetchPokemons = async () => {
      setIsLoading(true);

      try {
        const filteredPokemons = await fetchPokemonsByType(selectedType);
        console.log(filteredPokemons);
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
  }, [selectedType, allPokemons]);

  useEffect(() => {
    const type = localStorage.getItem("type");
    if (type) {
      setSelectedType(type);
    }
    const search = localStorage.getItem("search");
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

  if (error) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">Failed to fetch pokemon data </h2>
        <h3 className="text-xl">Error description: {error.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {<h1>{selectedType}</h1>}
      <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
      <div className="align-center mt-2 flex max-w-xl flex-wrap justify-center gap-2">
        {types.map((type) => {
          return (
            <button
              key={type.name}
              value={type.name}
              onClick={(e) => handleTypeToggle(e, type.name)}
              className={
                "rounded-3xl bg-zinc-800 px-3 py-2 text-zinc-300 transition-colors hover:bg-zinc-700"
              }
            >
              {type.name}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="">
          <Loading />
        </div>
      )}

      {totalPages > 0 && (
        <div
          className={`rounded-2xl border mt-5 border-zinc-700 bg-zinc-800/50 p-4  backdrop-blur-sm ${
            isLoading ? "opacity-30" : ""
          }`}
        >
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
