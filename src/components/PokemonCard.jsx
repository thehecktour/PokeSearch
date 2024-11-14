export default function PokemonCard({ name, url, ability }) {
  return (
    <div className="w-64 h-72 flex flex-col items-center justify-center border-2 border-zinc-500 rounded-xl p-2 m-2 bg-zinc-800 hover:bg-zinc-700 transition-colors shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <h1 className="text-3xl">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <img src={url} alt="name" />
      <p className="mx-5 mt-5 text-zinc-400">{ability}</p>
    </div>
  );
}
