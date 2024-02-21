import Metrics from '@/components/ui/charts/Metrics';
import NotFound from '@/components/ui/http/NotFound';
import { Params } from '@/types/params';
import React from 'react'
import { getMetrics } from '@/helper/pagefunctions';


const DashboardPage = async ({ searchParams }: Params<unknown>) => {
   const metrics_data = await getMetrics(searchParams['mode'] as string);
   if (!metrics_data) {
      return <NotFound statusCode={404} title='Requested resource not found' />
   }
   return (
      <Metrics initData={metrics_data} />
   )
}

export default DashboardPage;
