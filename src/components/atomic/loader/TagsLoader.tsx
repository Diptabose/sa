import React from "react";
import { SASkeleton } from "./HomeLoader";
import Card from "@mui/material/Card";
import { CardContent, CardHeader } from "@mui/material";

export const Heading = () => {
  return (
    <div className="flex justify-between w-full p-2">
      <SASkeleton  width={120} />
      <SASkeleton
        variant="rectangular"
        height={30}
        width={70}
        className="rounded-md"
      />
    </div>
  );
};

const TagOpinion = () => {
  return (
    <Card className="w-[400px]">
      <div className="flex justify-between px-4">
        <SASkeleton variant="text" width={120}  />
        <div className="flex gap-small">
          <SASkeleton className="rounded-full h-10 w-10"/>
          <SASkeleton className="rounded-full h-10 w-10" />
        </div>
      </div>
      <CardContent className="flex flex-col gap-small">
        <div className="flex flex-col gap-small">
          <SASkeleton variant="text" width={120}  />
          <div className="flex gap-small">
            <SASkeleton
              variant="rectangular"
              height={20}
              width={50}
              className="rounded-md"
            />
            <SASkeleton
              variant="rectangular"
              height={20}
              width={50}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-small">
          <SASkeleton variant="text" width={120}  />
          <SASkeleton variant="text"  height={10} width={60} />
        </div>
        <div className="flex flex-col gap-small">
          <SASkeleton variant="text" width={120}  />
          <SASkeleton variant="text" height={10} />
          <SASkeleton variant="text" height={10} />
        </div>
      </CardContent>
    </Card>
  );
};

const TagsLoader = () => {
  return (
    <div className="h-full w-full">
      <Heading />
      <div className="h-full p-2">
        <TagOpinion />
      </div>
    </div>
  );
};

export default TagsLoader;
