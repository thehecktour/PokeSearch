/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "./Loading";

export default function PokemonCard({ name, spriteUrl, ability }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex min-h-64 w-56 flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-800/70 p-2 backdrop-blur-sm transition-all hover:bg-zinc-700/70 lg:min-h-96 lg:w-72">
      <h1 className="mx-auto mt-2 text-center text-3xl capitalize">{name}</h1>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}
      <img
        src={spriteUrl}
        alt={name}
        onLoad={() => setIsLoading(false)}
        className={`mx-auto mb-2 w-20 lg:w-32 ${isLoading && "hidden"}`}
      />

      <p className="mb-2 text-center text-sm text-zinc-400 lg:text-base">
        {ability}
      </p>
    </div>
  );
}
