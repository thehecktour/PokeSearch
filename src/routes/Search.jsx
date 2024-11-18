import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import NavButtons from "../components/NavButtons";

const fetchPokemonsByType = async (selectedType) => {
  const type = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
  const typeData = await type.json();
  const pokemonNames = typeData.pokemon.map(({ pokemon }) => pokemon.name);
  return pokemonNames;
};

export default function Search() {
  const types = pokemonTypes.results;
  const allPokemons = pokemonList.results;
  const [pokemons, setPokemons] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState("true");
  const itemsPerPage = 10;

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.startsWith(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const paginatedResults = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!selectedTypes) {
      setPokemons(allPokemons);
      return;
    }
    let ignore = false;
    const handleFetchPokemons = async () => {
      setIsLoading(true);

      try {
        const pokemonPromises = selectedTypes.map((type) =>
          fetchPokemonsByType(type),
        );
        const pokemonsByTypeArr = await Promise.all(pokemonPromises);
        console.log(pokemonsByTypeArr);
        const filteredPokemons = pokemonsByTypeArr[0].filter((name) =>
          pokemonsByTypeArr.every((arr) => arr.includes(name)),
        );
        console.log("sosal");
        if (!ignore) {
          setError(null);
          // setPokemons(flatResults);
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
  }, [selectedTypes]);

  useEffect(() => {
    // const type = localStorage.getItem("type");
    // if (type) {
    //   setSelectedType(type);
    // }
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

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
      // localStorage.setItem("type", "");
    } else {
      setSelectedTypes([...selectedTypes, type]);
      // localStorage.setItem("type", type);
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
      {selectedTypes.map((type) => (
        <div key={type}>
          <h2 className="text-xl">{type}</h2>
        </div>
      ))}
      <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
      <div className="align-center mt-2 flex max-w-xl flex-wrap justify-center gap-2">
        {types.map((type) => {
          return (
            <button
              key={type.name}
              value={type.name}
              onClick={() => handleTypeToggle(type.name)}
              className={
                "rounded-lg bg-zinc-800 px-4 py-2 text-zinc-300 transition-colors hover:bg-zinc-700"
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
