import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSyncUser } from "../hooks/useSyncUser";

function Layout() {
  useSyncUser();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
