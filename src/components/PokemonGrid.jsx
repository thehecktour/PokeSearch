/* eslint-disable react/prop-types */
import PokemonPreview from "./PokemonPreview";
import { motion } from "motion/react";

export default function PokemonGrid({ pokemons }) {
  if (pokemons.length === 0) {
    return <h1 className="mt-20 text-center text-3xl">No results found</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mt-5 grid grid-cols-2 gap-6 rounded-2xl bg-zinc-900/70 p-4 md:grid-cols-3 xl:grid-cols-4">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name}>
            <PokemonPreview pokemon={pokemon} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
