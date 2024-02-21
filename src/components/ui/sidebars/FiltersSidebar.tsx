"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const path_prefix = '/sentimentAnalysis/settings/filters'
const destinations:Record<string, string> = {
    'Domains': 'domains',
    'Email from': 'emailsfrom',
    'Email to': 'emailsto',
    'CC': 'cc',
    'Subject': 'subject'
}


const FiltersSidebar = () => {

    const pathname = usePathname();
    return <div className='flex flex-col'>
    {
        Object.keys(destinations).map((destination , index)=>{
           return ( <Link key={index} href={`${path_prefix}/${destinations[destination]}`} className={`my-2 px-3 py-2 hover:bg-surface-3 rounded-full transition-[background-color] duration-300 ${pathname?.includes(destinations[destination])?'bg-neutral-300':''} `}>
            {destination}
          </Link> )
        })
    }
    </div>
}

export default FiltersSidebar
