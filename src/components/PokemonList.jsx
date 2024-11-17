/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import PokemonLink from "./PokemonLink";

export default function PokemonList({ results, currentPage }) {
  return (
    <ul className="mt-5 flex max-w-xl flex-row flex-wrap items-center justify-center gap-2 p-2">
      {results.map((pokemon, i) => {
        return (
          <motion.li
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            key={pokemon.name}
            className="flex flex-row"
          >
            <PokemonLink name={pokemon.name} i={i} currentPage={currentPage} />
          </motion.li>
        );
      })}
    </ul>
  );
}
