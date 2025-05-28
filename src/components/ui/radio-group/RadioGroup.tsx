import React, { ReactNode } from "react";

interface RadioItem  {
  id: string;
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Array<RadioItem>;
  onChange?: (option: RadioItem) => void;
  selectedValue?: RadioItem;
  className?: string;
  name:string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onChange,
  selectedValue,
  name
}) => {

  return (
    <div className="flex flex-col space-y-2">
      <fieldset >
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center space-x-2">
          <input
            type="radio"
            name={name}
            value={option.value}
            // checked={selectedValue?.value === option.value}
            onChange={() => onChange?.(option)}
            className="form-radio text-red-600"
            style={{boxShadow: 'none'}}
          />
          <span>{option.label}</span>
        </label>
      ))}
      </fieldset>
    </div>
  );
};

export default RadioGroup;
