"use client"
import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress } from '@mui/material';
import * as API from '@/utils/app/api'
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";
import { UpdateUserValues } from '@/types/formik';
import FormikTextField from '@/components/atomic/form/FormikTextField';
import { updatePasswordSchema } from '@/constants/form/yup/constants';

interface Props {
  isForceChange: boolean,
  initVal:UpdateUserValues,
}

const UpdateUser = ({ initVal ,  isForceChange = false }: Props) => {

  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const updateUserForm = useFormik<UpdateUserValues>({
    initialValues: initVal,
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      setLoading(true);
      API.PatchMethod('user/updatePassword', {...values, isPasswordChanged:true}).then((resp: any) => {
      
        if (resp && resp.success) {
          router.replace('/sentimentAnalysis/home');
        }
        else{
          router.replace('/login');
        }
      }, error => {
        setLoginErrorMessage(error["response"]["data"]["message"]);
      }).finally(() => {
        setLoading(false);
      })
    }
  })

  useEffect(() => {
    setLoginErrorMessage(null);
  }, [updateUserForm.values])

  // useEffect(() => {
  //   setLoginErrorMessage(null);
  //   let authorization = localStorage.getItem('authorization');
  //   if (!isNullOrUndefined(authorization)) {
  //     redirect("/sentimentAnalysis/home");
  //   }
  // }, [])

  return (
    <div className='py-2 flex flex-1  justify-center items-center'>
      <Card sx={{ minWidth: 350 }}>
        <form className='flex flex-col gap-2 p-5' onSubmit={updateUserForm.handleSubmit}>
          <span className='self-center text-3xl'>Update Password</span>
          <FormikTextField<UpdateUserValues> formikProp={updateUserForm} name='username' 
          placeholder='Username' label='Username' inputProps={{
            readOnly: isForceChange
          }} />

          <FormikTextField<UpdateUserValues> formikProp={updateUserForm} name='prev_password' type='password' placeholder={`${isForceChange ? 'Default' : 'Previous'} Password`} label={`${isForceChange ? 'Default' : 'Previous'} Password`}/>

          <FormikTextField<UpdateUserValues> formikProp={updateUserForm} name='new_password' type='password' placeholder='New Password' label='Password' />

          <div className='flex flex-row items-center justify-end'>
            <div className='flex flex-1 justify-start'>
              {loginErrorMessage && <div className='text-red-500 text-sm'>{loginErrorMessage}</div>}
            </div>
            <Button type='submit' variant='contained' color='primary'>
              Submit
              {
                loading ? <CircularProgress size={16} sx={{ color: 'white' }} /> : <></>
              }
            </Button>
            <Button type='button' variant='contained' color='primary' onClick={() => {
            }}>Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default UpdateUser;

