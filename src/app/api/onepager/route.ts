
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers';
import { verify, sign } from 'jsonwebtoken';
import { CitPayload } from '@/types/email';
import { validateJWT } from '@/app/server_actions/serveronly';




// export async function GET(req: NextRequest) {
//    revalidatePath('http://localhost:6001/sentimentAnalysis/settings/users', 'page');
//     return NextResponse.json({ revalidated: true, now: Date.now() })
// }


const refererCheck = (referer: string) => {

    return true;
    // console.log("The referer is " , referer)
    // if (!referer || referer.length === 0) {
    //     return false;
    // }
    // const pattern = /cit|localhost|desknotify/;
    // return pattern.test(referer);
}








export async function GET(req: NextRequest) {
    const referer = headers().get('referer') as string;
    const token = req.nextUrl.searchParams.get('token') as string;
    const tokenData = validateJWT(token);

    console.log("The token data is ", tokenData);

    if (refererCheck(referer) && tokenData.success) {
        if (tokenData?.data?.email_id && tokenData.data.emp_id) {
            return NextResponse.redirect(`http://localhost:6001/onepager?token=${token}`)
        }
    }

    console.log("Moving away here");
    return NextResponse.redirect(`http://localhost:6001/login`);
}
