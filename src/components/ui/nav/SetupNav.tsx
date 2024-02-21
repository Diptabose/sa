"use client";
import React from 'react';
import { usePathname } from 'next/navigation';


const Mapper:Record<string, string> = {
   'dbconfig':'Database Configuration',
   'azureconfig':'Azure Configuration',
}

const SetupNav = () => {

    const pathname = usePathname();
    
    const lastSegment = pathname.split('/').slice(-1)[0];
    return (
        <div className='w-full p-2'>
            App Setup {`- ${Mapper[lastSegment] ?? 'Sentiment Analysis'}`} 
        </div>
    )
}

export default SetupNav;
