"use client"
import FormikRadioGroup from '@/components/atomic/form/FormikRadioGroup'
import { Emails,sourcefilters } from '@/types/formik'
import { FormControlLabel, Radio, RadioGroupProps } from '@mui/material'
import { FormikProps } from 'formik'
import React from 'react'

export interface Props extends RadioGroupProps {
  name: string,
  label: string,
  formikProp?:FormikProps<Emails>
}


/**
 * 
 * @param name The name field controlled by formik. Use dotted notation fornested fields
 * @param label The label to show above the radio buttons
 * @returns 
 */

const IncludeExlude = ({ name, label , formikProp }: Props) => {


  const parentName = name.split('.')[0] as sourcefilters;


  return (
    <>
      <FormikRadioGroup name={name} label={label} row
        onChange={async (event, value) => {
          // const inputname = name.split('.')[0]+'.data';
          await formikProp?.setFieldValue('data' , []);
          await formikProp?.setFieldValue(name, value === 'false' ? false : true)
        }}
        onBlur={formikProp?.handleBlur}
        value={formikProp?.values[name]}>
        <FormControlLabel value={false} control={<Radio />} label="Exclude" />
        <FormControlLabel value={true} control={<Radio />} label="Include" />
      </FormikRadioGroup>
    </>

  )
}

export default IncludeExlude;

