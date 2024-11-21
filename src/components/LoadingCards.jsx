/* eslint-disable react/prop-types */
import Loading from "./Loading";

export default function LoadingCards({ count = 3 }) {
  return (
    <div className="mt-5 flex flex-col items-center md:mt-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex h-64 w-56 flex-col items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800/70 p-2 backdrop-blur-sm lg:h-96 lg:w-72"
          >
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
