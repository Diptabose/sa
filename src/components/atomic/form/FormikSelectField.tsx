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
  placeholderProps?:{
   className?:string
  }
}

/**
 *
 * @param selectData is the the data to show in the dropdown. Mandatorily should contain _id
 * @param inputLabel is the additional label used in this component
 * @param seleckKey  is the key with which the value is shown in drop down
 * @returns
 */

const FormikSelectField = <T extends StringKey>({
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
  placeholderProps,
  ...attr
}: Props<T>) => {
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
          placeholder={placeholder}
          displayEmpty
          error={
            formikProp.touched[name] && formikProp.errors[name] ? true : false
          }
          {...attr}
        >
          <MenuItem key={-1} value={""} disabled>
            <span className={twMerge("selectdisabled text-sm", placeholderProps?.className )}>{placeholder}</span>
          </MenuItem>
          {selectData &&
            selectData?.map((data: any, index: number) => (
              <MenuItem key={data._id ?? index} value={data._id}>
                {data[selectKey]}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormikErrorField formikProp={formikProp} name={name} />
    </div>
  );
};

export default FormikSelectField;
