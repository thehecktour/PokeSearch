import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NavBarLink({ children, link }) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          `rounded-xl px-4 py-2 text-lg font-medium transition-all duration-200 ${
            isActive
              ? "bg-zinc-700 text-zinc-100"
              : "text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}
