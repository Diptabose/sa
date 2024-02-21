import CustomTitleLabel from "./CustomLabel";
import { Card } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { COLORS_V2 } from "./ChartConfig";
import useDeviceProperties from '@/utils/app/useDeviceProperties'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


interface Dataset {
  label: string,
  data: number[],
  backgroundColor?: string
}

interface CustomChartOptions {
  responsive?:boolean,
  maintainAspectRatio?:boolean,
  title:string,
  ymax:number
}

interface Props {
  options: CustomChartOptions,
  graphData: {
    labels: string[],
    datasets: Dataset[]
  },
  axisLength?:number
}




/**
 * 
 * @param options The chart options required to show title , responsiveness, aspect rato etc.
 * @param graphData The data to be shown in chart. It is a object having datasets and labels.
 * @example maintainAspectRation can be fall to introduce scroll into graph
 * 
 */
const BarChart = ({ options, graphData , axisLength=200}: Props) => {

  const labels = graphData.datasets.map((dataset)=>{
    return dataset.label;
  })


  const { ymax , title , responsive , maintainAspectRatio } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const cal_width = (axisLength * graphData.datasets[0].data.length);
  const [width, setWidth] = useState<string>(cal_width + "px");
 const {width:dWidth} = useDeviceProperties();

  /**
   * This useEffect calculates the totol width of the parent container. 
   * Based on the dataset size and parent div size, if dataset fits within the parent div then it sets the parent width size
   * Else it sets the size to axisLength*datsetSize
   */
  useEffect(() => {
    if (ref.current) {
      const parentDiv = ref.current;
      const { width } = parentDiv.getBoundingClientRect();
      const dataSetLength = graphData.datasets[0].data.length
      const avaliableInScreen = Math.floor(width / axisLength);
      if (dataSetLength <= avaliableInScreen) {
        setWidth(width + "px");
      } else {  
        const cal_width = (axisLength * dataSetLength);
        setWidth(cal_width + "px");
      }
    }
  }, [dWidth])


  return (
    <div>
      <Card className='flex flex-1 flex-col' style={{ height: "auto", width: "auto" }} sx={{
        "&.secondary": {
          borderRadius: "24px"
        }
      }}>
        <div className="w-full">
        <CustomTitleLabel colors={COLORS_V2} labels={labels} title={title} />
          <div className="overflow-x-auto" ref={ref} >
            <div style={{
              width,
              height: "350px"
            }} className="">
              <Bar options={{
                responsive,
                maintainAspectRatio,
                plugins: {
                  datalabels: {
                    anchor: 'end',
                    align: 'top',
                    padding: 12,
                    font: {
                      size: 12,
                    },
                  },
                  title: {
                    text: title,
                    display: false
                  },
                  legend:{
                    display:false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: ymax
                  }
                }
              }} data={graphData} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BarChart
