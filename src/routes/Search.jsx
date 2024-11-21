import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import PagesNav from "../components/PagesNav";
import LoadingGrid from "../components/LoadingGrid";
import TypesRow from "../components/TypesRow";
import { motion } from "motion/react";

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

  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filteredByNamePokemons = pokemons.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredByNamePokemons.length / itemsPerPage);

  const pageResults = filteredByNamePokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setIsLoading(true);

    if (!selectedType) {
      setPokemons(allPokemons);
      return;
    }

    let ignore = false;

    const handleFetchPokemons = async () => {
      try {
        const pokemonsByType = await fetchPokemonsByType(selectedType);
        if (!ignore) {
          setError(null);
          setPokemons(pokemonsByType);
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
  }, [selectedType]);

  useEffect(() => {
    let ignore = false;

    const handlefetchDetails = async () => {
      if (!pageResults.length) {
        setPokemonDetails([]);
        setIsLoading(false);
        return;
      }

      try {
        const pokemonPromises = pageResults.map((result) =>
          fetchPokemonDetails(result.url),
        );
        const details = await Promise.all(pokemonPromises);
        if (!ignore) {
          setPokemonDetails(details);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    handlefetchDetails();
    return () => {
      ignore = true;
    };
  }, [pokemons, currentPage, searchTerm]);

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
    setIsLoading(true);
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
    <div className="mt-5 w-11/12 sm:w-4/5 lg:w-3/5 xl:w-3/4 2xl:w-1/2">
      <TypesRow
        types={types}
        selectedType={selectedType}
        handleTypeToggle={handleTypeToggle}
      />
      <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
      {totalPages > 0 && (
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-800/50 p-4 backdrop-blur-sm xl:h-[42rem]"
        >
          {isLoading ? (
            <LoadingGrid itemsPerPage={itemsPerPage} />
          ) : (
            <PokemonGrid pokemons={pokemonDetails} error={error} />
          )}
          <PagesNav
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </motion.div>
      )}
    </div>
  );
}
