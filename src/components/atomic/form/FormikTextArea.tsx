import { FormikProps } from 'formik';
import React,{InputHTMLAttributes} from 'react';


interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string,
  formikProp:FormikProps<any>,
  name:string,
}

const FormikTextArea = ({label , formikProp, name, ...attr}:Props) => {

  return (
    <div className='flex flex-col gap-y-2 flex-1'>
      <label>{label}</label>
      <textarea  {...attr} value={formikProp.values[name!]} name={name} className='h-full border-[1px] border-gray-300 focus:border-[#344A5E] outline-none rounded-md resize-none p-2 min-h-1/2' onChange={formikProp.handleChange} onBlur={formikProp.handleBlur}></textarea>
      <div id="text_info">
       <span className='text-gray-500 text-xs'>{formikProp.values[name!].length}/{attr.maxLength ?? 0}</span>
      </div>
    </div>
  )
}

export default FormikTextArea
