import { FC } from "react";
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import IconButton from "@mui/material/IconButton";

type CloseSidebarButtonProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CloseSidebarButton: FC<CloseSidebarButtonProps> = ({
  setShowSidebar,
}) => {
  return (
    <div className="rounded-md border border-white/20">
      <IconButton
        className="flex p-2 gap-3   cursor-pointer hover:bg-gray-500/10 h-11 w-11 hover:rounded-md flex-shrink-0 items-center justify-center"
        onClick={() => setShowSidebar(false)}
      >
        <FirstPageOutlinedIcon fontSize="medium" className="text-white" />
      </IconButton>
    </div>
  );
};

export default CloseSidebarButton;
