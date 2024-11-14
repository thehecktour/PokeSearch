import { useState } from "react";
import Navlink from "./NavLink";

export default function NavBar() {
  const [activePage, setActivePage] = useState(null);

  function updatePage(id) {
    setActivePage(id);
  }

  return (
    <div className="bg-zinc-900 border-b-2 border-zinc-800 w-full">
      <ul className="my-3 mx-auto text-zinc-500 flex justify-center">
        <Navlink
          link={"/home"}
          id={"home"}
          activePage={activePage}
          updatePage={updatePage}
        >
          Home
        </Navlink>
        <Navlink
          link={"/search"}
          id={"search"}
          activePage={activePage}
          updatePage={updatePage}
        >
          Search
        </Navlink>
        <Navlink
          link={"/random"}
          id={"random"}
          activePage={activePage}
          updatePage={updatePage}
        >
          Random
        </Navlink>
      </ul>
    </div>
  );
}
