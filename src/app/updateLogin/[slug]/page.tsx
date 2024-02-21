import UpdateUser from '@/components/ui/user/UpdateUser';
import { UpdateUserValues } from '@/types/formik';
import { Params } from '@/types/params';
import React from 'react'

const UpdatePage = (props:Params<string>) => {

  const {searchParams , params} = props;
 const initialValues : UpdateUserValues = {
  username: decodeURIComponent(params.slug) ?? '' ,
  prev_password:'',
  new_password:''
 }

  return (
    <UpdateUser isForceChange={true} initVal={ initialValues } />
  )
}

export default UpdatePage
