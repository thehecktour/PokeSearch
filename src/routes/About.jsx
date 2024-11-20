export default function About() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <div className="relative mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-800/50 p-8 text-center backdrop-blur-sm md:p-12">
        <h1 className="mb-6 text-3xl text-zinc-100 md:text-4xl">
          Welcome to PokéSearch
        </h1>
        <p className="mb-8 text-lg text-zinc-300 md:text-xl">
          Explore the world of Pokémon through interactive features:
        </p>
        <div className="grid gap-6 text-left text-zinc-300 md:grid-cols-2">
          <div className="rounded-xl bg-zinc-800 p-6">
            <h2 className="mb-2 text-xl text-zinc-100">🔍 Search</h2>
            <p>Find your favorite Pokémon using search feature.</p>
          </div>
          <div className="rounded-xl bg-zinc-800 p-6">
            <h2 className="mb-2 text-xl text-zinc-100">🎲 Random</h2>
            <p>Discover new Pokémon with randomizer.</p>
          </div>
          <div className="rounded-xl bg-zinc-800 p-6">
            <h2 className="mb-2 text-xl text-zinc-100">🤖 Ai generation</h2>
            <p>Still in progress...</p>
          </div>
          <div className="rounded-xl bg-zinc-800 p-6">
            <h2 className="mb-2 text-xl text-zinc-100">📊 Stats Comparison</h2>
            <p>Still in progress...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
