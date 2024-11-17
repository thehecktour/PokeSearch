/* eslint-disable react/prop-types */
export default function Filters({ filters, handleFilterChange, types }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <select 
        name="type" 
        onChange={handleFilterChange} 
        value={filters.type}
        className="w-full p-2 border rounded-lg bg-zinc-700 shadow-sm"
      >
        <option value="">All Types</option>
        {types.map(type => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          name="minWeight"
          placeholder="Min Weight"
          onChange={handleFilterChange}
          value={filters.minWeight}
          className="w-1/2 p-2 border rounded-lg shadow-sm bg-zinc-700"
        />
        <input
          type="number"
          name="maxWeight"
          placeholder="Max Weight"
          onChange={handleFilterChange}
          value={filters.maxWeight}
          className="w-1/2 p-2 border rounded-lg shadow-sm bg-zinc-700"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          name="minHeight"
          placeholder="Min Height"
          onChange={handleFilterChange}
          value={filters.minHeight}
          className="w-1/2 p-2 border rounded-lg shadow-sm bg-zinc-700"
        />
        <input
          type="number"
          name="maxHeight"
          placeholder="Max Height"
          onChange={handleFilterChange}
          value={filters.maxHeight}
          className="w-1/2 p-2 border rounded-lg shadow-sm bg-zinc-700"
        />
      </div>
    </div>
  );
} 