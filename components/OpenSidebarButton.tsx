import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import { FC } from "react";
import IconButton from "@mui/material/IconButton";

type OpenSidebarButtonProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const OpenSidebarButton: FC<OpenSidebarButtonProps> = ({ setShowSidebar }) => {
  return (
    <div className="border-2 rounded-md border-black/20">
      <IconButton
        className="flex p-2 gap-3  text-black cursor-pointer hover:bg-gray-500/10 h-8 w-8
       hover:rounded-md flex-shrink-0 items-center justify-center"
        onClick={() => setShowSidebar(true)}
      >
        <LastPageOutlinedIcon fontSize="medium" />
      </IconButton>
    </div>
  );
};

export default OpenSidebarButton;
