import { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import NavButtons from "../components/NavButtons";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Add filter states
  const [filters, setFilters] = useState({
    type: "",
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch types
        const typeResponse = await fetch("https://pokeapi.co/api/v2/type");
        const typeData = await typeResponse.json();
        setTypes(typeData.results);

        // First, get total count of Pokemon
        const countResponse = await fetch("https://pokeapi.co/api/v2/pokemon");
        const countData = await countResponse.json();
        const totalCount = countData.count;

        // Fetch all Pokemon
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${totalCount}`,
        );
        const data = await response.json();

        // Fetch detailed data for each Pokemon in chunks to avoid rate limiting
        const fetchPokemonInChunks = async (pokemonList) => {
          const chunkSize = 20; // Adjust this number based on API limits
          const allPokemon = [];

          for (let i = 0; i < pokemonList.length; i += chunkSize) {
            const chunk = pokemonList.slice(i, i + chunkSize);
            const chunkPromises = chunk.map(async (pokemon) => {
              try {
                const res = await fetch(pokemon.url);
                return res.json();
              } catch (error) {
                console.error(`Error fetching ${pokemon.name}:`, error);
                return null;
              }
            });

            const chunkResults = await Promise.all(chunkPromises);
            allPokemon.push(
              ...chunkResults.filter((pokemon) => pokemon !== null),
            );

            // Update progress
            const progress = Math.round(
              ((i + chunkSize) / pokemonList.length) * 100,
            );
            setLoadingProgress(Math.min(progress, 100));

            // Optional: Add a small delay between chunks to avoid rate limiting
            if (i + chunkSize < pokemonList.length) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }

          return allPokemon;
        };

        const detailedPokemon = await fetchPokemonInChunks(data.results);
        setPokemonList(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filter Pokemon
  const filteredResults = pokemonList.filter((pokemon) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const typeMatch =
      !filters.type || pokemon.types.some((t) => t.type.name === filters.type);
    const weightMatch =
      (!filters.minWeight || pokemon.weight >= filters.minWeight) &&
      (!filters.maxWeight || pokemon.weight <= filters.maxWeight);
    const heightMatch =
      (!filters.minHeight || pokemon.height >= filters.minHeight) &&
      (!filters.maxHeight || pokemon.height <= filters.maxHeight);

    return nameMatch && typeMatch && weightMatch && heightMatch;
  });

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    localStorage.setItem("search", search);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
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
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <SearchBar handleChange={handleChange} searchTerm={searchTerm} />

        {/* Filters Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <select
            name="type"
            onChange={handleFilterChange}
            value={filters.type}
            className="w-full rounded-lg border bg-white p-2 shadow-sm"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              name="minWeight"
              placeholder="Min Weight"
              onChange={handleFilterChange}
              value={filters.minWeight}
              className="w-1/2 rounded-lg border p-2 shadow-sm"
            />
            <input
              type="number"
              name="maxWeight"
              placeholder="Max Weight"
              onChange={handleFilterChange}
              value={filters.maxWeight}
              className="w-1/2 rounded-lg border p-2 shadow-sm"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              name="minHeight"
              placeholder="Min Height"
              onChange={handleFilterChange}
              value={filters.minHeight}
              className="w-1/2 rounded-lg border p-2 shadow-sm"
            />
            <input
              type="number"
              name="maxHeight"
              placeholder="Max Height"
              onChange={handleFilterChange}
              value={filters.maxHeight}
              className="w-1/2 rounded-lg border p-2 shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 h-2.5 w-full max-w-md rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Loading Pokémon... {loadingProgress}%
            </p>
          </div>
        ) : (
          searchTerm &&
          totalPages > 0 && (
            <div className="space-y-4">
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
          )
        )}
      </div>
    </div>
  );
}
