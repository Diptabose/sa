"use client";
import GenericDialog from "@/components/atomic/dialogs/GenericDialog";
import SelectProjectForm from "../forms/SelectProjectsForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";


const Title = () => {
  return <div className="text-center text-xl">Identified Project</div>;
};

const SelectProject = () => {
  const fullScreen = useMediaQuery("(max-width:300px)");
  const { state , dispatch: homeDispatch } = useContext<HomeContextProps>(HomeContext);

  const {openSelectProjectDialog} = state;
  return (
    <GenericDialog
      title={<Title />}
      content={<SelectProjectForm />}
      open={openSelectProjectDialog}
      dialogProps={{
        onClose: () => {
          homeDispatch({ field: "openSelectProjectDialog", value: false });
        },
        className: "projects flex flex-col",
        fullScreen,
      }}
      contentProps={{
        className: `flex flex-col gap-small items-center justify-center pb-0`,
      }}
    />
  );
};

export default SelectProject;
