
interface Prop{
  color:string,
  labelText:string
}

const LabelComponent = ({color , labelText}:Prop)=>{
    return (
        <div className='flex gap-1 items-center justify-center'>
           <div style={{backgroundColor:color , width:"12px" , height:"12px"}}></div>
           <div style={{fontSize:"14px", fontWeight:450}}>{labelText}</div>
        </div>
    )
}
interface Props{
  colors:string[],
  labels:string[],
  title:string
}

const CustomTitleLabel = ({ colors , labels, title}:Props) => {
  return (
    <div className='flex flex-col w-full items-center gap-2'>
         <span style={{fontWeight:400 , color:"GrayText" , fontSize:"18px" , lineHeight:"24px"}}>{title}</span>
         <div className='grid grid-cols-3 w-2/5'>
            {
                labels.map((label:string , index:number)=>{
                    return <LabelComponent key={index} color={colors[index]} labelText={label}/>
                })
            }
         </div>
    </div>
  )
}

export default CustomTitleLabel
