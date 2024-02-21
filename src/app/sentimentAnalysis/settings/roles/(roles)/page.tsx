import { Suspense } from "react";
import Roles from "../Roles";
import Loader from "../../loading";
import { getRoles } from "@/helper/pagefunctions";

const RolesPage = async () => {
  const data = await getRoles();
  const totalCount = data?.totalCount;
  const roles = data?.roles;
  return (
    <Suspense fallback={<Loader />}>
      <Roles rolesData={roles} totalCount={totalCount} />
    </Suspense>
  );
};

export default RolesPage;
