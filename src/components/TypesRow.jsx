/* eslint-disable react/prop-types */
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
          "rounded-full border border-zinc-950 bg-zinc-300 px-3 py-1 text-zinc-900 transition-all hover:brightness-90 md:border-2"
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

function Type({ type, isSelected, onToggle }) {
  return (
    <button
      value={type.name}
      onClick={() => onToggle(type.name)}
      className={`rounded-full border md:border-2 ${
        type.color
      } px-3 py-1 text-zinc-200 transition-all hover:brightness-110 ${
        isSelected
          ? "brightness-120 scale-105 border-white shadow-lg"
          : "border-zinc-950"
      }`}
    >
      {type.emoji} {type.name}
    </button>
  );
}
