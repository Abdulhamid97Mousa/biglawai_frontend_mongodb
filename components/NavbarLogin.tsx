"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import Image from "next/image";
import logo from "../images/log-2.jpg";
import { usePathname } from "next/navigation";

const MENU_LIST = [
  { text: "BIGLAW-AI", href: "/Tryout" },
  { text: "About Us", href: "/About" },
  { text: "Guide", href: "/Guide" },
  { text: "Pricing", href: "/Pricing" },
  { text: "Contacts", href: "/Contacts" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div
        id="topofdiv"
        className="nav flex bg-[#ecf7ff] justify-between border-b-2 border-gray-300"
      >
        <Link href={"/"} legacyBehavior>
          <a className="ml-[80px] mb-1 mt-1">
            <Image src={logo} width={300} height={300} alt="logo" />
          </a>
        </Link>

        {/* Burger Menu */}
        <div
          className="2xl:hidden 3xl:hidden relative lg:block  xxxs:hidden xxxxs:hidden"
          onClick={() => setNavActive(!navActive)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#353a3c"
            className="mr-[100px] mt-[30px] cursor-pointer hover:bg-gray-300 transition-all duration-200 ease-out  rounded-lg"
            viewBox="0 0 16 18"
            width="50"
            height="50"
          >
            <path d="M1 3h14a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2zm0 5h14a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z" />
          </svg>

          {/* Dropdown Menu */}
          <div
            id="nav__menu-list"
            className={`${
              navActive ? "block rounder-lg border-gray-300 border-2" : "hidden"
            } 2xl:hidden  bg-white shadow-md rounded-lg absolute right-[100px] border-gray-300 w-[200px]`}
          >
            {MENU_LIST.map((menu, idx) => (
              <Link key={menu.text} href={menu.href} legacyBehavior>
                <a
                  onClick={() => setNavActive(false)}
                  className="block text-black text-[24px] justify-between hover:bg-gray-300 transition-all duration-200 ease-out px-[10px] rounded-sm"
                  style={{
                    fontFamily: "Pangea, sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  {menu.text}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden 2xl:flex  items-center space-x-4 mr-[120px] mb-[15px]">
          {MENU_LIST.map((menu, idx) => (
            <NavItem
              key={idx}
              text={menu.text}
              href={menu.href}
              active={pathname === menu.href}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
