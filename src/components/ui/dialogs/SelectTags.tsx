"use client";
import { useContext, useMemo } from "react";
import GenericDialog from "@/components/atomic/dialogs/GenericDialog";
import HomeContext, { HomeContextProps } from "@/store/contexts/home.context";
import useMediaQuery from "@mui/material/useMediaQuery";

import SelectTagsForm from "../forms/SelectTagsForm";

const SelectTags = () => {
  const fullScreen = useMediaQuery("(max-width:300px)");

  const { state, dispatch: homeDispatch } =
    useContext<HomeContextProps>(HomeContext);

    const {openSelectTagDialog} = state;

  const Title = useMemo(() => {
    return <div className="text-center text-xl">Select Tags</div>;
  }, []);

  return (
    <GenericDialog
      open={openSelectTagDialog}
      dialogProps={{
        onClose: (event, reason) => {
          homeDispatch({ field: "openSelectTagDialog", value: false });
        },
        className: "tagsform flex flex-col",
        fullScreen,
      }}
      title={Title}
      content={
        <SelectTagsForm
          fullScreen={fullScreen}
        />
      }
      contentProps={{
        className: `flex flex-col gap-2 ${
          fullScreen ? "items-center justify-center" : ""
        }`,
      }}
    />
  );
};

export default SelectTags;
