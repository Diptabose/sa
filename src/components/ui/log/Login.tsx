"use client"
import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress } from '@mui/material';
import * as API from '@/utils/app/api'
import { useFormik } from 'formik';
import { isNullOrUndefined } from '@/utils/app/commonMethods'
import { redirect, useRouter } from "next/navigation";
import { LoginValues } from '@/types/formik';
import FormikTextField from '@/components/atomic/form/FormikTextField'
import { loginSchema } from '@/constants/form/yup/constants';



const Login = () => {

  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const loginForm = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setLoginErrorMessage("");
      API.PostMethod('login', values, {}).then((resp: any) => {
        if (!isNullOrUndefined(resp) && !isNullOrUndefined(resp.token_cookie)) {
          router.replace(`/setup/dbconfig`);
        }
      }, error => {
        console.log(error);
        setLoginErrorMessage(error.response.data.message);
      }).finally(() => {
        setLoading(false);
      })
    }
  })

  useEffect(() => {
    setLoginErrorMessage("");
  }, [loginForm.values])

  return (
    <div className='py-2 flex flex-1 justify-center items-center h-full'>
      <Card className='sm:min-w-[350px]'>
        <form className='flex flex-col gap-2 p-5' onSubmit={loginForm.handleSubmit}>
          <span className='self-center text-3xl'>Login</span>
          <FormikTextField<LoginValues> formikProp={loginForm} name='username' placeholder='Username' label='Username' />
          <FormikTextField<LoginValues> formikProp={loginForm} name='password' type='password' placeholder='Password' label='Password' />
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
            {/* <Button type='button' variant='contained' color='primary' onClick={() => {
              console.log('', loginForm.values)
            }}>Submit</Button> */}
          </div>
        </form>

      </Card>
    </div>
  )
}

export default Login;
