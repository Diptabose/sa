import { CardActions, CardContent, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { SASkeleton } from "./HomeLoader";

const ConfigLoader = () => {
  return (
    <Card className="w-[400px] flex flex-col gap-small">
      <div className="p-4 self-center">
        <SASkeleton variant="text" width={120} />
      </div>
      <CardContent className="flex flex-col gap-small">
        <SASkeleton variant="rectangular" className="rounded-md" height={50} />
        <SASkeleton variant="rectangular" className="rounded-md" height={50} />
        <SASkeleton variant="rectangular" className="rounded-md" height={50} />
        <SASkeleton variant="rectangular" className="rounded-md" height={50} />
      </CardContent>
      <div className="p-4 self-end">
        <SASkeleton
          variant="rectangular"
          height={30}
          width={70}
          className="rounded-md self-end"
        />
      </div>
    </Card>
  );
};

export default ConfigLoader;
