import React from "react";

type BoxProps = {
  caption: string;
  description: string;
  functionality: string;
  onClick: () => void;
};

export const BoxComponent: React.FC<BoxProps> = ({
  caption,
  description,
  functionality,
  onClick,
}) => {
  return (
    <div
      className={` items-center justify-center mr-5 ml-5  mt-5 mb-5   bg-[#2a2b32]/50 rounded-md px-5 py-3 text-sm hover:bg-[#2a2b32] cursor-pointer transition-all duration-200 ease-out border-white/40 border-2 `}
      onClick={onClick}
    >
      <div className=" items-center">
        <span className="text-white font-bold text-2xl">{caption}</span>
        <p className="text-white">{description}</p>
        <p className="text-gray-300 mt-5">{functionality}</p>
      </div>
    </div>
  );
};
