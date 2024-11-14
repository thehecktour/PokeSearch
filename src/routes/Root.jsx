import { Outlet, Link } from "react-router-dom";

function Root() {
  return (
    <div className=" flex flex-col items-center  h-screen bg-zinc-900 text-white font-serif">
      <ul className="mt-10">
        <li className="text-2xl inline mx-5 border-b-2 border-white">
          <Link to={`/home`}>Home</Link>
        </li>
        <li className="text-2xl inline mx-5">
          <Link to={`/search`}>Search</Link>
        </li>
        <li className="text-2xl inline mx-5">
          <Link to={`/random`}>Random</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Root;
