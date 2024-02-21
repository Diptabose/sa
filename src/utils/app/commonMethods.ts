import { CitPayload } from '@/types/email';
import { FilterParams } from '@/types/params';
import { verify } from 'jsonwebtoken';

export const isNullOrUndefined = (value: any) => {
    return (value == null || value == undefined || value == '')
}



// export async function verifyJWT(token: unknown) {
//     try {
//         const decoded_token = JSON.parse(
//         Buffer.from((token as string).split(".")[1], "base64").toString())
//         if (decoded_token && decoded_token.exp && decoded_token.exp! >= Math.floor(new Date().getTime() / 1000)) {
//             return true;
//         }
//         return false
//     }
//     catch (err) {
//         console.log("The error is", (err as Error).message);
//         return false;
//     }
// }

export function getClientFromEmail(email: string) {
    const client = email.match(/@([a-zA-Z0-9]+)/);
    if (client) {
        return client[1].toUpperCase();
    }
}

export function getQueryString(params?: FilterParams) {
    let queryString = '';
    if (params) {
        Object.keys(params)?.forEach((query) => {
            queryString += `${query}=${params[query]}&`;
        })
    }
    return queryString;
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
|| 'http://172.16.0.52:9003';
// || 'http://localhost:5000';
export const NEXT_API_BASE_URL = process.env.NEXT_PUBLIC_NEXT_API_BASE_URL 
|| 'http://172.16.0.52:9004';
// || 'http://localhost:6001';
export const PAGINATION_ROW_LABEL = "Rows per page:";
export const ROWS_PER_PAGE = [5, 10, 25, 50, 100]
export const DEFAULT_ROWS_PER_PAGE = 25;