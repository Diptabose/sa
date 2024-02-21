"use client";

import AppContext, { AppContextProps } from "@/store/contexts/app.context";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ReactNode, useContext, useEffect } from "react";
import { logout } from "./server_actions/actions";
import { isNullOrUndefined } from "@/utils/app/commonMethods";
import { useRouter } from "next/navigation";

const axiosHttp = axios.create({
  // baseURL: `${API_URL}`,
});
export const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const { state, dispatch } = useContext<AppContextProps>(AppContext);
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const requestInterceptor = async (
      request: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      return new Promise(async (resolve) => {
        if (!isNullOrUndefined(request?.headers)) {
          const headers = request.headers!;
          const authorization: any =
            window.localStorage.getItem("authorization");
          if (!isNullOrUndefined(authorization)) {
            headers["authorization"] = `Bearer ${authorization}`;
          }
        }
        resolve(request);
      });
    };

    const responseErrorInterceptor = async (error: any) => {
      if (!isNullOrUndefined(error)) {
        if (
          error.response &&
          ((error.response.data && error.response.data.status === 401) ||
            error.response.status === 401)
        ) {
          dispatch({
            field: "status_dialog",
            value: {
              open: true,
              message: error.response.data.message ?? "Unauthorized",
              onClose: () => {
                logout();
                router.push("/login");
              },
              onCancel: () => {
                return Promise.reject(error);
              },
            },
          });
          // logout();
          // router.push('/login')
          // window.location.href = 'http://localhost:6001/login'
          // return Promise.reject(error);
        } else if (
          error.response &&
          error.response.data &&
          error.response.status === 403
        ) {
          dispatch({
            field: "status_dialog",
            value: {
              open: true,
              message: error?.response?.data?.message ?? "Something went wrong",
              onClose: () => {
                window.location.reload();
              },
              onCancel: () => {},
            },
          });

          return Promise.reject(error);
        } else if (
          error.response &&
          ((error.response.data && error.response.data.status === 500) ||
            error.response.status === 500)
        ) {
          // dispatch({
          //     field: 'status_dialog', value: {
          //         open: true,
          //         message: error.response.data.message ?? 'Something went wrong',
          //         onClose: () => { return Promise.reject(error); },
          //         onCancel: () => { }
          //     }
          // })
          return Promise.reject(error);
        } else if (
          error.response &&
          ((error.response.data && error.response.data.status === 400) ||
            error.response.status === 400)
        ) {
          // dispatch({
          //     field: 'status_dialog', value: {
          //         open: true,
          //         message: error.response.data.message ?? 'Something went wrong',
          //         onClose: () => { },
          //         onCancel: () => { }
          //     }
          // })
        }
        return Promise.reject(error);
      }
    };

    const reqInterceptor =
      axiosHttp.interceptors.request.use(requestInterceptor);
    const responseInterceptor = axiosHttp.interceptors.response.use(
      resInterceptor,
      responseErrorInterceptor
    );

    return () => {
      axiosHttp.interceptors.response.eject(responseInterceptor);
      axiosHttp.interceptors.request.eject(reqInterceptor);
    };
  }, []);

  return <>{children}</>;
};
