import { useEffect, useState, useCallback, useRef } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import LoadingGrid from "../components/LoadingGrid";
import TypesRow from "../components/TypesRow";
import PageTransition from "../components/PageTransition";
import ErrorMessage from "../components/ErrorMessage";

const ITEMS_PER_PAGE = 12;

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
  
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const observer = useRef();
  const lastPokemonElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const filteredByNamePokemons = pokemons.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    setIsLoading(true);
    setPokemonDetails([]);
    setPage(1);
    
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

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageResults = filteredByNamePokemons.slice(startIndex, endIndex);
    
    setHasMore(endIndex < filteredByNamePokemons.length);

    const handleFetchDetails = async () => {
      if (!currentPageResults.length) {
        setIsLoading(false);
        return;
      }

      try {
        const pokemonPromises = currentPageResults.map((result) =>
          fetchPokemonDetails(result.url),
        );
        const details = await Promise.all(pokemonPromises);
        if (!ignore) {
          setPokemonDetails(prev => [...prev, ...details]);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    handleFetchDetails();
    return () => {
      ignore = true;
    };
  }, [page, pokemons, searchTerm]);

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
    setPokemonDetails([]);
    setPage(1);
    setSearchTerm(search);
    localStorage.setItem("search", search);
  };

  const handleTypeToggle = (e, type) => {
    if (e.target.value === selectedType) {
      setSelectedType("");
      localStorage.setItem("type", "");
    } else {
      setSelectedType(type);
      localStorage.setItem("type", type);
    }
    setPokemonDetails([]);
    setPage(1);
  };

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load pokemon data"
        message={error.message}
      />
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto mt-5 w-11/12 sm:w-4/5 lg:w-3/5 xl:w-3/4 2xl:w-7/12">
        <TypesRow
          types={types}
          selectedType={selectedType}
          handleTypeToggle={handleTypeToggle}
        />
        <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
        <div className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-800/40 p-4 backdrop-blur-sm">
          <PokemonGrid 
            pokemons={pokemonDetails}
            lastPokemonRef={lastPokemonElementRef}
          />
          {isLoading && <LoadingGrid itemsPerPage={4} />}
        </div>
      </div>
    </PageTransition>
  );
}
