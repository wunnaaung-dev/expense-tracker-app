import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import {CiMenuBurger} from 'react-icons/ci'
import {GrClose} from 'react-icons/gr'
export default function NavSideBar() {
  const [toggle, setToggle] = useState(false)
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
  let aside = "lg:w-48 lg:h-screen bg-[#14182f] w-full"
  let navigation = "hidden lg:block"
  let mainContents = "lg:flex w-full"
  if(toggle) {
    aside = "bg-[#14182f] w-full"
    navigation = "h-screen"
    mainContents += "hidden"
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
      <aside className={aside}> {/* bg-[#14182f] */ } 
        <button onClick={() => setToggle(!toggle)} className="bg-slate-200 text-3xl lg:hidden rounded-sm p-2 m-1">
          {toggle ? <GrClose/> : <CiMenuBurger />}
          
        </button>
        <div className={navigation}>
          <h1 className="text-center text-lg text-yellow-50">Logo</h1>
          <ul className="mt-8 leading-9 space-y-4 flex flex-col justify-center items-center lg:justify-start lg:items-start font-poppin">
            {navLinks.map((navLink) => (
              <li className="lg:w-full" key={navLink.link}>
                <NavLink
                  to={navLink.path}
                  onClick={() => setToggle(false)}
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
        </div>
      </aside>
      <div className={mainContents}>
        <Outlet />
        <Dashboard />
      </div>
    </div>
  );
}
