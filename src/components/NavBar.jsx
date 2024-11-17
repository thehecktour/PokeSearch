import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <nav className="mx-auto mt-4 max-w-2xl px-4">
      <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm">
        <ul className="flex items-center justify-center gap-2 p-4">
          <NavBarLink link="/home">🏠 Home</NavBarLink>
          <NavBarLink link="/Search">🔍 Search</NavBarLink>
          <NavBarLink link="/Random">🎲 Random</NavBarLink>
        </ul>
      </div>
    </nav>
  );
}
