import { StringKey } from "@/types/formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { FormikProps } from "formik";
import FormikErrorField from "./FormikErrorField";
import { twMerge } from "tailwind-merge";
import { ProjectDetails } from "@/types/email";
import { useState } from "react";

interface Props<T> extends SelectProps {
  formikProp: FormikProps<T>;
  name: string;
  selectData: any;
  selectKey: string;
  inputLabel?: string;
  useTopLabel?: boolean;
  placeholder: string;
  mandatory?: boolean;
  labelProps?: {
    className: string;
  };
}

/**
 *
 * @param selectData is the the data to show in the dropdown. Mandatorily should contain _id
 * @param inputLabel is the additional label used in this component
 * @param seleckKey  is the key with which the value is shown in drop down
 * @returns
 */

const ProjectSelectField = <T extends StringKey>({
  formikProp,
  inputLabel,
  name,
  useTopLabel = false,
  selectData,
  selectKey,
  placeholder,
  mandatory = false,
  labelProps,
  MenuProps,
  ...attr
}: Props<T>) => {
  const [open, setOpen] = useState<boolean>(false);

  if (open) {
    selectData = [{ _id: "abcd", value: "" }, ...selectData];
  }
  return (
    <div className="flex flex-col gap-1 flex-1">
      <InputLabel
        id={name}
        className={twMerge(`text-sm w-fit`, labelProps?.className)}
      >
        {inputLabel}
        {mandatory ? <sup className="text-content-error">*</sup> : null}
      </InputLabel>

      <FormControl className="w-full">
        <Select
          labelId={name}
          name={name}
          size="small"
          value={formikProp.values[name] ?? ""}
          onChange={async (e) => {
            await formikProp.setFieldValue(name, e.target.value);
          }}
          onBlur={formikProp.handleBlur}
          MenuProps={{
            ...MenuProps,
            sx: {
              maxHeight: "45%",
            },
          }}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          placeholder={placeholder}
          displayEmpty
          error={
            formikProp.touched[name] && formikProp.errors[name] ? true : false
          }
          {...attr}
        >
          {!open && (
            <MenuItem key={-2} value={""} disabled>
              <span className="text-sm text-gray-400">Select a Project</span>
            </MenuItem>
          )}

          {selectData &&
            selectData?.map((data: ProjectDetails, index: number) => {
              if (data._id === "abcd") {
                return (
                  <MenuItem key={-1} value={""} disabled>
                    <div className="w-full flex items-center justify-between !text-sm text-gray-700">
                      <span>Project Name</span>
                      <div className="flex items-center gap-1">
                        <span>Count</span>
                        <span>|</span>
                        <span>Bandwidth</span>
                      </div>
                    </div>
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={data._id ?? index} value={data._id} className="">
                  <div className="w-full justify-between flex items-center !text-sm ">
                    <span>{data[selectKey]}</span>
                    <div className="flex items-center gap-1">
                      <span>
                        {data?.employee_count > 0 ? data?.employee_count : "-"}
                      </span>
                      <span>|</span>
                      <span>{data?.bandwidth}%</span>
                    </div>
                  </div>
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      {formikProp.touched[name] && formikProp.errors[name] && (
        <FormikErrorField formikProp={formikProp} name={name} />
      )}
    </div>
  );
};

export default ProjectSelectField;
