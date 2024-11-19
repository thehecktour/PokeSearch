/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function PokemonPreview({ pokemon }) {
  const { name, id, url } = pokemon;

  return (
    <div className="relative rounded-2xl bg-zinc-800 p-4 transition-all">
      <Link to={`/pokemon/${name}`} className="block">
        <div className="absolute right-4 top-4 z-10 rounded-full bg-zinc-700/80 px-3 py-1 text-sm text-zinc-300">
          #{id.toString().padStart(3, "0")}
        </div>

        <div className="mb-4 flex justify-center">
          <img src={url} alt={name} className="h-40 w-40" />
        </div>

        <h2 className="text-center text-xl capitalize text-zinc-200 transition-colors group-hover:text-white">
          {name.replace("-", " ")}
        </h2>
      </Link>
    </div>
  );
}
