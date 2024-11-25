/* eslint-disable react/prop-types */
export default function Type({ type, isSelected, onToggle }) {
  return (
    <button
      value={type.name}
      onClick={() => onToggle( type.name)}
      className={`rounded-full border ${
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
