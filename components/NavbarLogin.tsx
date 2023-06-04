"use client";

import Link from "next/link";

import React, { useState } from "react";
import NavItem from "./NavItem";
import Image from "next/image";
import logo from "../images/log-2.jpg";

const MENU_LIST = [
  { text: "BIGLAW-AI", href: "/Tryout" },
  { text: "About Us", href: "/About" },
  { text: "Guide", href: "/Guide" },
  { text: "Pricing", href: "/Pricing" },
  { text: "Contacts", href: "/Contacts" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(Boolean);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <>
      <div id="topofdiv" className="{`nav`} flex bg-[#ecf7ff]  justify-between">
        <Link href={"/"} legacyBehavior>
          <a className=" ml-[120px] mb-1 mt-1 ">
            <Image src={logo} width={300} height={300} alt="logo" />
          </a>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className=" nav__menu-bar "
        ></div>

        <div
          id="nav__menu-list"
          className={`${navActive ? " active flex" : ""} nav__menu-list`}
        >
          {MENU_LIST.map((menu, idx) => (
            <div key={menu.text}>
              {activeIdx === idx ? (
                ""
              ) : (
                <div
                  key={menu.text}
                  className="flex mt-[12px] hover:bg-[#0c2474]/50  cursor-pointer  border-2 border-[#d4d4d4] bg-blue-300 rounded-md h-[50px] w-[120px]  ease-in-out"
                  onClick={() => {
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                >
                  <NavItem active={activeIdx === idx} {...menu} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
