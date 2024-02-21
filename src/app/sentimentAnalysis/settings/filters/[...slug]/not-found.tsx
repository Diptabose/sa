import React from 'react'
import NotFound from '@/components/ui/http/NotFound'

const NotFoundPage = () => {
  return (
    <NotFound statusCode={404} title='Requested resource not found'/>
  )
}

export default NotFoundPage;
