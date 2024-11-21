/* eslint-disable react/prop-types */
import { useState } from "react";
export default function PokemonCard({ name, spriteUrl, ability }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex min-h-64 w-56 flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-800/60 p-2 backdrop-blur-sm transition-all hover:bg-zinc-700/70 lg:min-h-96 lg:w-72">
      <h1 className="mx-auto mt-2 text-center text-xl capitalize lg:text-3xl">
        {name}
      </h1>
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="h-28 w-28 animate-pulse rounded-full bg-zinc-700 lg:h-40 lg:w-40"></div>
        </div>
      )}

      <img
        src={spriteUrl}
        alt={name}
        onLoad={() => setIsLoading(false)}
        className={`mx-auto mb-2 w-28 lg:w-40 ${isLoading && "hidden"}`}
      />

      <p className="mb-2 text-center text-sm text-zinc-400 lg:text-base">
        {ability}
      </p>
    </div>
  );
}
