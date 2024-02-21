import { CircularProgress } from '@mui/material'
import Card from '@mui/material/Card'
import React from 'react'

interface Props {
   h:number
}

const LoaderCard = ({h}:Props) => {
  return (
    <Card className='rounded-cards flex items-center justify-center flex-none w-full' sx={{height:h}}>
       <CircularProgress size={24} color="inherit" className="text-content-brand"/>
    </Card>
  )
}

export default LoaderCard
