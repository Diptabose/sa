import Image from "next/image";

const LoginSide = () => {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center h-2/5 sm:h-full">
      <Image src="/logo.svg" alt="logo" width={200} height={50} />
      <div className="flex gap-2 items-center flex-wrap justify-center">
        <Image src="/arrow_up.svg" alt="up_red" width={48} height={48} />
        <span className="text-center">Sentiment Analysis Application</span>
        <Image src="/arrow_down.svg" alt="down_green" width={48} height={48} />
      </div>
    </div>
  );
};

export default LoginSide;
