import { FC } from "react";
import Features from "./Features";
import OpenSidebarButton from "./OpenSidebarButton";
import ReactSelect, { SingleValue } from "react-select";
import InsertOpenaiKey from "./InsertOpenaiKey";
import SelectBackendServer from "./SelectBackendServer";

type NavFeaturesProps = {
  hidePii: boolean;
  handlePersonInfo: () => void;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedServer: string;
  setSelectedServer: React.Dispatch<React.SetStateAction<string>>;
  openAIKey: string;
  setOpenAIKey: React.Dispatch<React.SetStateAction<string>>;
};

const piiOptions = [
  { value: "hide", label: "Hide Personal Information" },
  { value: "show", label: "Show Personal Information" },
];

const NavFeatures: FC<NavFeaturesProps> = ({
  hidePii,
  handlePersonInfo,
  lang,
  setLang,
  showSidebar,
  setShowSidebar,
  selectedServer,
  setSelectedServer,
  openAIKey,
  setOpenAIKey,
}) => {
  const handlePiiChange = (
    selectedOption: SingleValue<{ value: string; label: string }>
  ) => {
    if (
      selectedOption &&
      ((hidePii && selectedOption.value === "show") ||
        (!hidePii && selectedOption.value === "hide"))
    ) {
      handlePersonInfo();
    }
  };

  return (
    <div className="flex justify-between items-center px-5 py-5  border-b border-black/20">
      <div>
        {!showSidebar && <OpenSidebarButton setShowSidebar={setShowSidebar} />}
      </div>
      <div className="flex items-center">
        <div>
          {selectedServer === "openAI" && (
            <InsertOpenaiKey
              openAIKey={openAIKey}
              setOpenAIKey={setOpenAIKey}
            />
          )}
        </div>
        <SelectBackendServer
          selectedServer={selectedServer}
          setSelectedServer={setSelectedServer}
        />

        <ReactSelect
          isSearchable={false}
          className="mr-5"
          value={piiOptions.find(
            ({ value }) => value === (hidePii ? "hide" : "show")
          )}
          options={piiOptions}
          onChange={handlePiiChange}
        />
        <Features
          placeHolder="Select Language"
          currentLang={lang}
          setLang={setLang}
        />
      </div>
    </div>
  );
};

export default NavFeatures;
