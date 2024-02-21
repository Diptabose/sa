"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';


const path_prefix = "/sentimentAnalysis/settings/";

const destinations:Record<string, string> = {
  'Configurations': 'configurations',
  'User Management': 'users',
  'Roles': 'roles',
  'Source Filters': 'filters',
  'Tags':'tags',
  'Opinions':'opinions'
}


function SettingsSideBar() {

    const pathname = usePathname();

    return <div className='flex-col flex'>
    {
        Object.keys(destinations).map((destination , index)=>{
           return ( <Link key={index} href={`${path_prefix}${destinations[destination]}`} className={`my-2 px-3 py-2 hover:bg-neutral-300 rounded-full transition-[background-color] duration-300 ${pathname.includes(destinations[destination])?'bg-neutral-300':''} `}>
            {destination}
          </Link> )
        })
    }
    </div>
}

export default SettingsSideBar
