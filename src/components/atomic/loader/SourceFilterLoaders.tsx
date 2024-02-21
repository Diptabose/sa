import React from "react";
import { SASkeleton } from "./HomeLoader";
import Card from "@mui/material/Card";

const RadioSkeleton = () => {
  return (
    <div className="flex items-center gap-small">
      <SASkeleton
        variant="rounded"
        height={30}
        width={30}
        className="rounded-full"
      />
      <SASkeleton height={30} width={50} />
    </div>
  );
};

const SourceFilterLoaders = () => {
  return (
    <Card className="w-[400px] flex flex-col p-4 gap-small">
      <div className="self-center p-4">
        <SASkeleton height={30} width={50} />
      </div>
      <div className="flex items-center gap-small">
        <RadioSkeleton />
        <RadioSkeleton />
      </div>
      <SASkeleton variant="rectangular" className="rounded-md" height={50} />
      <div className="self-end">
        <SASkeleton variant="rectangular" height={30} width={70} className="rounded-md" />
      </div>
    </Card>
  );
};

export default SourceFilterLoaders;
