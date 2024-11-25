/* eslint-disable react/prop-types */
import Type from "./Type";
import pokemonTypes from "../assets/pokeApiTypes.json";
const allTypes = pokemonTypes.results;

export default function TypesRow({ selectedTypes, handleTypeToggle }) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-1">
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
