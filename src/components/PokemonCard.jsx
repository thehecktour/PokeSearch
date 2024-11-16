/* eslint-disable react/prop-types */
export default function PokemonCard({ name, spriteUrl, ability }) {
  return (
    <div className="flex h-72 w-64 flex-col items-center justify-center rounded-xl border-2 border-zinc-500 bg-zinc-800 p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-colors hover:bg-zinc-700">
      <h1 className="text-3xl">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <img src={spriteUrl} alt={name} />
      <p className="mx-2 mt-5 text-zinc-400">{ability}</p>
    </div>
  );
}
