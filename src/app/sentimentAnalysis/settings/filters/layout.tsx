import React, { ReactNode } from 'react'
import FiltersSidebar from '../../../../components/ui/sidebars/FiltersSidebar';


const FilterLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex h-full w-full bg-white'>
            <section className='w-1/5 border-r-[1px] border-black p-2'>
                <FiltersSidebar />
            </section>
            <div className='flex-[9] w-auto p-2'>
                    {children}
            </div>
        </div>
    )
}

export default FilterLayout;
