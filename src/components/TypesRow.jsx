/* eslint-disable react/prop-types */
import Type from "./Type";

export default function TypesRow({ types, selectedType, handleTypeToggle }) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-1">
      {types.map((type) => (
        <Type
          key={type.name}
          type={type}
          isSelected={type.name === selectedType}
          onToggle={handleTypeToggle}
        />
      ))}
    </div>
  );
}
