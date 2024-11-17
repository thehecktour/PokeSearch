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
  const spriteUrl = pokemonData.sprites.front_default;
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
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchPokemon();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (!pokemon)
    return (
      <div className="mt-56 flex flex-col items-center justify-center">
        <Loading />
      </div>
    );

  if (error) {
    return (
      <div className="mt-56 flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl text-red-200">Failed to fetch pokemon data </h2>
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
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-24 flex flex-col items-center"
      >
        <div className="flex gap-5">
          {pokemon?.map((pokemon) => (
            <motion.div
              key={pokemon.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="cursor-pointer"
              onClick={() => handlePokemonClick(pokemon.name)}
            >
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                spriteUrl={pokemon.spriteUrl}
                ability={pokemon.ability}
              />
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button
            className="flex items-center gap-3 rounded-lg bg-zinc-800 px-4 py-3 text-xl text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600"
            onClick={handleRefresh}
          >
            Refresh
            {isLoading && <Loading />}
          </button>
        </div>
      </motion.div>
    </>
  );
}
