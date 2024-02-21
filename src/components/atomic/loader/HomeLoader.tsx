import React from "react";
import Skeleton, { SkeletonOwnProps } from "@mui/material/Skeleton";
import { twMerge } from "tailwind-merge";

interface Props extends SkeletonOwnProps {
  className?: string;
}

export const SASkeleton = ({ className, ...attr }: Props) => {
  return (
    <Skeleton
      {...attr}
      animation="wave"
      className={twMerge("bg-container-brand-lite", className)}
    />
  );
};

export const EmailCardSkeleton = () => {
  return (
    <div className="flex flex-col px-2 py-2 w-[300px]">
      <SASkeleton animation="wave" height={16} className="w-full"></SASkeleton>
      <SASkeleton animation="wave" height={40} className="w-1/3"></SASkeleton>
      <SASkeleton animation="wave" height={16} className="w-full"></SASkeleton>
      <SASkeleton animation="wave" height={16} className="w-full"></SASkeleton>
    </div>
  );
};

export const EmailBodySkeleton = () => {
  return (
    <div className="flex flex-col w-full px-2 py-2 h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <SASkeleton
            animation="wave"
            height={30}
            className="w-1/2"
          ></SASkeleton>
          <SASkeleton
            animation="wave"
            height={30}
            className="w-1/4"
          ></SASkeleton>
        </div>
        <SASkeleton
          animation="wave"
          height={20}
          className="w-1/2"
        ></SASkeleton>
        <SASkeleton
          animation="wave"
          height={20}
          className="w-1/2"
        ></SASkeleton>
      </div>
     <SASkeleton className="h-full" variant="rectangular" />
    </div>
  );
};

export const EmailActionsSkeleton = () => {
  return (
    <div className="px-2 h-full flex flex-col gap-small w-[300px]">
      <SASkeleton height={100} variant="rectangular" className="w-full" />
      <SASkeleton height={100} variant="rectangular" className="w-full" />
      <SASkeleton height={100} variant="rectangular" className="w-full" />
      <SASkeleton height={100} variant="rectangular" className="w-full" />
      <SASkeleton height={100} variant="rectangular" className="w-full" />
    </div>
  );
};

const HomeLoader = () => {
  return (
    <div className="w-full flex">
      <div className="h-full">
        {Array.from({ length: 4 } , (_, i) => i + 1).map((index) => {
          return <EmailCardSkeleton key={index} />;
        })}
      </div>
      <EmailBodySkeleton />
      <div>
        <EmailActionsSkeleton />
      </div>
    </div>
  );
};

export default HomeLoader;
