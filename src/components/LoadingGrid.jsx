import Loading from "./Loading";

export default function LoadingGrid({ itemsPerPage }) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <div
          key={index}
          className="flex h-60 items-center justify-center rounded-2xl bg-zinc-800 p-4 backdrop-blur-sm"
        >
          <Loading />
        </div>
      ))}
    </div>
  );
}
