import React from "react";
import { Params } from "@/types/params";
import { Mode } from "@/types/params";
import { getUser } from "@/helper/pagefunctions";
import { getRolesData } from "@/helper/pagefunctions";
import CreateUser from "@/components/ui/user/CreateUser";

const CreateUserPage = async ({ searchParams }: Params<unknown>) => {
  let mode: Mode = "create";
  const user_id = searchParams["id"];
  const apiCallArray = [];

  let initialValues = {
    name: "",
    username: "",
    role: "",
    active:true,
  };

  let rolesData = [];

  if (user_id) {
    mode = "edit";
    apiCallArray.push(getUser(user_id as string));
  }
  apiCallArray.push(getRolesData());
  let promisedData;
  try {
    promisedData = await Promise.all(apiCallArray);
  } catch (err) {
    console.log(err);
    promisedData = null;
  }

  if (!promisedData) {
    return <>Error occured</>;
  }

  if (promisedData.length === 2) {
    const formValues = promisedData[0];
    const { name, username, _id, active, userRole, role_id } = formValues;
    initialValues = {
      name,
      username,
      role: role_id ?? "",
      active
    };
    rolesData = promisedData[1] ?? [];
  } else {
    rolesData = promisedData[0] ?? [];
  }

  return (
    <CreateUser mode={mode} initValues={initialValues} rolesData={rolesData} />
  );
};

export default CreateUserPage;
