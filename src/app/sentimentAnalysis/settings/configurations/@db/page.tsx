import React from 'react'
import DbConfig from '@/components/ui/config/DbConfig';
import { getDBConfig } from '@/helper/pagefunctions';






const DbConfigPage = async () => {

  let data = await getDBConfig();
  if (!data) {
    data = {
      uri: '',
      username: '',
      password: '',
      dbname: ''
    }
  }

  return (
    <DbConfig initVal={data} />
  )
}

export default DbConfigPage;
