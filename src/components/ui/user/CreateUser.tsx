"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, CircularProgress } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import FormikTextField from '@/components/atomic/form/FormikTextField'
import { RoleValues, UserValues } from '@/types/formik';
import * as API from '@/utils/app/api'
import FormikSelectField from '@/components/atomic/form/FormikSelectField';
import { createUserSchema } from '@/constants/form/yup/constants';
import CustomDialog from '@/components/atomic/dialogs/CustomDialog';
import { logout, removeCookies, revalidateRoute } from '@/app/server_actions/actions';




interface Props {
  initValues: UserValues,
  rolesData: RoleValues[],
  mode: 'create' | 'edit',
  isFirstTimeConfiguring?: boolean
}



const CreateUser = ({ mode, initValues, rolesData, isFirstTimeConfiguring }: Props) => {

  const [openDialog, setDialog] = useState<boolean>(false);
  const [errMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();

  const userForm = useFormik<UserValues>({
    initialValues: initValues,
    validationSchema: createUserSchema,
    onSubmit: (values) => {
      const APIMethod = mode === 'create' ? API.PutMethod : API.PatchMethod;
      const endpoint = mode === 'create' ? 'user/createUser' : `user/updateUser/${params.get('id')}`
      setLoading(true);
      if (isFirstTimeConfiguring) {
        setDialog(true);
      } else {
        APIMethod(endpoint, values, {}).then(async (data) => {
          if (data?.success) {
            //router.push('/sentimentAnalysis/settings/users');
            await revalidateRoute('/sentimentAnalysis/settings/users/create_user');
            await revalidateRoute('/sentimentAnalysis/settings/users', '/sentimentAnalysis/settings/users');
          }
        }).catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.message);
        }).finally(() => {
          setLoading(false);
        })
      }
    }
  });

  useEffect(() => {
    setErrorMessage("");
  }, [userForm.values]);

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className='h-full overflow-hidden'>
      <div className='py-2 pl-4'>
        <span className='text-xl font-medium'>{mode === 'create' ? 'Add' : 'Update'} an User</span>
      </div>
      <div className='h-full overflow-y-auto p-4' >
        <Card sx={{ minWidth: 350, padding: 2 }} className='flex flex-col gap-y-2 bg-container-default'>
          <form className='flex flex-col gap-y-2 ' onSubmit={userForm.handleSubmit}>
            <div className='flex items-center gap-2'>

              <FormikTextField<UserValues> label={'Name'} name='name' formikProp={userForm} placeholder='Name' className='w-full' useTopLabel={true} />

              <FormikTextField<UserValues> label={'Email'} name='username' formikProp={userForm} placeholder='Email' type='email' className='w-full' useTopLabel={true} />

              <FormikSelectField<UserValues> name="role" formikProp={userForm} inputLabel='Role' selectData={rolesData} selectKey='role' className='w-full' useTopLabel={true} placeholder='Select a role' />
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex flex-col gap-2 items-start'>
              {
                mode === 'create' ? <span><b>Note:</b> The user created shall login via Microsoft Oauth</span> : <></>
              }
              {
                errMessage.length > 0 ? <span className='text-sm text-red-500'>{errMessage}</span>:<></>
              }
              </div>
              <Button variant='contained' type='submit' >
                {
                  loading ? <CircularProgress size={22} sx={{ color: "white", marginRight: 1 }} /> : <></>
                }
                {mode === 'create' ? 'Add' : 'Update'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <CustomDialog open={openDialog} onCancel={() => { setLoading(false); setDialog(false) }} onConfirmation={() => {
        API.PutMethod('user/createUser', userForm.values).then((data) => {
          if (data.success) {
            setDialog(false);
            removeCookies();
            router.push('/login');
          }
        }).catch((err) => {
          console.log("The error is error");
        })

      }} content='Creating this user is an one time action.Ensure you configure properly. Post this action you shall be logged out. Do you want to proceed ?' title='Confirm' actionButtonLabel='Create' />
    </div>
  )
}



export default CreateUser;


