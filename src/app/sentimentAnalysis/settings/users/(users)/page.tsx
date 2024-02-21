import TableLoader from "@/components/atomic/loader/TableLoader";
import Users from "@/components/ui/users/Users";
import { getUsers } from "@/helper/pagefunctions";

const UsersPage = async () => {
  const data = await getUsers();
  const totalCount = data?.totalCount;
  const users = data?.users;
  return <Users users={users}  totalCount={totalCount} />;
};

export default UsersPage;
