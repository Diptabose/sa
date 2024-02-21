import { getRolesData } from "@/helper/pagefunctions";
import CreateUser from "@/components/ui/user/CreateUser";


const page = async () => {
  const roles = await getRolesData();
  return (
     <CreateUser  initValues={{
        name:'',
        role:'',
        username:'',
        active:true
     }} mode="create" rolesData={roles} isFirstTimeConfiguring />
  )
}

export default page




