import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Database Configuration -Sentiment Analysis',
  description: 'Database configuration page for Sentiment Analysis - Enables selective users to configure database credentials'
}

const DBLayout = ({children}:{children:ReactNode}) => {
  return (
     <>
     {children}
     </>
  )
}

export default DBLayout;
