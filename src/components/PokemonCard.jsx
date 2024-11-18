/* eslint-disable react/prop-types */
export default function PokemonCard({ name, spriteUrl, ability }) {
  return (
    <div className="flex h-96 w-72 flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-800/70 p-2 backdrop-blur-sm transition-colors hover:bg-zinc-700/70">
      <h1 className="mx-auto my-2 text-center text-3xl capitalize">{name}</h1>
      <div className="flex flex-grow flex-col items-center justify-center">
        <img src={spriteUrl} alt={name} className="mx-auto w-32 my-2" />
        <p className="mx-2 mt-2 text-center text-zinc-400">{ability}</p>
      </div>
    </div>
  );
}
