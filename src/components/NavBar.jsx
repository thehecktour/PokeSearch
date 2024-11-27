import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="mx-auto mt-4 w-11/12 max-w-2xl rounded-full border-2 border-zinc-700 bg-zinc-800/40 backdrop-blur-sm sm:min-w-fit">
      <ul className="flex items-center justify-evenly gap-2 py-3">
        <NavBarLink link="/">
          📝<span className="hidden sm:inline">About</span>
        </NavBarLink>
        <div className="block h-8 w-px bg-zinc-700" />
        <NavBarLink link="/search">
          🔍<span className="hidden sm:inline">Search</span>
        </NavBarLink>
        <div className="block h-8 w-px bg-zinc-700" />
        <NavBarLink link="/compare">
          📊<span className="hidden sm:inline">Compare</span>
        </NavBarLink>
        <div className="block h-8 w-px bg-zinc-700" />
        <NavBarLink link="/random">
          🎲<span className="hidden sm:inline">Random</span>
        </NavBarLink>
      </ul>
    </nav>
  );
}

// eslint-disable-next-line react/prop-types
function NavBarLink({ children, link }) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `rounded-full px-4 py-2 text-lg font-medium transition-all duration-200 sm:px-4 ${
            isActive
              ? "bg-zinc-700 text-zinc-100"
              : "text-zinc-300 hover:bg-zinc-700/50 hover:text-zinc-200"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
