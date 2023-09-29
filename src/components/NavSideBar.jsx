import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function NavSideBar() {
  const navLinks = [
    {
      link: "Overview",
      path: ".",
    },
    {
      link: "Categories",
      path: "/home/categories",
    },
  ];
  return (
    <div className="flex items-start justify-between">
      <aside className="bg-[#14182f] w-48 h-screen">
        <h1 className="text-center text-lg text-yellow-50">Logo</h1>
        <ul className="mt-8 leading-9 font-poppin">
          {navLinks.map((navLink) => (
            <li key={navLink.link}>
              <NavLink
                to={navLink.path}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "text-slate-50 font-light"
                    : isActive
                    ? "font-medium text-white inline-block w-full bg-[#20212d] px-2 py-2.5 transition ease-in duration-300"
                    : "text-white w-full"
                }
                end={navLink.path === "." ? true : false}
              >
                {navLink.link}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <Outlet/>
      <Dashboard />
    </div>
  );
}
