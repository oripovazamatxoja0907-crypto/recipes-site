import { Link, NavLink } from "react-router-dom";
import { UserButton } from "@clerk/react";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/my-recipes", label: "Mening retseptlarim" },
  { to: "/profile", label: "Profil" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link to="/dashboard" className="text-xl font-bold text-orange-600">
          🍲 Retseptlar
        </Link>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-orange-100 text-orange-700"
                    : "text-stone-600 hover:bg-stone-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <UserButton />
      </div>
    </header>
  );
}

export default Navbar;
