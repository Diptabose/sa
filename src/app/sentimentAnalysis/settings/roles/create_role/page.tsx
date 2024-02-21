import { Mode } from "@/types/params";
import { Params } from "@/types/params";
import { cookies } from "next/headers";
import { REMOTE_SERVER_URL } from "@/constants/general/constants";
import nextHttp from "@/utils/http";
import CreateRoles from "@/components/ui/forms/CreateRoles";
import { RoleValues } from "@/types/formik";

// This will be a Server Component and , will reach searchParams.
// If search Params is null, then the mode will be creating, else editing.
const CreateRolePage = async ({ searchParams }: Params<unknown>) => {
  let mode: Mode = "create";
  let initValues = { role: "", active: true } as RoleValues;

  const role_id = searchParams["id"];

  const cooks = cookies().toString();
  if (role_id) {
    mode = "edit";
    try {
      const role_data = await nextHttp.get(
        `${REMOTE_SERVER_URL}/settings/roles/${role_id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Cookie: cooks,
            "Content-type": "application/json",
          },
          next: {
            revalidate: 0,
          },
        }
      );

      const parsed_role = await role_data?.json();
      const data = parsed_role.data;
      //  delete data._id;
      initValues = data;
    } catch (err) {
      console.log(err);
    }
  }

  return <CreateRoles mode={mode} initValues={initValues} />;
};

export default CreateRolePage;
