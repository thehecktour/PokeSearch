/* eslint-disable react/prop-types */
export default function PagesNav({
  handlePrevPage,
  handleNextPage,
  currentPage,
  totalPages,
}) {
  return (
    <div className="relative mx-2 mt-4 flex items-center justify-between">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="rounded-lg bg-zinc-700/80 px-4 py-3 text-lg text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="absolute left-1/2 -translate-x-1/2 text-lg text-zinc-300">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-zinc-700/80 px-4 py-3 text-lg text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
