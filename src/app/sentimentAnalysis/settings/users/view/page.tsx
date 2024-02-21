import { Params } from "@/types/params";
import  Card  from "@mui/material/Card";
import Link from "next/link";
import { getUser } from "@/helper/pagefunctions";





const UserView = async ({ searchParams }: Params<unknown>) => {

    const role_id = searchParams["id"];
    const roles_data = await getUser(role_id as string);
    if (!roles_data) {
        return <> Oops, no user found</>
    }

    return (

        <div className='h-full overflow-hidden px-2'>
            <div className='py-2 flex items-center justify-between'>
                <span className='text-xl font-medium'>User</span>
                <Link className='bg-[#1976d2] px-4 py-2 text-white rounded-md' href={`/sentimentAnalysis/settings/users/create_user?id=${roles_data._id}`} >
                    Edit
                </Link>
            </div>
            <div className='h-full overflow-y-auto p-4' >
                <Card sx={{ minWidth: 120, maxWidth: 600 }} className='p-4 rounded-cards'>
                    <table>
                        <tbody>
                            <tr>
                                <td className="font-medium">Name</td>
                                <td className="pl-2">:</td>
                                <td className="pl-2">{roles_data.name ?? "Unknown"}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Email</td>
                                <td className="pl-2">:</td>
                                <td className="pl-2">{roles_data.username ?? 'Unknown'}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Status</td>
                                <td className="pl-2">:</td>
                                <td className="pl-2">{roles_data.active ? 'Active' : 'Inactive'}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Role</td>
                                <td className="pl-2">:</td>
                                <td className="pl-2">{roles_data.role ?? "Unknown"}</td>
                            </tr>
                            <tr>
                                <td className="font-medium">Role(status)</td>
                                <td className="pl-2">:</td>
                                <td className="pl-2">{roles_data.role_active ? 'Active' : 'Inactive'}</td>
                            </tr>
                        </tbody>

                    </table>
                </Card>
            </div>
        </div>
    )
}

export default UserView;


