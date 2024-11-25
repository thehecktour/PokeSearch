/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "./Loading";
import PageTransition from "./PageTransition";

export default function PokemonDetails({ pokemon }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-800/50 p-6 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl capitalize text-zinc-200">{pokemon.name}</h1>
          <div className="flex w-full items-center justify-center gap-4 sm:gap-12">
            <div className="text-center">
              <p className="text-zinc-400">Height</p>
              <p className="text-xl text-zinc-200">{pokemon.height}m</p>
            </div>
            {isLoading && (
              <div className="flex h-40 w-40 items-center justify-center">
                <Loading />
              </div>
            )}
            <img
              src={pokemon.spriteUrl}
              alt={pokemon.name}
              onLoad={() => setIsLoading(false)}
              className={`h-40 w-40 rounded-full bg-zinc-700/70 object-contain p-4 ${isLoading && "hidden"}`}
            />

            <div className="text-center">
              <p className="text-zinc-400">Weight</p>
              <p className="text-xl text-zinc-200">{pokemon.weight}kg</p>
            </div>
          </div>

          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-zinc-700 px-3 py-1 text-base capitalize text-zinc-100"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="w-full">
            <h2 className="mb-2 text-xl font-semibold text-zinc-200">
              Abilities
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {pokemon.abilities.map((ability) => (
                <div
                  key={ability.name}
                  className="flex h-full flex-col rounded-lg bg-zinc-700/50 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium capitalize text-zinc-200">
                      {ability.name.replace("-", " ")}
                    </h3>
                    {ability.isHidden && (
                      <span className="rounded bg-zinc-700 px-2 py-1 text-sm text-zinc-300/85">
                        Hidden Ability
                      </span>
                    )}
                  </div>
                  <p className="flex-grow text-sm text-zinc-300">
                    {ability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full">
            <h2 className="mb-2 text-xl font-semibold text-zinc-200">
              Base Stats
            </h2>
            <div className="grid grid-cols-1 gap-3 rounded-lg bg-zinc-700/50 p-4 sm:grid-cols-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.name} className="flex items-center gap-2">
                  <div className="w-20">
                    <span className="text-sm capitalize text-zinc-300">
                      {stat.name
                        .replace("special-attack", "⚡ Sp. Atk")
                        .replace("special-defense", "🔰 Sp. Def")
                        .replace("attack", "⚔️ Atk")
                        .replace("defense", "🛡️ Def")
                        .replace("speed", "💨 Spd")
                        .replace("hp", "❤️ HP")}
                    </span>
                  </div>
                  <div className="flex-grow rounded-full bg-zinc-700">
                    <div
                      className="h-2 rounded-full bg-zinc-200"
                      style={{
                        width: `${(stat.value / 255) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-right text-sm text-zinc-300">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full">
            <h2 className="mb-2 text-xl font-semibold text-zinc-200">Moves</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {pokemon.moves.map((move) => (
                <span
                  key={move}
                  className="flex items-center justify-center rounded-lg bg-zinc-700/50 py-2 capitalize text-zinc-200"
                >
                  {move}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
