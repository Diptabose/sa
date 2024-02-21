interface Props {
    statusCode:number,
    title?:string,
}

const statusCodeMap: Record<number , string> = {
   404:"Requested resource not found",
   500:'Bad request'
}


const NotFound = ({statusCode , title}:Props) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex font-normal leading-[49px] gap-x-4 items-center '>
      <h1 className='border-r-[1px] border-black font-medium text-2xl pr-4'>{statusCode}</h1>
      <p>{title ?? statusCodeMap[statusCode]}</p>
      </div>
    </div>
  )


}

export default NotFound;
