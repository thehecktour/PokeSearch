/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PokemonLink({ name, i, currentPage }) {
  return (
    <Link
      to={`/pokemon/${name}`}
      className={
        "w-96 rounded-xl bg-zinc-800 p-3 text-xl text-zinc-300 transition-colors hover:opacity-80 active:bg-zinc-700"
      }
    >
      <span>{i + 1 + (currentPage - 1) * 10}.&nbsp;</span>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Link>
  );
}
