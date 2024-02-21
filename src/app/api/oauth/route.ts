import { REMOTE_SERVER_URL } from '@/constants/general/constants';
import { authTokenName, tempTokenName } from '@/constants/general/constants'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'




export async function GET(req: NextRequest) {


    // Get the token here and use the email to verify at the backend and get new token with user details.

   
    
    // cookies().delete(tempTokenName);
    // const microsoft_auth_token = req.headers.get('token')

    // try{
    //     const tokenData = await fetch(REMOTE_SERVER_URL+'/login', {
    //         method:'POST',
    //         body:JSON.stringify({username:req.headers.get('username')}),
    //         headers:{
    //             Authoriztion:microsoft_auth_token ?? '',
    //             "Content-type":"application/json"
    //         }
    //     });

    //     const parsed_token_data = await tokenData.json();
    //     if(tokenData.ok){
    //         const token = parsed_token_data.token;
    //         const timeSinceEpoch = new Date();
    //         console.log("The parsed token is " , parsed_token_data);
    //         cookies().set(authTokenName , token , {
    //             httpOnly: true,
    //             path: '/',
    //             secure: true,
    //             sameSite: 'none',
    //             maxAge:timeSinceEpoch.setFullYear(timeSinceEpoch.getFullYear() + 500)
    //         });
    //     }
    // }
    // catch(err){
    //      return NextResponse.redirect(new URL('/setup/create_user' , req.nextUrl.origin));
    // }

 //  return NextResponse.redirect(new URL('/sentimentAnalysis/home' , req.nextUrl.origin));

 return NextResponse.json({message:'You are in get route oauth'});
}


// export async function POST(request: NextRequest) {
//     try {
//         const resp = await new Response(request.body).json();
//         const response = await fetch(REMOTE_SERVER_URL+'/login', {
//             method: "POST",
//             body: JSON.stringify(resp),
//             headers: {
//                 "Content-type": "application/json",
//                 Authorization:`Bearer ${cookies().get('token')}`
//             },
//             credentials: 'include',
//             next: {
//                 revalidate: 0
//             }
//         })
//         const parsed_resp = await response.json();
//         console.log("The parsed reso is" , parsed_resp);
//         if (parsed_resp.success) {

//             const timeSinceEpoch = new Date();
//             // Chrome will restrict the cookie to be 400 days. Or 13 months at most.
//             // May need a renewal system . Or login again.
//             cookies().set('token', parsed_resp.token, {
//                 httpOnly: true,
//                 path: '/',
//                 secure: true,
//                 sameSite: 'strict',
//                 expires:timeSinceEpoch.setFullYear(timeSinceEpoch.getFullYear() + 500),
//                 maxAge:timeSinceEpoch.setFullYear(timeSinceEpoch.getFullYear() + 500)
//             });
//         }

//         return NextResponse.json(parsed_resp);
//     }
//     catch (err) {
//         console.log("Err", (err as Error).message)
//         return NextResponse.json({ success: false, message: "Internal server error" })
//     }
//}