import React from 'react'
import CreateOpinion from '@/components/ui/forms/CreateOpinion'
import { getOneOpinion } from '@/helper/pagefunctions';
import { Params } from '@/types/params';
import { Opinion } from '@/types/email';
import { Mode } from "@/types/params";


const CreateOpinionPage = async ({ params, searchParams }: Params<unknown>) => {

  
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

  return (
   <CreateOpinion mode={mode} initialValues={initialValues} />
  )
}

export default CreateOpinionPage;
