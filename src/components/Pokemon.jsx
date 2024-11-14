export default function Pokemon({ name, url, ability }) {
  return (
    <div className="w-48 flex flex-col items-center justify-center border-2 border-zinc-500 rounded-lg p-5 m-5">
      <h1 className="text-lg">{name}</h1>
      <img src={url} alt="Pokemon" />
      <div className="text-zinc-400">
        <p>{ability}</p>
      </div>
    </div>
  );
}
