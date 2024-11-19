import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import PagesNav from "../components/PagesNav";

const fetchPokemonsByType = async (selectedType) => {
  const type = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
  const typeData = await type.json();
  return typeData.pokemon.map(({ pokemon }) => pokemon);
};

const fetchPokemonDetails = async (pokemonUrl) => {
  const pokemonPromise = await fetch(pokemonUrl);
  const pokemonData = await pokemonPromise.json();
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
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState([]);

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
        <h2 className="text-3xl text-red-200">Failed to load pokemon data </h2>
        <h3 className="text-xl">Error description: {error.message}</h3>
      </div>
    );
  }

  return (
    <div className="md:5/6 mt-5 w-11/12 transition-all sm:w-4/5 lg:w-3/5 xl:w-1/2">
      <div className="align-center my-2 flex flex-wrap justify-center gap-1">
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
          <PokemonGrid pokemons={pokemonDetails} error={error} />
          <PagesNav
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      ) : (
        <div className="mt-24 flex justify-center">
          <h1 className="text-3xl text-zinc-200">No results found</h1>
        </div>
      )}
    </div>
  );
}
