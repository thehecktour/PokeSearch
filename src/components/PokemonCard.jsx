/* eslint-disable react/prop-types */
export default function PokemonCard({ name, spriteUrl, ability }) {
  return (
    <div className="flex h-80 w-64 flex-col justify-between rounded-xl border-2 border-zinc-500 bg-zinc-800 p-2 transition-colors hover:bg-zinc-700">
      <h1 className="mx-auto my-2 text-center text-3xl capitalize">
        {name}
      </h1>
      <div className="flex flex-grow flex-col items-center justify-center">
        <img src={spriteUrl} alt={name} className="mx-auto my-2" />
        <p className="mx-2 mt-2 text-center text-zinc-400">{ability}</p>
      </div>
    </div>
  );
}
