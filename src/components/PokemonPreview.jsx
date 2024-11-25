/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PokemonPreview({ pokemon }) {
  const { name, id, img } = pokemon;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-60 rounded-2xl bg-zinc-800 p-4 transition-all hover:bg-zinc-700/70">
      <Link to={`/pokemon/${name}`} className="block">
        <div className="absolute right-4 top-4 z-10 rounded-full bg-zinc-700/80 px-3 py-1 text-sm text-zinc-300">
          #{id}
        </div>

        <div className="mb-4 flex justify-center">
          {isLoading && (
            <div className="absolute mt-5 h-36 w-36 animate-pulse rounded-full bg-zinc-700"></div>
          )}
          <img
            src={img}
            alt={name}
            onLoad={() => setIsLoading(false)}
            className={`h-40 w-40 ${isLoading && "hidden"}`}
          />
        </div>

        <h2 className="absolute bottom-4 left-0 right-0 text-center align-bottom text-xl capitalize text-zinc-200">
          {name.replace("-", " ")}
        </h2>
      </Link>
    </div>
  );
}
