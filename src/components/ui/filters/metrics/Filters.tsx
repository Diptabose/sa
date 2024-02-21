import FormikDateField from '@/components/atomic/form/FormikDateField';
import FormikSelectField from '@/components/atomic/form/FormikSelectField';
import { MetricsValues, Mode } from '@/types/formik';
import { Button } from '@mui/material';
import { FormikProps } from 'formik';
import React, { useState } from 'react'
import { differenceInDays, differenceInMonths, differenceInWeeks, sub, set, subDays, subMonths, subWeeks } from 'date-fns';
import { getInitialValues } from '../../charts/ChartConfig';

interface Props {
  formikProp: FormikProps<MetricsValues>,
  mode: Mode
}


const Mapper: Record<Mode, (datLeft: Date | number, dateRight: Date | number) => number> = {
  'daily': differenceInDays,
  'monthly': differenceInMonths,
  'weekly': differenceInWeeks
}

const MinDateMapper: Record<Mode, (date: Date, amount: number) => Date> = {
  'daily': subDays,
  'monthly': subMonths,
  'weekly': subWeeks
}

const initialModes = [
  {
    _id: 'monthly',
  },
  {
    _id: 'weekly',
  }, {
    _id: 'daily'
  }
]




function getMinTime(mode: Mode, end_date: Date, start_date: Date) {

  const op = Mapper[mode];
  const diff = op(end_date, start_date);
  const config = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  }

  const returnDate = diff <= 10 ? set(start_date, config) : set(sub(start_date, {
    days: 10 - diff
  }), config);

  return returnDate;
}


function getMinDateTime(mode:Mode , end_date:Date){
  const op = MinDateMapper[mode];
  return op(end_date , 10);
}




function getMaxTime() {

  return new Date();
}



const MetricsFilters = ({ formikProp, mode }: Props) => {

  const [show, setShow] = useState<boolean>(true);

  return (
    <div className='flex'>
      {
        show ? <div className='bg-slate-200 p-2 rounded-lg w-full'>
          <div className='flex items-center justify-between'>
            <h2 className='font-light text-xl'>Filters</h2>
            <Button variant='contained' onClick={() => {
              setShow(!show);
            }}>Hide</Button>
          </div>
          <form className='py-2 flex items-center justify-evenly gap-1'>

            <FormikDateField formikProp={formikProp} label='Start Date'
              onChange={async (value) => {
                const time = getMinTime(mode, formikProp.values.end_date, value as Date);
                await formikProp.setFieldValue('start_date', time);
              }}
              name='start_date' useTopLabel={true}
              minDate={getMinDateTime(mode , new Date(formikProp.values.end_date))} // 10 days from the start date based on mode.
              maxDate={formikProp.values.end_date} />

            <FormikDateField formikProp={formikProp} 
            // onChange={async (value) => {
            //   console.log("The changed value is", value);
            //   // const time = getMinTime(mode, formikProp.values.end_date, value as Date);
            //   //await formikProp.setFieldValue('end_date', time);
            // }}
            onChange={async (value)=>{
              await formikProp.setFieldValue('end_date' , value);
            }}
            minDate={formikProp.values.start_date} 
            maxDate={new Date()} 
            label='End Date' 
            name='end_date' 
            useTopLabel={true}
            />

            <FormikSelectField formikProp={formikProp} name='mode' selectData={initialModes} inputLabel='Mode' selectKey='_id' useTopLabel
placeholder='Select a mode'
              onChange={async (e) => {
                const value = e.target.value as Mode;
                const values = getInitialValues(value);
                await formikProp.setValues(values);
              }}
            />

            {/* <Button onClick={() => {
              console.log("Values are", formikProp.values);
            }}>Show me</Button> */}
          </form>
        </div> : <Button sx={{marginTop:2 , marginLeft:"auto"}} variant='contained' onClick={() => {
          setShow(!show);
        }}>Show</Button>}
    </div>

  )
}

export default MetricsFilters;
