import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Azure Configuration -Sentiment Analysis',
  description: 'Azure configuration page for Sentiment Analysis - Enables selective users to configure Azure Credentials to perform sentiment analysis on emails'
}

const AzureLayout = ({children}:{children:ReactNode}) => {
  return (
     <div className='flex items-center justify-center h-full'>
     {children}
     </div>
  )
}

export default AzureLayout;
