import { NavLink } from "react-router-dom";

export default function NavBarLink({ children, link }) {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) => {
          return `text-2xl  inline mx-5 hover:text-zinc-400 hover:border-zinc-400 transition-colors ${
            isActive && "border-b-2 text-zinc-200 border-zinc-200"
          }  `;
        }}
      >
        {children}
      </NavLink>
    </li>
  );
}
