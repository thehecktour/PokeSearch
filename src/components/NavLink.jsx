import { Link } from "react-router-dom";

export default function Navlink({
  id,
  children,
  link,
  updatePage,
  activePage,
}) {
  const isActive = activePage === id;
  return (
    <li
      className={`text-2xl inline mx-5 ${
        isActive && "border-b-2 text-zinc-200 border-zinc-200"
      } `}
    >
      <Link to={link} onClick={() => updatePage(id)}>
        {children}
      </Link>
    </li>
  );
}
