import { FormikProps } from "formik";
import { TextFieldProps, TextField, FormLabel } from "@mui/material";
import { StringKey } from "@/types/formik";
import FormikErrorField from "./FormikErrorField";
import { twMerge } from "tailwind-merge";

type Props<T> = TextFieldProps & {
  formikProp: FormikProps<T>;
  name: string;
  label?: string;
  useTopLabel?: boolean;
  mandatory?: boolean;
  useMaterialLabel?: boolean;
  labelProps?: {
    className: string;
  };
};

/**
 *
 * @param formikProp the formik form handler
 * @param useTopLabel boolean value to use the label in the top
 * @returns
 */
const FormikTextField = <T extends StringKey>({
  formikProp,
  name,
  label,
  labelProps,
  useMaterialLabel = false,
  useTopLabel = true,
  mandatory = false,
  ...attr
}: Props<T>) => {
  return (
    <div
      className={"flex flex-col gap-1 flex-1"}
    >
      {useTopLabel ? (
        <FormLabel className={twMerge("text-sm w-fit" , labelProps?.className)}>
          {label}
          {mandatory ? (
            <span className="text-red-500">*</span>
          ) : null}
        </FormLabel>
      ) : null}
      <TextField
        value={formikProp.values[name]}
        onChange={formikProp.handleChange}
        onBlur={formikProp.handleBlur}
        size="small"
        label={useTopLabel ? null : useMaterialLabel ? label : null}
        name={name}
        {...attr}
        error={
          formikProp.touched[name] && formikProp.errors[name] ? true : false
        }
      />
      <FormikErrorField formikProp={formikProp} name={name} />
    </div>
  );
};

export default FormikTextField;
