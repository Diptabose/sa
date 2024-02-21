import React from 'react'
import { Heading } from './TagsLoader'
import { SASkeleton } from './HomeLoader'

const TableLoader = () => {
  return (
    <div className='h-full w-full px-2'>
      <Heading />
      <SASkeleton variant='rectangular' height={40} className='bg-container-brand/70' />
      <div className='flex flex-col gap-1 my-2'>
        {
            Array.from({length:11} , (_ , i)=>i+1).map((index)=>{
                return <SASkeleton key={index} variant='rectangular' className='bg-container-brand-lite' height={30} />
            })
        }
      </div>
      <SASkeleton variant='rectangular' height={40} className='bg-container-brand/50' />
    </div>
  )
}

export default TableLoader
