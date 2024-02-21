import React, { ReactNode } from 'react'

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='h-full w-full '>
      {children}
    </div>
   
    
  )
}
export default DashboardLayout;
