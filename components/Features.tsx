import React, { Dispatch, SetStateAction, useState } from "react";
import Select, {
  components,
  OptionProps,
  MultiValue,
  SingleValue,
} from "react-select";

type Props = {
  currentLang: string;
  setLang: Dispatch<SetStateAction<string>>;
  placeHolder: string;
};

type OptionData = {
  label: string;
  value: string;
  dialCode: string;
};

const options: OptionData[] = [
  {
    label: "English",
    value: "english",
    dialCode: "dialCode 1",
  },
  {
    label: "French",
    value: "french",
    dialCode: "dialCode 2",
  },
  {
    label: "Spanish",
    value: "spanish",
    dialCode: "dialCode 3",
  },
  {
    label: "Chinese",
    value: "chinese",
    dialCode: "dialCode 4",
  },
  {
    label: "German",
    value: "german",
    dialCode: "dialCode 5",
  },
];

const { Option } = components;

const IconOption = (props: OptionProps<OptionData>) => {
  const { label, dialCode } = props.data;

  return (
    <Option {...props}>
      <div>{label}</div>
    </Option> 
  );
};

function isMultiOption<T>(value: MultiValue<T> | SingleValue<T>): value is T[] {
  return Array.isArray(value);
}

function isSingleOption<T>(value: MultiValue<T> | SingleValue<T>): value is T {
  return value != null && !isMultiOption(value);
}

function Dropdown({ placeHolder, currentLang, setLang }: Props) {
  const [selected, setSelected] = useState(options[0]);

  const onSelectedChange = (
    newValue: MultiValue<OptionData> | SingleValue<OptionData>
  ) => {
    if (newValue == null) {
      return;
    }
    if (isMultiOption(newValue)) {
      setSelected(newValue[0]);
      setLang(newValue[0].value);
    } else if (isSingleOption(newValue)) {
      setSelected(newValue);
      setLang(newValue.value);
    }
  };

  return (
    <Select
      instanceId="language-dropdown"
      options={options}
      value={selected}
      components={{ Option: IconOption }}
      onChange={onSelectedChange}
      isSearchable={false} // Disable search feature
    />
  );
}

export default Dropdown;
