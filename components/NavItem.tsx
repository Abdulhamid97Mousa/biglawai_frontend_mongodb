"use client";

type NavItemProps = {
  text: string;
  href: string;
  active: boolean;
  onClick: () => void;
};

const NavItem = ({ text, href, active, onClick }: NavItemProps) => {
  return (
    <div
      className={`flex mt-[12px] hover:bg-[#0c2474]/50  cursor-pointer  border-2 border-[#d4d4d4] ${
        active ? "bg-[#0c2474]/50" : "bg-blue-300"
      } rounded-md h-[50px] w-[120px] ease-in-out`}
      style={{ fontFamily: "Pangea, sans-serif" }}
      onClick={onClick}
    >
      <div className="flex-1 justify-center text-center py-3 ">
        <a className={`nav__item ${active ? "active" : ""} `}>{text}</a>
      </div>
    </div>
  );
};

export default NavItem;
