"use client";
import { FormikProps } from "formik";
import React, { memo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormikErrorField from "./FormikErrorField";
import { FormLabel, TextField } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Mode } from "@/types/formik";
import parseISO from "date-fns/parseISO";

interface Props extends DatePickerProps<Date> {
  formikProp: FormikProps<any>;
  name: string;
  label?: string;
  useTopLabel?: boolean;
  useMaterialLabel?:boolean
}


/**
 * Request to further developers, please dont explicitly include the TextField inside the slotProps.
 * Rather use slotProps param to define all the necessary slotProps passing it down to the textfield.
 */
const FormikDateField = ({
  formikProp,
  name,
  label,
  minDate,
  maxDate,
  useTopLabel = true,
  useMaterialLabel=false,
  slotProps,


  ...attr
}: Props) => {
  const mode = formikProp.values.mode as Mode;

  return (
    <div className="flex flex-col flex-1 gap-1 item-center">
      {useTopLabel ? <FormLabel className="text-sm">{label}</FormLabel> : <></>}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          //value={parseISO(formikProp.values[name])}
          maxDate={maxDate}
          label={useTopLabel ? "" : useMaterialLabel ?label:''}
          minDate={minDate}
          closeOnSelect
          onChange={async(value)=>{await formikProp.setFieldValue(name , value)}}
          
          slotProps={{
            textField:{
              size:'small',
              inputProps:{readOnly:true , placeholder:'mm/dd/yyyy'},
              error:formikProp.touched[name] && formikProp.errors[name] ? true : false,
              ...slotProps?.textField
            }
          }}
          {...attr}
        />
        
      </LocalizationProvider>
      <FormikErrorField formikProp={formikProp} name={name} />
    </div>
  );
};

export default FormikDateField;
