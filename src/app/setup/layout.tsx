import Navbar from '@/components/ui/nav/Navbar'
import SetNav from '@/components/ui/nav/SetNav'
import SetupNav from '@/components/ui/nav/SetupNav'
import { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col w-full h-full'>
      <SetNav />
      <SetupNav />
      <div className='h-full overflow-y-auto'>
        {
          children
        }
      </div>

    </div>
  )
}

export default layout
