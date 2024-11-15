import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <div className="bg-zinc-900 border-b-2 border-zinc-800 w-full">
      <ul className="my-3 mx-auto text-zinc-500 flex justify-center">
        <NavBarLink link="/home">Home</NavBarLink>
        <NavBarLink link="/Search">Search</NavBarLink>
        <NavBarLink link="/Random">Random</NavBarLink>
      </ul>
    </div>
  );
}
