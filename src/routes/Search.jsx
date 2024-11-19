import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import PagesNav from "../components/PagesNav";
import Loading from "../components/Loading";

const fetchPokemonsByType = async (selectedType) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/type/${selectedType}`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemons by type, status: ${response.status}`,
    );
  }
  const pokemonsData = await response.json();
  return pokemonsData.pokemon.map(({ pokemon }) => pokemon);
};

const fetchPokemonDetails = async (pokemonUrl) => {
  const response = await fetch(pokemonUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemon details, status: ${response.status}`,
    );
  }
  const pokemonData = await response.json();
  return {
    name: pokemonData.name,
    id: pokemonData.id,
    url: pokemonData.sprites.other["official-artwork"].front_default,
  };
};

export default function Search() {
  const types = pokemonTypes.results;
  const allPokemons = pokemonList.results;
  const itemsPerPage = 8;

  const [pokemons, setPokemons] = useState(allPokemons);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
      return;
    }
    let ignore = false;
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
      }
    };

    handleFetchPokemons();
    return () => {
      ignore = true;
    };
  }, [selectedType, allPokemons]);

  useEffect(() => {
    let ignore = false;

    const fetchDetails = async () => {
      if (!paginatedResults.length) {
        setPokemonDetails([]);
        setIsLoading(false);
        return;
      }

      try {
        const pokemonPromises = paginatedResults.map((result) =>
          fetchPokemonDetails(result.url),
        );
        const details = await Promise.all(pokemonPromises);
        if (!ignore) {
          setPokemonDetails(details);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();
    return () => {
      ignore = true;
    };
  }, [paginatedResults]);

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
      setIsLoading(true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (error) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">Failed to load pokemon data</h2>
        <h3 className="text-xl">{error.message}</h3>
      </div>
    );
  }

  return (
    <div className="mt-5 w-11/12 transition-all sm:w-4/5 lg:w-3/5 xl:w-3/4 2xl:w-1/2">
      <div className="my-2 flex flex-wrap justify-center gap-1">
        {types.map((type) => {
          const isSelected = type.name === selectedType;
          return (
            <button
              key={type.name}
              value={type.name}
              onClick={(e) => handleTypeToggle(e, type.name)}
              className={`rounded-full border ${type.color} px-3 py-1 text-zinc-200 transition-all hover:brightness-110 ${isSelected ? "brightness-120 scale-105 border-white shadow-lg" : "border-zinc-950"}`}
            >
              {type.emoji} {type.name}
            </button>
          );
        })}
      </div>
      <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
      {totalPages > 0 ? (
        <div className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-800/50 p-4 backdrop-blur-sm">
          {isLoading ? (
            <div className="mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-60 items-center justify-center rounded-2xl bg-zinc-800 p-4 backdrop-blur-sm"
                >
                  <Loading />
                </div>
              ))}
            </div>
          ) : (
            <PokemonGrid pokemons={pokemonDetails} error={error} />
          )}
          <PagesNav
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      ) : (
        <div className="mt-24 flex justify-center">
          <h1 className="rounded-xl bg-zinc-800/50 p-4 text-3xl text-zinc-200 backdrop-blur-sm">
            No results found
          </h1>
        </div>
      )}
    </div>
  );
}
