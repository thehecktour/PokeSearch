import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <div className="mt-4 rounded-xl border-2 border-zinc-700 bg-zinc-900 transition-colors hover:border-zinc-600">
      <ul className="justify-cen ter my-3 flex px-10 text-zinc-500">
        <NavBarLink link="/home">Home</NavBarLink>
        <NavBarLink link="/Search">Search</NavBarLink>
        <NavBarLink link="/Random">Random</NavBarLink>
      </ul>
    </div>
  );
}
