"use client";
import { Button, Card } from "@mui/material";
import * as API from "@/utils/app/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { REMOTE_SERVER_URL } from "@/constants/general/constants";
import Image from "next/image";


interface APIResponse {
  success: boolean;
  message: string;
  data?: unknown;
  details?: string;
}

const Oauth = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSent = useRef<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(
    searchParams.has("code")
  );

  const onClick = () => {
    API.GetMethod("oauth/microsoft/login/getLoginUrl")
      .then((data) => {
        window.localStorage.setItem("pkce-challenge", data.verifier_jwt);
        router.push(data.login_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function performLogin() {
    try {
      const responseOauth = await axios.get(
        REMOTE_SERVER_URL + "/oauth/microsoft/login/getAccessToken",
        {
          withCredentials: true,
          headers: {
            Authorization: searchParams.get("code"),
            "code-verifier":
              window.localStorage.getItem("pkce-challenge") ?? "",
          },
        }
      );
      const responseLogin = await API.PostMethod(
        "login",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: responseOauth.data.data.user_details,
          },
        }
      );

      if (responseLogin?.success) {
        setTimeout(() => {
         window.location.replace("http://localhost:6001/sentimentAnalysis/home");
          // router.replace("/sentimentAnalysis/home");
        }, 5000);
      }
    } catch (err) {
      setRedirecting(false);
      const errData = (err as AxiosError).response?.data as APIResponse;
      setErrorMessage(errData?.message);
    }
  }

  useEffect(() => {
    if (searchParams.has("code") && !isSent.current) {
      isSent.current = true;
      performLogin();
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center ">
      {redirecting ? (
        <>Redirecting....</>
      ) : (
        <Card
          sx={{ minHeight: 300, maxWidth: 350 }}
          className="max-w-fit flex flex-col items-center justify-center gap-small px-24 bg-container-default"
        >
          <span className="self-center text-3xl">Login</span>
          <Button
            variant="contained"
            onClick={onClick}
            className="flex gap-small"
          >
            <Image
              src="/microsoft_logo.svg"
              width={20}
              height={20}
              alt="Microsoft_Logo"
            />
            Login via Microsoft
          </Button>
          <span className="text-red-500 text-sm">{errorMessage}</span>
        </Card>
      )}
    </div>
  );
};

export default Oauth;
