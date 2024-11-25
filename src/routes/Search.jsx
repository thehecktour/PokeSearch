import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import LoadingGrid from "../components/LoadingGrid";
import TypesRow from "../components/TypesRow";
import PageTransition from "../components/PageTransition";
import ErrorMessage from "../components/ErrorMessage";

const allPokemonNames = pokemonList.results.map(({ name }) => name);

// Get pokemons by names
const fetchPokemons = async (names) => {
  const pokemonPromises = names.slice(0, 15).map(async (name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json();
  });
  const pokemonsData = await Promise.all(pokemonPromises);
  return pokemonsData.map((pokemon) => {
    return {
      name: pokemon.name,
      id: pokemon.id,
      img: pokemon.sprites.other["official-artwork"].front_default,
    };
  });
};

// Get names for types array
const fetchNamesByType = async (types) => {
  const typePromises = types.map(async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    return await response.json();
  });
  const typesData = await Promise.all(typePromises);
  const typesPokemon = typesData.map((type) => type.pokemon);
  const pokemonNamesByTypes = typesPokemon.map((pokemon) =>
    pokemon.map((el) => el.pokemon.name),
  );
  return pokemonNamesByTypes;
};

export default function Search() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore search term and types
  useEffect(() => {
    const searchTerm = localStorage.getItem("searchTerm");
    const types = JSON.parse(localStorage.getItem("types"));
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
    if (types) {
      setTypes(types);
    }
  }, []);

  // Set searchTerm
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    localStorage.setItem("searchTerm", searchTerm);
  };

  // Toggle types
  const handleTypeToggle = (type) => {
    if (types.includes(type)) {
      const newTypes = types.filter((t) => t !== type);
      setTypes(newTypes);
      localStorage.setItem("types", JSON.stringify(newTypes));
    } else {
      setTypes([...types, type]);
      localStorage.setItem("types", JSON.stringify([...types, type]));
    }
  };

  // Get common names in arrays
  const findCommonNames = (namesArrs) => {
    if (namesArrs.length === 0) return [];
    return namesArrs[0].filter((item) =>
      namesArrs.every((arr) => arr.includes(item)),
    );
  };

  // Filter names by search term
  const filterBySearchTerm = (names) => {
    if (names.length === 0) return [];
    return names.filter((name) => name.startsWith(searchTerm.toLowerCase()));
  };

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);

    const handleFetchPokemons = async () => {
      let filteredNames;
      if (types.length) {
        const pokemonNamesByTypes = await fetchNamesByType(types);
        const commonNames = findCommonNames(pokemonNamesByTypes);
        filteredNames = filterBySearchTerm(commonNames);
      } else {
        filteredNames = filterBySearchTerm(allPokemonNames);
      }
      const pokemons = await fetchPokemons(filteredNames);
      console.log(pokemons);
      setPokemons(pokemons);
      setIsLoading(false);
    };

    handleFetchPokemons();
    return () => {
      ignore = true;
    };
  }, [searchTerm, types]);

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
        <TypesRow selectedTypes={types} handleTypeToggle={handleTypeToggle} />
        <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
        <PokemonGrid pokemons={pokemons} />
        {/* {isLoading && <LoadingGrid itemsPerPage={4} />} */}
      </div>
    </PageTransition>
  );
}
