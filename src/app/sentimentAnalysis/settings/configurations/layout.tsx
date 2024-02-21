import React, { ReactNode } from "react";
import ConfigLoader from "./loading";

interface Props {
  db: ReactNode;
  azure: ReactNode;
}

const ConfigurationsLayout = ({ db, azure }: Props) => {
  return (
    <div
      className="flex items-center justify-evenly  gap-x-medium bg-surface-3 py-4 relative h-full
    "
    >
      <div>{db}</div>
      <div>{azure}</div>
    </div>
  );
};

export default ConfigurationsLayout;
