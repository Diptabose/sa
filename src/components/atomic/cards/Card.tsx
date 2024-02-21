import { Card,CardActions,CardContent, CardHeader } from '@mui/material'
import React, { ReactNode } from 'react'


interface Props {
  title:string,
  subtitle?:string,
  content:ReactNode
  actions?:ReactNode,
}

// Server rendering the card component entirely. 
const FilterCard = ({title, subtitle , content}:Props) => {
    return (
        <div className='h-full min-w-[50%] max-w-[400px]'>
            <Card className='rounded-cards'>
                <CardHeader title={title} titleTypographyProps={{
                   className:'text-xl'
                }} subheader='' subheaderTypographyProps={{
                    className:'text-sm'
                }} className='text-center'/>
                <CardContent className='pt-0'>
                   {content}
                </CardContent>
                {/* <CardActions>
                    {actions}
                </CardActions> */}
            </Card>
        </div>
    )
}

export default FilterCard
