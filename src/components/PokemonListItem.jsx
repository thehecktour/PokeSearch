/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function PokemonListItem({ name, i, currentPage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="w-full"
    >
      <Link
        to={`/pokemon/${name}`}
        className="block w-full rounded-xl bg-zinc-800 p-3 text-xl capitalize text-zinc-300 transition-colors hover:opacity-80 active:bg-zinc-700"
      >
        <span>{i + 1 + (currentPage - 1) * 10}. </span>
        {name}
      </Link>
    </motion.div>
  );
}
