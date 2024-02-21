"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as API from '@/utils/app/api'
import { useRouter } from 'next/navigation';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Link from 'next/link';
import { AzureValues } from '@/types/formik';
import FormikTextField from '@/components/atomic/form/FormikTextField';
import { azureConfigSchema } from '@/constants/form/yup/constants';
import { revalidateRoute } from '@/app/server_actions/actions';



interface Props {
  initVal: AzureValues,
  editing?: boolean,
  isFirstTimeConfiguring?:boolean
}
const AzureConfig = ({ initVal, isFirstTimeConfiguring ,editing = true }: Props) => {


  const [errorMessage, setErrorMessage] = useState(null);
  const [isValidConfig, setIsValidConfig] = useState<boolean>();
  const [validating, setValidating] = useState<boolean>();
  const router = useRouter();

  const azureConfigForm = useFormik<AzureValues>({
    initialValues: initVal,
    validationSchema: azureConfigSchema,
    onSubmit: (values) => {
      setValidating(true);
      API.PostMethod('azure/validate_azure', values).then((resp: any) => {
        setIsValidConfig(true);
        setErrorMessage(null)
        setValidating(false);
  
        if (editing) {
          router.replace('/sentimentAnalysis/home');
        }
 
      }, error => {
        setValidating(false);
        setIsValidConfig(false);
        setErrorMessage(error["response"]["data"]["message"]);
      })
    }
  })

  useEffect(() => {
    setIsValidConfig(false);
    setErrorMessage(null);
  }, [azureConfigForm.values])

  return (
    <div className='py-2 flex flex-col gap-3 items-center justify-center h-full w-full bg-surface-3 overflow-y-auto'>
      <span className='self-center'>{editing ? '' : 'Step 2/2'}</span>
      <span className='text-2xl self-center text-center'>Azure Configuration</span>

      {/* {editing ? <span className='text-sm w-7/12 text-center'><b>Note:</b>Editing Azure configuration redirects to home screen</span> : <></>} */}

      <div className='flex flex-col gap-3 h-full'>
        <Card sx={{ minHeight:400 }} className='sm:min-w-[350px] rounded-cards'>

          <form className='flex flex-col p-5 h-full justify-between' onSubmit={azureConfigForm.handleSubmit}>
            <div>
              <FormikTextField formikProp={azureConfigForm} name='tenant_id' label={'Tenant ID'} placeholder='Tenant ID' mandatory />
              <FormikTextField formikProp={azureConfigForm} name='client_id' label={'Client ID'} placeholder='Client ID' mandatory />
              <FormikTextField formikProp={azureConfigForm} name='client_secret' label={'Client Secret'} placeholder='Client Secret' type='password' mandatory />
            </div>


            <div className='flex flex-row items-center justify-end'>
              <div className='flex flex-1 justify-start'>
                {!validating && (isValidConfig ?
                  <div className='flex gap-1 items-center text-sm'>
                    <CheckCircleOutlinedIcon fontSize='small' color='success' />
                    <span>Azure configuration successfull</span>
                  </div> :
                  errorMessage &&
                  <div className='text-red-500 text-sm flex gap-1 items-center'>
                    <CancelOutlinedIcon fontSize='small' />
                    {errorMessage}
                  </div>)}
              </div>
              <Button type='submit' variant='contained' color='primary'>
                {validating ? <div className='flex items-center gap-1'>
                  <div>Validating</div>
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                </div> : 'Edit'}
              </Button>
            </div>
          </form>
        </Card>

        {
          !editing && <div className='flex flex-row gap-2 justify-end'>
            <Button variant='text' className="text-accordion-blue" color='primary'>
              <Link href="/sentimentAnalysis/dbconfig" >Back</Link>
            </Button>
            <Button disabled={validating || !isValidConfig} onClick={()=>{
                if(isFirstTimeConfiguring){
                   router.replace('/setup/create_user');
                }
            }} variant='contained' color='primary'>
             Next
            </Button>
          </div>
        }

      </div>
    </div>
  )
}

export default AzureConfig;
