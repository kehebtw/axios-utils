import { AxiosInstance } from "axios";

declare module 'axios-utils' {
    // define the types...
    const defaultTimeout: number;
    const defaultHeaders: any;

    interface IHttpResponse {
        ok: boolean
        extras: any
        status: any
        data?: any
        error?: string
    }
    function getAxiosClient(baseURL: string, headers: any = {}, timeout: number = defaultTimeout): AxiosInstance
}