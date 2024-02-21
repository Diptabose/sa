import { FormikProps } from "formik";
import { TextField, FormLabel, TextFieldProps } from "@mui/material";
import { StringKey } from "@/types/formik";
import FormikErrorField from "./FormikErrorField";
import { MuiColorInput, MuiColorInputProps } from "mui-color-input";

type Props<T> = MuiColorInputProps & {
  formikProp: FormikProps<T>;
  name: string;
  label: string;
  useTopLabel?: boolean;
  mandatory?: boolean;
};

/**
 *
 * @param formikProp the formik form handler
 * @param useTopLabel boolean value to use the label in the top
 * @returns
 */
const FormikColorInput = <T extends StringKey>({
  formikProp,
  name,
  label,
  useTopLabel = true,
  mandatory = true,
  ...attr
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      {useTopLabel ? (
        <FormLabel className="text-sm relative w-fit">
          {label}
          {mandatory ? (
            <span className="text-red-500 absolute top-0 -right-2">*</span>
          ) : (
            <></>
          )}
        </FormLabel>
      ) : (
        <></>
      )}
      <MuiColorInput
        onBlur={formikProp.handleBlur}
        size="small"
        label={useTopLabel ? "" : label}
        name={name}
        format="hex"
        adornmentPosition="end"
        {...attr}
        error={
          formikProp.touched[name] && formikProp.errors[name] ? true : false
        }
      />
      <FormikErrorField formikProp={formikProp} name={name} />
    </div>
  );
};

export default FormikColorInput;
