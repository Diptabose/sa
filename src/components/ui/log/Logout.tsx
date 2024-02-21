"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { logout } from "@/app/server_actions/actions";

interface Props {
  label: string;
}

const Logout = ({ label }: Props) => {
  const router = useRouter();

  return (
    <button
      className="flex-none hover:bg-white hover:text-black py-1 transition-[background-color,color] duration-500 rounded-md px-2 md:text-left"
      onClick={async () => {
        await logout();
        router.push("/login"); // This push is needed.Because the api is not called from a Link. Its user triggered
      }}
    >
      Logout
    </button>

    // <Link href='/api/logout' className='py-2 px-4 text-white'> {label} </Link>
  );
};

export default Logout;
