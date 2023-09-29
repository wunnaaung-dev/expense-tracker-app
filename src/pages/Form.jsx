import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Form() {
  const navs = [
    { name: "Add Expense", path: "." },
    { name: "Create New Budget", path: "create" },
  ];
  return (
    <div className="w-3/4 bg-[#E6E6E6] h-screen">
      <div className="mx-auto w-3/4 bg-white shadow-md px-6 py-4 mt-20 rounded-xl space-y-5">
        <nav>
          <ul className="flex gap-8">
            {navs.map((nav) => (
              <NavLink
                to={nav.path}
                className={({ isActive, isPending }) =>
                  isActive ? "font-bold underline underline-offset-8" : ""
                }
                end={nav.path === "." ? true : false}
              >
                {nav.name}
              </NavLink>
            ))}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
