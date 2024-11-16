import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <div className="w-full border-b-2 border-zinc-800 bg-zinc-900">
      <ul className="mx-auto my-3 flex justify-center text-zinc-500">
        <NavBarLink link="/home">Home</NavBarLink>
        <NavBarLink link="/Search">Search</NavBarLink>
        <NavBarLink link="/Random">Random</NavBarLink>
      </ul>
    </div>
  );
}
