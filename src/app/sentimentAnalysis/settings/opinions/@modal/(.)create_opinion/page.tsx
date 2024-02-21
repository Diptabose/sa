import CreateOpinion from "@/components/ui/forms/CreateOpinion";
import { getOneOpinion } from "@/helper/pagefunctions";
import { Opinion } from "@/types/email";
import { Params } from "@/types/params";
import { Mode } from "@/types/params";
import React from "react";

const InterceptedOpinion = async ({ params, searchParams }: Params<unknown>) => {
  let mode: Mode = "create";
  let initialValues: Opinion = {
    name: "",
    notes: "",
    can_delete:true
  };

  if ("id" in searchParams) {
    mode = "edit";
    initialValues = await getOneOpinion(searchParams["id"] as string);
  }
  
  return <CreateOpinion mode={mode} initialValues={initialValues} />;
};

export default InterceptedOpinion;
