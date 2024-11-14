import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl">Navigation</h1>
      <Outlet />
    </div>
  );
}

export default Root;
