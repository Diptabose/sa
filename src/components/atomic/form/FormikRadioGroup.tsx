import {
  FormLabel,
  RadioGroup,
  RadioGroupProps,
} from "@mui/material";
import React  from "react";
import { twMerge } from "tailwind-merge";

interface Props extends RadioGroupProps {
  name: string;
  label?: string;
  labelProps?: {
    className: string;
    error?: string|null;
  };
  mandatory?: boolean;
}

const FormikRadioGroup = ({
  children,
  name,
  label,
  labelProps,
  mandatory = false,
  ...attr
}: Props) => {


  const isError = labelProps?.error && labelProps?.error?.length > 0;
  
  return (
    <div className="flex flex-1 flex-col">
      <FormLabel
        error={isError ? true : false}
        id="radio-buttons-group-label"
        className={twMerge("text-sm", !isError?labelProps?.className:'')}
      >
        {label ?? ""}
        {mandatory ? <span className="text-red-500">*</span> : null}
      </FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name={name}
        {...attr}
      >
        {children}
      </RadioGroup>
    </div>
  );
};

export default FormikRadioGroup;
