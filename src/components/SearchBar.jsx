/* eslint-disable react/prop-types */
export default function SearchBar({ handleChange, searchTerm }) {
  return (
    <div className="flex flex-row items-center justify-center ">
      <div className="relative w-full ">
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Start typing..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-700 p-2 pl-4 text-xl outline-none focus:border-zinc-200"
        />
        <svg
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}
