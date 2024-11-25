/* eslint-disable react/prop-types */
import Loading from "./Loading";

export default function LoadingGrid({ items }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-6 rounded-2xl bg-zinc-900/70 p-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: items }).map((_, index) => (
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
