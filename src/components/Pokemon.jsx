export default function Pokemon({ name, url, ability }) {
  return (
    <div className="w-64 h-72 flex flex-col items-center justify-center border-2 border-zinc-500 rounded-lg p-2 m-2">
      <h1 className="text-lg">{name}</h1>
      <img src={url} alt="name" />
      <p className="text-zinc-400">{ability}</p>
    </div>
  );
}
