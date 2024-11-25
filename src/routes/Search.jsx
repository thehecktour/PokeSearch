import { useEffect, useState } from "react";
import pokemonList from "../assets/pokeApiPokemons.json";
import pokemonTypes from "../assets/pokeApiTypes.json";
import SearchBar from "../components/SearchBar";
import PokemonGrid from "../components/PokemonGrid";
import LoadingGrid from "../components/LoadingGrid";
import TypesRow from "../components/TypesRow";
import PageTransition from "../components/PageTransition";
import ErrorMessage from "../components/ErrorMessage";



export default function Search() {
  const allTypes = pokemonTypes.results;
  const allPokemons = pokemonList.results;
  
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore searchTerm and types
  useEffect(()=>{
    const searchTerm = localStorage.getItem("searchTerm")
    const types = JSON.parse(localStorage.getItem("types"))
    if(searchTerm){
      setSearchTerm(searchTerm)
    }
    if(types){
      setTypes(types)
    }
  },[])

  // Set searchTerm
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    localStorage.setItem("searchTerm", searchTerm);
  };

  // Set types
  const handleTypeToggle = ( type) => {
    if (types.includes(type)) {
      const newTypes = types.filter(t=>t!==type)
      setTypes(newTypes);
      localStorage.setItem("types",  JSON.stringify(newTypes));
    } else {
      setTypes([...types, type]);
      localStorage.setItem("types",  JSON.stringify([...types, type]));
    }
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
          allTypes={allTypes}
          selectedTypes={types}
          handleTypeToggle={handleTypeToggle}
        />
        {console.log(types)}
        <SearchBar handleChange={handleSearchChange} searchTerm={searchTerm} />
        {/* <div className="mt-5 rounded-2xl border border-zinc-700 bg-zinc-800/40 p-4 backdrop-blur-sm">
          <PokemonGrid 
            pokemons={pokemonDetails}
          />
          {isLoading && <LoadingGrid itemsPerPage={4} />}
        </div> */}
      </div>
    </PageTransition>
  );
}
