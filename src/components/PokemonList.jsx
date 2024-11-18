/* eslint-disable react/prop-types */
import PokemonListItem from "./PokemonListItem";
import { motion } from "motion/react";

export default function PokemonList({ results, currentPage }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid grid-cols-2 gap-4 py-4"
    >
      {results.map((pokemon, i) => {
        return (
          <motion.li
            key={pokemon.name}
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: i * 0.05,
            }}
          >
            <PokemonListItem
              name={pokemon.name}
              i={i}
              currentPage={currentPage}
            />
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
