import SettingsSideBar from '@/components/ui/sidebars/SettingsSideBar'
import { Metadata } from 'next'




export const metadata: Metadata = {
  title: 'Settings- Sentiment Analysis',
  description: 'Settings page to modify, configure and tune email and app related settings'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div className='w-full flex h-full'>
      <aside className=' hidden sm:block w-[230px] border-solid border-[1px] border-r-black p-2 '><SettingsSideBar /></aside>
      <main className='flex flex-col flex-[10] overflow-y-auto bg-surface-3'>
        {children}
      </main>
    </div>
  )
}
