/* eslint-disable react/prop-types */
import Type from "./Type";
import pokemonTypes from "../assets/pokeApiTypes.json";

const allTypes = pokemonTypes.results;

export default function TypesRow({
  selectedTypes,
  handleTypeToggle,
  clearTypes,
}) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-1">
      <button
        onClick={clearTypes}
        className={
          "border-zinc-950 bg-zinc-300 rounded-full border px-3 py-1 text-zinc-900 transition-all hover:brightness-90 md:border-2"
        }
      >
        Clear types
      </button>
      {allTypes.map((type) => (
        <Type
          key={type.name}
          type={type}
          isSelected={selectedTypes.includes(type.name)}
          onToggle={handleTypeToggle}
        />
      ))}
    </div>
  );
}
