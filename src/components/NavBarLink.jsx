import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NavBarLink({ children, link }) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => {
          return `mx-5 inline text-2xl transition-colors hover:border-zinc-400 hover:text-zinc-400 ${
            isActive && "border-b-2 border-zinc-200 text-zinc-200"
          } `;
        }}
      >
        {children}
      </NavLink>
    </li>
  );
}
