"use client";

import Link from "next/link";

const NavItem = ({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) => {
  return (
    <Link href={href} legacyBehavior>
      <div
        className={`flex mt-[12px] hover:bg-[#0c2474]/50  cursor-pointer  border-2 border-[#d4d4d4] ${
          active ? "bg-[#0c2474]/50" : "bg-blue-300"
        } rounded-md h-[50px] w-[120px]  ease-in-out`}
        style={{ fontFamily: "Pangea, sans-serif" }}
      >
        <div className="flex-1 justify-center text-center py-3 ">
          <a className={`nav__item ${active ? "active" : ""} `}>{text}</a>
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
