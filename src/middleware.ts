import { NextRequest, NextResponse } from "next/server";
import { authTokenName, tempTokenName } from "./constants/general/constants";
import { cookies, headers } from "next/headers";




const refererCheck = (referer: string) => {
    console.log("The referer is ", referer)
    if (!referer || referer.length === 0)
        return false;
    const pattern = /cit|localhost|desknotify/;
    return pattern.test(referer);
}

export async function middleware(req: NextRequest) {


    const origin = req.nextUrl.origin;
    const pathname = req.nextUrl.pathname;
    const hasTempToken = cookies().has(tempTokenName);
    const hasAuthToken = cookies().has(authTokenName);
    const hasToken = hasTempToken || hasAuthToken;
    const temptoken = cookies().get(tempTokenName);
    const authtoken = cookies().get(authTokenName);


    console.log("Checking middleware ", pathname);
    console.log("Has token ", hasTempToken, hasAuthToken);
    /*const x = temptoken && !await verifyJWT(temptoken.value);
    const y = authtoken && !await verifyJWT(authtoken.value);

    if (x || y) {
        console.log("Calling logout here");
        await fetch('http://localhost:6001/api/logout', {
            credentials:'include'
        });
        if (pathname.startsWith('/login')) {
            return null;
        }
        return NextResponse.redirect(new URL('/login', origin));
    }*/


    if (pathname === '/login' && !hasToken) {
        return null;
    }
    // Send user inside if already logged in and trying to access /login;
    if (pathname === '/login' && hasToken) {
        if (hasTempToken) {
            return NextResponse.redirect(new URL('/setup/dbconfig', origin));
        }
        if (!hasAuthToken) {
            return NextResponse.redirect(new URL('/login', origin));
        }

        console.log("Returning to home in login middleware" );
        return NextResponse.redirect(new URL('/sentimentAnalysis/home', origin));
    } else if (pathname.startsWith('/sentimentAnalysis')) {
        if (hasTempToken) {
            return NextResponse.redirect(new URL('/setup/dbconfig', origin));
        }
        if (!hasAuthToken) {
            return NextResponse.redirect(new URL('/login', origin));
        }
    } else if (pathname.startsWith('/setup')) {
        if (hasAuthToken) {
            console.log("Returning to home in setup middleware" );
            return NextResponse.redirect(new URL('/sentimentAnalysis/home', origin));
        }
        if (!hasTempToken) {
            return NextResponse.redirect(new URL('/login', origin));
        }
    }
    else if (pathname.startsWith('/onepager')) {
        // This route will not recieve cookies as it is redirect from CIT and cookies are set as Strict.
        // (Not recommended) Please use Lax cookies to allow any present user who also wants to be loggedin 
        const referer = headers().get('referer') as string;
        console.log("Referer in middleware is", referer)
        if (!refererCheck(referer)) {
            console.log("Returning to home in onepager middleware" );
            return NextResponse.redirect(new URL('/sentimentAnalysis/home', origin));
        }
    }
}


export const config = {
    matcher: ['/login/:path*', '/sentimentAnalysis/:path*', '/setup/:path*', '/onepager:path*'],
}


