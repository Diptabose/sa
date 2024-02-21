import { StringKey } from "@/types/formik";
import { FormikProps } from "formik";
import React from "react";

interface Props<T> {
  formikProp: FormikProps<T>;
  name: string;
}

/**
 *
 * @param formikProp - is the form state handler which controls the form input component
 * @param name - the name of the input component
 * @returns
 */
const FormikErrorField = <T extends StringKey>({
  formikProp,
  name,
}: Props<T>) => {
  return (
    <span className="min-h-[12px] text-red-500 text-xs leading-3">
      {formikProp.touched[name] && formikProp.errors[name]
        ? `${formikProp.errors[name]}`
        : ""}
    </span>
  );
};

export default FormikErrorField;
