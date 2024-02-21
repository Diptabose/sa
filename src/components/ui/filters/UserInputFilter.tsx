"use client";

import React, { SyntheticEvent } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { FormikProps, useFormikContext } from "formik";
import { SourceFilterValues } from "@/types/formik";
import FormikErrorField from "@/components/atomic/form/FormikErrorField";

interface Props {
  name: string;
  label: string;
  formikProp: FormikProps<any>;
}

const UserInputFilter = ({ name, label, formikProp }: Props) => {

  const handleDeleteChip = (valueToDelete: string) => {
    const newValues = formikProp?.values[name].filter(
      (value: string) => value !== valueToDelete
    );
    formikProp?.setFieldValue(name, newValues);
  };

  const isError =
    formikProp?.touched[name] && formikProp.errors[name] ? true : false;

  return (
    <>
      <Autocomplete
        multiple
        options={[]} // No predefined options
        freeSolo
        value={formikProp?.values[name]}
        onChange={async (event, newValue) => {
          const newValues = newValue.map((value)=> value.trim());
          await formikProp?.setFieldTouched(name, true);
          await formikProp?.setFieldValue(name, newValues);
        }}
        onBlur={formikProp?.handleBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            name="domains.data"
            fullWidth
            error={isError}
            helperText={
              formikProp.errors[name]
                ? `${Array.from(
                    new Set(formikProp.errors[name] as string[])
                  )}`.replace(",", "")
                : ""
            }
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option}
              key={index}
              onDelete={() => handleDeleteChip(option)}
            />
          ))
        }
      />
    </>
  );
};

export default UserInputFilter;
