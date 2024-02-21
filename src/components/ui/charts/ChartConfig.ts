import { Mode } from "@/types/formik";
import { startOfWeek , endOfWeek , format , subDays , subMonths , subWeeks  } from 'date-fns';


const Mapper: Record<Mode, (date: Date | number, amount: number) => Date> = {
    'daily': subDays,
    'monthly': subMonths,
    'weekly': subWeeks
  }

export const test_data = {
    "email_sentiment_data":
        [
            { "data": { "Positive": 1 }, "monthly": 10, "start_date": "2023-10-20T03:47:18.000Z" },
            { "data": { "Neutral": 1 }, "monthly": 11, "start_date": "2023-11-30T10:39:14.000Z" },
            { "data": { "Neutral": 1099, "Negative": 415, "Positive": 158 }, "monthly": 12, "start_date": "2023-12-02T09:34:42.000Z" },
            { "data": { "Positive": 1 }, "monthly": 10, "start_date": "2023-10-20T03:47:18.000Z" },
            { "data": { "Neutral": 1 }, "monthly": 11, "start_date": "2023-11-30T10:39:14.000Z" },
            { "data": { "Neutral": 1099, "Negative": 415, "Positive": 158 }, "monthly": 12, "start_date": "2023-12-02T09:34:42.000Z" },
            { "data": { "Positive": 1 }, "monthly": 10, "start_date": "2023-10-20T03:47:18.000Z" },
            { "data": { "Neutral": 1 }, "monthly": 11, "start_date": "2023-11-30T10:39:14.000Z" },
            { "data": { "Neutral": 1099, "Negative": 415, "Positive": 158 }, "monthly": 12, "start_date": "2023-12-02T09:34:42.000Z" },
            { "data": { "Positive": 1 }, "monthly": 10, "start_date": "2023-10-20T03:47:18.000Z" },
            { "data": { "Neutral": 1 }, "monthly": 11, "start_date": "2023-11-30T10:39:14.000Z" },
            { "data": { "Neutral": 1099, "Negative": 415, "Positive": 158 }, "monthly": 12, "start_date": "2023-12-02T09:34:42.000Z" }
        ],

    "email_sentiment_change_data":
        [
            { "data": { "Positive to Negative": 1 }, "monthly": 10, "start_date": "2023-10-20T03:47:18.000Z" }
        ]
}

export const COLORS_V2 = ['rgb(110,231,183)', 'rgb(248,113,113)', 'rgb(251,146,60)', 'rgb(56,189,248)', 'rgb(147,51,234)', 'rgb(124,58,237)'];







/**
 * 
 * @param data The data should be an array. Each array item is an object having the field in lookFor
 * @param lookFor The lookFor array contains the fields to look for in the objects present in array
 * @returns Returns  a dataset object with label, color , data and barThickness
 */


export function dataFormatter_V2(graphData:any , lookFor:string[]){

    const result : number[][]= [];
    lookFor.forEach((lookup)=>{
        result.push([]);
    })

    let max=0;

    graphData.forEach((sent_data:any)=>{
        const { data } = sent_data;
        lookFor.forEach((lookup , index)=>{
          if(lookup in data){
             result[index].push(data[lookup]);
             max = Math.max(max , data[lookup])
          }
          else{
            result[index].push(0);
          }
        });
    })

    const datasets = result.map((data: number[], index: number) => {
        return {
            label: lookFor[index],
            data: data.sort((a,b)=>b-a),
            backgroundColor: COLORS_V2[index],
            barThickness:50
        }
    });
    return {datasets , ymax:Math.floor(max*1.5)} ;
}

// export function dataFormatter(email_sentiment_data: any) {
//     const lookFor = ['Positive', 'Negative', 'Neutral'];

//     const resultData: any = [];

//     lookFor.forEach((look) => {
//         resultData.push([]);
//     })

//     let max = 0;
//     email_sentiment_data.forEach((sent_data: any) => {
//         const { data } = sent_data;
//         lookFor.forEach((look, index) => {
//             if (look in data) {
//                 resultData[index].push(data[look]);
//                 max = Math.max(max , data[look])
//             } else {
//                 resultData[index].push(0)
//             }
//         })
//     });



//     const datasets = resultData.map((data: any, index: number) => {
//         return {
//             label: lookFor[index],
//             data,
//             backgroundColor: COLORS_V2[index],
//             barThickness:50
//         }
//     });

//     return {datasets , ymax:Math.floor(max*1.5)} ;

// }

export function toggleFormatter(details: any) {
    let max = 0;
    details.forEach((det:any)=>{
         max= Math.max(det.count);
    })
    const detail = details.map((det: any, index: number) => {
        return {
            label: det.label,
            data: [det.count],
            backgroundColor: COLORS_V2[index],
            barThickness:40
        }
    })
    return { detail, ymax:Math.floor(max*1.5)  } ;
}

export function toggleLabelFormatter() {
    const lookFor = ['Positive', 'Negative', 'Neutral'];

    const labels = [];
    for (const look of lookFor) {
        for (const look_1 of lookFor) {
            if (look === look_1) {
                continue;
            }
            labels.push(`${look} to ${look_1}`);
        }
    }

    return labels;
}



export function labelFormatter(details: any , mode:Mode) {
    const labels = details.map((data: any) => {
        const date = new Date(data.start_date);
        if(mode==='monthly'){
            const month = date.toLocaleString('default', { month: 'long' });
            return month;
        }
        else if(mode==='weekly'){
            const start_date = format(startOfWeek(date), 'EEE MMM dd, yyyy');
            const end_date = format(endOfWeek(date), 'EEE MMM dd, yyyy');
            return start_date +" to "+end_date;
        }
        else if(mode==='daily'){
            return format(date , 'EEE dd')
        }
    });

    return labels;
}



export const generateOptions = (ymax:number, title:string, responsive = true, maintainAspectRatio = true) => {

    const options = {
        responsive,
        maintainAspectRatio,
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'top',
                font: {
                    size: 12,
                },
            },
            legend: {
                position: 'top',
                align: "center",
                labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                },
                display: false,
            },
            title: {
                display: false,
                text: title,
            },
        },
        scales: {

            x: {
                ticks: {
                    callback: function (val:string, index:number):string {
                        // @ts-ignore the function getLabelValue is from ChartJS.
                        const label = this.getLabelForValue(val);
                        return label.length < 25 ? label : label.slice(0, 18) + '...'
                    },
                }
            },

            y: {
                beginAtZero: true,
                // max: ymax
            },

        },
    }
    return options as any;
}


export function getInitialValues(mode: Mode) {
    const op = Mapper[mode];
    return {
      start_date: op(new Date(), 10),
      end_date: new Date(),
      mode
    }
  }
