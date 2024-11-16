/* eslint-disable react/prop-types */
export default function NavButtons({handlePrevPage, handleNextPage, currentPage, totalPages}) {
  return (<div className="mt-4 flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mr-5 rounded-lg bg-zinc-800 px-4 py-3 text-xl text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-zinc-800 px-4 py-3 text-xl text-zinc-300 transition-colors hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>);
}