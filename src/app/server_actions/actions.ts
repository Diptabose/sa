"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
// Not using this file anymore, due to dependency on formik
import { redirect } from "next/navigation"
import nextHttp from '@/utils/http';
import { REMOTE_SERVER_URL } from "@/constants/general/constants";


export async function revalidateRoute(revalidPath: string, redirectTo?: string) {
    revalidatePath(revalidPath, 'page');
    if (redirectTo) {
        redirect(redirectTo);
    }

}

export async function removeCookies() {
    const cookiesArray = cookies().getAll();
    for (const cookie of cookiesArray) {
        cookies().delete(cookie);
    }
}

export async function logout() {
    const cookiesArray = cookies().getAll();
    for (const cookie of cookiesArray) {
        cookies().delete(cookie);
    }
    redirect('/login');
}


