import { CitPayload } from "@/types/email";
import { verify } from "jsonwebtoken";

const CIT_SECRET = '827dd33f61ab36257432b4c353e7e4f3674aed74b0b';

export function validateJWT(token: string) {
    try {
        const payload = verify(token, CIT_SECRET) as CitPayload;
        return { success: true, data: payload };
    }
    catch (err) {
        return { success: false, data: null };
    }
}