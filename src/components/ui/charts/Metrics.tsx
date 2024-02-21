"use client"
import React, { useEffect, useState } from 'react'
import MetricsFilters from '../filters/metrics/Filters';
import { useFormik } from 'formik';
import { metricsSchema } from '@/constants/form/yup/constants';
import * as API from '@/utils/app/api'
import { dataFormatter_V2, getInitialValues, labelFormatter, toggleLabelFormatter } from './ChartConfig';
import { Metrics, MetricsValues, Mode } from '@/types/formik';
import { useSearchParams } from 'next/navigation';
import BarChart from './BarChart';




interface Props {
  initData: Metrics
}


const Metrics = ({ initData }: Props) => {



  const [data, setData] = useState(initData);
  const params = useSearchParams();

  const metricsFormik = useFormik<MetricsValues>({
    initialValues: getInitialValues((params.get('mode') ?? 'monthly') as Mode),
    validationSchema: metricsSchema,
    validateOnChange: true,
    onSubmit: async (values) => {

      try {
        const response = await API.GetMethod('metrics', {
          params: {
            mode: values.mode,
            from: values.start_date,
            to: values.end_date
          }
        });
        setData(response.data);
      } catch (err) {
        console.log("Some error occured", err);
      }

    }
  });


  useEffect(() => {
    if (metricsFormik.dirty) {
      metricsFormik.handleSubmit();
    }
  }, [metricsFormik.values]);



  const mode = (metricsFormik.values.mode ?? 'monthly') as Mode

  const graph_labels_2 = toggleLabelFormatter();

  const { datasets, ymax: ymax_1 } = dataFormatter_V2(data.email_sentiment_data, ['Positive', 'Negative', 'Neutral']);
  const { datasets: dataset_2, ymax: ymax_2 } = dataFormatter_V2(data.email_sentiment_change_data, graph_labels_2);

  const graph_one = {
    labels: labelFormatter(data.email_sentiment_data, mode),
    datasets: datasets
  }

  const graph_two = {
    labels: labelFormatter(data.email_sentiment_change_data, mode),
    datasets: dataset_2
  }

  return (
    <div className='w-full flex flex-col h-full'>
      <div className='py-2 px-2 flex-1'>
        <h2 className='font-medium text-xl mb-2' >Metrics</h2>
        <MetricsFilters formikProp={metricsFormik} mode={mode} />
      </div>

   
        <div className='h-full flex-[11] overflow-y-auto p-2 flex flex-col gap-y-16'>
          {
            data.email_sentiment_data.length === 0 ? <div className='font-semibold text-xl w-full h-[400px] flex items-center justify-center'>
              No data to display
            </div> : <BarChart graphData={graph_one} options={
              {
                title: "Sentiment Comparision",
                ymax: ymax_1,
                responsive: true,
                maintainAspectRatio: false
              }
            } />
          }


          {
            data.email_sentiment_change_data.length === 0 ? <div className='font-semibold text-xl w-full h-[400px] flex items-center justify-center'>
              No data to display
            </div> : <BarChart graphData={graph_two}
              axisLength={500}
              options={
                {
                  title: "Changed Sentiment Comparision",
                  ymax: ymax_2,
                  responsive: true,
                  maintainAspectRatio: false
                }} />
          }

        </div>
    </div>
  )
}

export default Metrics;



