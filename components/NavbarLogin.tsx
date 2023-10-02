"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import Image from "next/image";
import logo from "../public/Images/log-2.jpg";
import { usePathname, useRouter } from "next/navigation";
import { Bars4Icon } from "@heroicons/react/24/outline";

const MENU_LIST = [
  { text: "BIGLAW-AI", href: "/Logged-in" },
  { text: "About Us", href: "/About" },
  { text: "Guide", href: "/Guide" },
  { text: "Pricing", href: "/Pricing" },
  { text: "Contacts", href: "/Contacts" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const pathname = usePathname();

  if (
    pathname?.startsWith("/Logged-in") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up")
  ) {
    return null;
  }

  return (
    <>
      <div
        id="topofdiv"
        className="nav flex bg-[#ecf7ff] justify-between border-b-2 border-gray-300 items-center"
      >
        <Link rel="preload" href={"/"} legacyBehavior>
          <a className="ml-[80px] mb-5 mt-5">
            <Image src={logo} alt="logo" priority={true} width={200} />
          </a>
        </Link>

        {/* Burger Menu */}
        <div
          className="2xl:hidden 3xl:hidden relative lg:block xxxs:hidden xxxxs:hidden"
          onClick={() => setNavActive(!navActive)}
        >
          <Bars4Icon className="h-12 w-12 text-black mr-[100px] mt-5 mb-5 cursor-pointer hover:bg-gray-300 transition-all duration-200 ease-out rounded-lg" />

          {/* Dropdown Menu */}
          <div
            id="nav__menu-list"
            className={`${
              navActive ? "block rounder-lg border-gray-300 border-2" : "hidden"
            } 2xl:hidden bg-white shadow-md rounded-lg absolute top-[50px] right-[100px] border-gray-300 w-[200px] z-50`}
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
