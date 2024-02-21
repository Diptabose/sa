"use client"
import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL, NEXT_API_BASE_URL } from "./commonMethods";


const API_URL = API_BASE_URL + "/api/v1/";
const NEXT_API_URL = NEXT_API_BASE_URL + '/api/'

const axiosHttp = axios.create({
    // baseURL: `${API_URL}`,
});



export let GetMethod = async (url: string, requestConfig?: AxiosRequestConfig<any>, switchToNext: boolean = false) => {

    url = switchToNext ? NEXT_API_URL + url : API_URL + url;
    let getResponse = await axiosHttp.get(url, {
        ...requestConfig,
        withCredentials: true,
    });
    return getResponse ? getResponse.data : null;
}

export const PostMethod = async (url: string, req_body: any, requestConfig?: AxiosRequestConfig<any>, switchToNext: boolean = false) => {
    url = switchToNext ? NEXT_API_URL + url : API_URL + url;
    let response = await axiosHttp.post(url, req_body, {
        ...requestConfig,
        withCredentials: true
    });
    return response.data;
};

export const PatchMethod = async (url: any, req_body: any, requestConfig?: AxiosRequestConfig<any>, switchToNext: boolean = false) => {
    url = switchToNext ? NEXT_API_URL + url : API_URL + url;
    let response = await axiosHttp.patch(url, req_body, {
        ...requestConfig,
        withCredentials: true
    });
    return response.data;
};

export const PutMethod = async (url: any, req_body: any, requestConfig?: AxiosRequestConfig<any>, switchToNext: boolean = false) => {
    url = switchToNext ? NEXT_API_URL + url : API_URL + url;
    let response = await axiosHttp.put(url, req_body, {
        ...requestConfig,
        withCredentials: true
    });
    return response.data;
};

export const DeleteMethod = async (url: string, requestConfig?: AxiosRequestConfig<any>, switchToNext: boolean = false) => {
    url = switchToNext ? NEXT_API_URL + url : API_URL + url;

    let response = await axiosHttp.delete(url, {
        ...requestConfig,
        withCredentials: true
    });
    return response ? response.data : null;
};

