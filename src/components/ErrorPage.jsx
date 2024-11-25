import { useRouteError } from "react-router-dom";
import PageTransition from "./PageTransition";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <PageTransition>
      <div className="rounded-2xl mt-20 border border-zinc-700 bg-zinc-800/40 p-8 text-center backdrop-blur-sm">
        <p className="mb-6 text-2xl text-zinc-300">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-lg text-zinc-400">
          {error?.statusText || error?.message || "Page not found"}
        </p>
      </div>
    </PageTransition>
  );
}
