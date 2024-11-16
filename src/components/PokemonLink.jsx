/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PokemonLink({ name, i, currentPage }) {
  return (
    <Link
      to={`/pokemon/${name}`}
      className={"text-zinc-300 transition-colors hover:text-zinc-500"}
    >
      <span>{i + 1 + (currentPage - 1) * 10}&nbsp;</span>
      {name.charAt(0).toUpperCase() + name.slice(1)}
    </Link>
  );
}
