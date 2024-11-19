import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const POKEMON_COUNT = 3;
const MAX_POKEMON_ID = 1025;

const fetchAbility = async (abilityName) => {
  const abilityPromise = await fetch(
    `https://pokeapi.co/api/v2/ability/${abilityName}`,
  );
  const abilityData = await abilityPromise.json();
  const ability =
    abilityData.effect_entries[1]?.short_effect ||
    abilityData.flavor_text_entries.find(
      (entry) => entry.language.name === "en",
    )?.flavor_text ||
    "No abilities";
  return ability;
};

const fetchPokemon = async (id) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemonData = await pokemon.json();

  const name = pokemonData.name;
  const spriteUrl = pokemonData.sprites.other["official-artwork"].front_default;
  const abilityName = pokemonData.abilities[0].ability.name;
  const ability = await fetchAbility(abilityName);

  return {
    name,
    spriteUrl,
    ability,
  };
};

const getRandomIds = (count) => {
  return Array.from(
    { length: count },
    () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1,
  );
};

export default function Random() {
  const [id, setId] = useState(() => getRandomIds(POKEMON_COUNT));
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setId(getRandomIds(POKEMON_COUNT));
  };

  const handlePokemonClick = (name) => {
    setSelectedPokemon(name);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
    navigate(`/pokemon/${selectedPokemon}`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    let ignore = false;

    const handleFetchPokemon = async () => {
      setIsLoading(true);

      try {
        const pokemonPromises = id.map((id) => fetchPokemon(id));
        const pokemonData = await Promise.all(pokemonPromises);

        if (!ignore) {
          setError(null);
          setPokemon(pokemonData);
          setIsLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
          setIsLoading(false);
        }
      }
    };

    handleFetchPokemon();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!pokemon || isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-5 flex flex-col items-center md:mt-24"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: POKEMON_COUNT }).map((_, index) => (
            <div
              key={index}
              className="flex h-64 w-56 flex-col items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/70 p-2 backdrop-blur-sm lg:h-96 lg:w-72"
            >
              <div className="flex items-center justify-center">
                <Loading />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">Failed to load pokemon card</h2>
        <h3 className="text-xl">Error description: {error.message}</h3>
      </div>
    );
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        pokemonName={selectedPokemon}
      />
      <div className="mt-5 flex flex-col items-center md:mt-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pokemon?.map((pokemon) => (
            <div
              key={pokemon.name}
              className="cursor-pointer"
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                spriteUrl={pokemon.spriteUrl}
                ability={pokemon.ability}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="mb-5 flex items-center gap-3 rounded-lg bg-zinc-800 px-4 py-3 text-xl text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}
