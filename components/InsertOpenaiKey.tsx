import React from "react";
import { FC } from "react";
import Input from "@mui/base/Input";
import { styled } from "@mui/system";

type InsertOpenaiKeyProps = {
  openAIKey: string;
  setOpenAIKey: React.Dispatch<React.SetStateAction<string>>;
};

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 450px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.0;
  padding: 9px 12px;
  border-radius: 4px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};

  &:hover {
    border-color: ${grey[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    border: 2px solid${theme.palette.mode === "dark" ? blue[900] : blue[400]};
    ;
  }

`
);

const InsertOpenaiKey: FC<InsertOpenaiKeyProps> = ({
  openAIKey,
  setOpenAIKey,
}) => {
  return (
    <div className="mr-5">
      <StyledInputElement
        type="text"
        value={openAIKey}
        onChange={(e) => setOpenAIKey(e.target.value)}
        placeholder="Insert OpenAI Key"
      />
    </div>
  );
};

export default InsertOpenaiKey;
