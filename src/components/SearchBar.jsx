/* eslint-disable react/prop-types */
export default function SearchBar({ handleChange, searchTerm }) {
  return (
    <div className="mt-24 flex flex-row items-center justify-center">
        <input
          onChange={handleChange}
          value={searchTerm}
          type="text"
          placeholder="Start typing..."
          className="w-96 rounded-md border border-zinc-700 bg-zinc-700 p-2 pl-4 text-xl outline-none focus:border-zinc-200"
        />
        <form className="ml-2 w-auto">
          <select
            id="tag"
            className="block w-auto rounded-lg border border-zinc-700 bg-zinc-700 p-3 text-white placeholder-gray-400 focus:border-zinc-200"
          >
            <option value="name">--Search by--</option>
            <option selected value="name">
              Name
            </option>
            <option value="ability">Ability</option>
          </select>
        </form>
    </div>
  );
}
