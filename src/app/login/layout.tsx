import LoginSide from '@/components/atomic/log/LoginSide';
import { Params } from '@/types/params';
import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Login-Sentiment Analysis',
  description: 'Login page for Sentiment Analysis - Enables selective users to use the application'
}

const LoginLayout = ({ children , params }: { children: ReactNode , params:Params<unknown> }) => {

  return (
    <div className=' w-full h-full flex flex-col gap-2 sm:flex-row sm:gap-0'>
      <LoginSide />
      <div className='w-full border-l-[1px] h-full'>
        {children}
      </div>
    </div>
  )
}

export default LoginLayout;
