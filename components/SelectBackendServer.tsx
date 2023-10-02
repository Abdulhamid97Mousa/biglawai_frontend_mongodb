import React, { FC } from "react";
import Select, { ActionMeta } from "react-select";

type SelectBackendServerProps = {
  selectedServer: string;
  setSelectedServer: React.Dispatch<React.SetStateAction<string>>;
};

type OptionType = {
  value: string;
  label: string;
};

const serverOptions: OptionType[] = [
  { value: "bigLaw", label: "Law-AI" },
  { value: "openAI", label: "GPT-3.5" },
];

const SelectBackendServer: FC<SelectBackendServerProps> = ({
  selectedServer,
  setSelectedServer,
}) => {
  const handleServerChange = (
    selectedOption: OptionType | null,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (selectedOption && actionMeta.action === "select-option") {
      setSelectedServer(selectedOption.value);
    }
  };

  return (
    <div className="mr-5">
      <Select
        isSearchable={false}
        value={serverOptions.find(({ value }) => value === selectedServer)}
        options={serverOptions}
        onChange={handleServerChange}
      />
    </div>
  );
};

export default SelectBackendServer;
