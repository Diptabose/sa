
import { Params } from '@/types/params';
import  Card from '@mui/material/Card';
import Link from 'next/link';
import { getRole } from '@/helper/pagefunctions';
import { Button } from '@mui/material';




const RolesView = async ({ searchParams }: Params<unknown>) => {

    const role_id = searchParams["id"];
    const roles_data = await getRole(role_id as string);

    if (!roles_data) {
        return <>No role found</>
    }

    return (
        
        <div className='h-full overflow-hidden px-2'>
            <div className='py-2 flex items-center justify-between'>
                <span className='text-xl font-medium'>Role</span>
                <Button LinkComponent={Link} variant='contained' href={`/sentimentAnalysis/settings/roles/create_role?id=${roles_data._id}`}>Edit</Button>
                
            </div>
            <div className='h-full overflow-y-auto p-4' >
                <Card sx={{ minWidth: 120, maxWidth: 600 }} className='p-4 rounded-cards'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='font-medium'>Role</td>
                                <td className='pl-2'>:</td>
                                <td className='pl-2'>{roles_data?.role ?? "Unknown"}</td>
                            </tr>
                            <tr>
                                <td className='font-medium'>Status</td>
                                <td className='pl-2'>:</td>
                                <td className='pl-2'>{roles_data?.active ? 'Active' : 'Inactive'}</td>
                            </tr>
                        </tbody>

                    </table>
                </Card>
            </div>
        </div>
    )
}

export default RolesView;
