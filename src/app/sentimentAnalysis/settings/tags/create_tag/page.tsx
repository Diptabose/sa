import CreateTag from '@/components/ui/forms/CreateTag';
import { getOneTag } from '@/helper/pagefunctions';
import { Tags } from '@/types/email';
import { Params } from '@/types/params';
import { Mode } from "@/types/params";
import React from 'react'

const CreateTagPage = async ({ params, searchParams }: Params<string>) => {
  let mode: Mode = "create";
  let initialValues : Tags = {
    color: "",
    name: "",
    subtags: [],
    notes: "",
    can_delete:true
  };

  if ("id" in searchParams) {
    mode = "edit";
    initialValues = await getOneTag(searchParams["id"] as string);
  }

 
  // if(!("subtags" in initialValues )||!initialValues.subtags || initialValues.subtags.length ===0 ){
  //   initialValues.subtags =  [{name:""} , {name:""}];
  // }

  // Need to get the data. if id is present else send the default intial values.
  return <CreateTag mode={mode} initialValues={initialValues}/>;
}

export default CreateTagPage;
