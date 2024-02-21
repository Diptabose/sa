import { logout } from "@/app/server_actions/actions";

import { NextRequest } from "next/server";


export async function GET(req:NextRequest){
   await logout();
}

