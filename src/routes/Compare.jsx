import { useState, useMemo } from "react";
import PageTransition from "../components/PageTransition";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import pokemons from "../assets/pokeApiPokemons.json";

const formatStatName = (statName) => {
  const replacements = {
    "special-attack": "⚡ Sp. Atk",
    "special-defense": "🔰 Sp. Def",
    "attack": "⚔️ Atk",
    "defense": "🛡️ Def",
    "speed": "💨 Spd",
    "hp": "❤️ HP"
  };
  return replacements[statName] || statName;
};

const fetchPokemonStats = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Pokemon "${name}" not found`);
  }
  const data = await response.json();

  return {
    name: data.name,
    spriteUrl: data.sprites.other["official-artwork"].front_default,
    stats: data.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
};

export default function Compare() {
  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [pokemon1Input, setPokemon1Input] = useState("");
  const [pokemon2Input, setPokemon2Input] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const [selectedIndex1, setSelectedIndex1] = useState(-1);
  const [selectedIndex2, setSelectedIndex2] = useState(-1);

  // Filter pokemon suggestions based on input
  const suggestions1 = useMemo(() => {
    return pokemon1Input
      ? pokemons.results
          .filter(p => p.name.includes(pokemon1Input.toLowerCase()))
          .slice(0, 5)
      : [];
  }, [pokemon1Input]);

  const suggestions2 = useMemo(() => {
    return pokemon2Input
      ? pokemons.results
          .filter(p => p.name.includes(pokemon2Input.toLowerCase()))
          .slice(0, 5)
      : [];
  }, [pokemon2Input]);

  const handleKeyDown = (e, suggestions, selectedIndex, setSelectedIndex, setPokemonInput, setShowSuggestions) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          setPokemonInput(suggestions[selectedIndex].name);
          setShowSuggestions(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (value, setPokemonInput, setShowSuggestions, setSelectedIndex) => {
    setPokemonInput(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (pokemonName, setPokemonInput, setShowSuggestions, setSelectedIndex) => {
    setPokemonInput(pokemonName);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleCompare = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const [pokemon1Data, pokemon2Data] = await Promise.all([
        fetchPokemonStats(pokemon1Input.toLowerCase()),
        fetchPokemonStats(pokemon2Input.toLowerCase()),
      ]);
      setPokemon1(pokemon1Data);
      setPokemon2(pokemon2Data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatBars = (stat1, stat2) => {
    const width1 = (stat1.value / 255) * 100;
    const width2 = (stat2.value / 255) * 100;
    const isHigher1 = stat1.value > stat2.value;
    const isHigher2 = stat2.value > stat1.value;

    return (
      <div key={stat1.name} className="mb-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-20">
            <span className="text-sm capitalize text-zinc-300">
              {formatStatName(stat1.name)}
            </span>
          </div>
          <div className="flex-grow rounded-full bg-zinc-700">
            <div
              className={`h-2 rounded-full transition-all ${
                isHigher1 ? "bg-emerald-500" : "bg-blue-500"
              }`}
              style={{ width: `${width1}%` }}
            />
          </div>
          <span className={`w-8 text-right text-sm ${
            isHigher1 ? "text-emerald-400" : "text-zinc-300"
          }`}>
            {stat1.value}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-8 text-left text-sm ${
            isHigher2 ? "text-emerald-400" : "text-zinc-300"
          }`}>
            {stat2.value}
          </span>
          <div className="flex-grow rounded-full bg-zinc-700">
            <div
              className={`h-2 rounded-full transition-all ${
                isHigher2 ? "bg-emerald-500" : "bg-red-500"
              }`}
              style={{ width: `${width2}%` }}
            />
          </div>
          <div className="w-20">
            <span className="text-sm capitalize text-zinc-300">
              {formatStatName(stat2.name)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const calculateTotal = (stats) => {
    return stats.reduce((total, stat) => total + stat.value, 0);
  };

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl p-4">
        <h1 className="mb-8 text-center text-3xl text-zinc-200">
          Compare Pokemon Stats
        </h1>

        <form onSubmit={handleCompare} className="mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative">
              <input
                type="text"
                value={pokemon1Input}
                onChange={(e) => handleInputChange(
                  e.target.value,
                  setPokemon1Input,
                  setShowSuggestions1,
                  setSelectedIndex1
                )}
                onKeyDown={(e) => handleKeyDown(
                  e,
                  suggestions1,
                  selectedIndex1,
                  setSelectedIndex1,
                  setPokemon1Input,
                  setShowSuggestions1
                )}
                onBlur={() => setTimeout(() => setShowSuggestions1(false), 200)}
                onFocus={() => setShowSuggestions1(true)}
                placeholder="Enter first Pokemon name"
                className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-zinc-200 placeholder-zinc-400"
                required
              />
              {showSuggestions1 && suggestions1.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-zinc-800 p-2">
                  {suggestions1.map((pokemon, index) => (
                    <div
                      key={pokemon.name}
                      className={`cursor-pointer rounded-lg p-2 capitalize hover:bg-zinc-700 ${
                        index === selectedIndex1 ? 'bg-zinc-700' : ''
                      }`}
                      onClick={() => handleSuggestionClick(
                        pokemon.name,
                        setPokemon1Input,
                        setShowSuggestions1,
                        setSelectedIndex1
                      )}
                    >
                      {pokemon.name.replace(/-/g, " ")}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                value={pokemon2Input}
                onChange={(e) => handleInputChange(
                  e.target.value,
                  setPokemon2Input,
                  setShowSuggestions2,
                  setSelectedIndex2
                )}
                onKeyDown={(e) => handleKeyDown(
                  e,
                  suggestions2,
                  selectedIndex2,
                  setSelectedIndex2,
                  setPokemon2Input,
                  setShowSuggestions2
                )}
                onBlur={() => setTimeout(() => setShowSuggestions2(false), 200)}
                onFocus={() => setShowSuggestions2(true)}
                placeholder="Enter second Pokemon name"
                className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-zinc-200 placeholder-zinc-400"
                required
              />
              {showSuggestions2 && suggestions2.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg bg-zinc-800 p-2">
                  {suggestions2.map((pokemon, index) => (
                    <div
                      key={pokemon.name}
                      className={`cursor-pointer rounded-lg p-2 capitalize hover:bg-zinc-700 ${
                        index === selectedIndex2 ? 'bg-zinc-700' : ''
                      }`}
                      onClick={() => handleSuggestionClick(
                        pokemon.name,
                        setPokemon2Input,
                        setShowSuggestions2,
                        setSelectedIndex2
                      )}
                    >
                      {pokemon.name.replace(/-/g, " ")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-zinc-700 px-4 py-2 text-zinc-200 hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Comparing..." : "Compare"}
          </button>
        </form>

        {isLoading && (
          <div className="flex justify-center">
            <Loading />
          </div>
        )}

        {error && (
          <ErrorMessage
            title="Failed to load Pokemon stats"
            message={error}
          />
        )}

        {pokemon1 && pokemon2 && !isLoading && (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 backdrop-blur-sm">
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div className="text-center">
                <img
                  src={pokemon1.spriteUrl}
                  alt={pokemon1.name}
                  className="mx-auto mb-4 h-40 w-40"
                />
                <h2 className="text-xl capitalize text-zinc-200">
                  {pokemon1.name.replace(/-/g, " ")}
                </h2>
              </div>
              <div className="text-center">
                <img
                  src={pokemon2.spriteUrl}
                  alt={pokemon2.name}
                  className="mx-auto mb-4 h-40 w-40"
                />
                <h2 className="text-xl capitalize text-zinc-200">
                  {pokemon2.name.replace(/-/g, " ")}
                </h2>
              </div>
            </div>

            <div className="stats-comparison">
              {pokemon1.stats.map((stat1, index) =>
                renderStatBars(stat1, pokemon2.stats[index])
              )}
              
              <div className="mt-6 border-t border-zinc-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <span className="text-lg font-semibold text-zinc-200">
                      Total: {calculateTotal(pokemon1.stats)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-zinc-200">
                      Total: {calculateTotal(pokemon2.stats)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
} 