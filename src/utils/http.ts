import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { logout } from '@/app/server_actions/actions';

class NextHttpError extends Error {

    response :Response
    constructor(response:Response) {
        super(response.statusText);
        this.response = response;
    }
}

class NextHttp {
    private static instance: NextHttp;
    private constructor() {

    }
    static get Instance() {
        if (this.instance) {
            return this.instance
        }
        return this.instance = new this();
    }

    public async get(url: string | URL, config?: RequestInit) {
        let tempResponse;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: config?.headers,
            });
            tempResponse = response;
            
            if (!response.ok) {
                throw new NextHttpError(response);
            }
            return response;
        }
        catch (err) {
            if (err instanceof NextHttpError) {
                if (err.response.status===401) {
                   // await logout(); // Logout the user 
                }
                throw new NextHttpError(tempResponse as Response);
            }
            throw new Error((err as Error).message);
        }
    }

    public async post(url: string | URL, value:any ,config?: RequestInit) {
        let tempResponse;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body:JSON.stringify(value),
                headers: config?.headers,
            });
            tempResponse = response;
            
            if (!response.ok) {
                throw new NextHttpError(response);
            }
            return response;
        }
        catch (err) {
            if (err instanceof NextHttpError) {
                if (err.response.status===401) {
                    // await logout(); // Logout the user 
                }
                throw new NextHttpError(tempResponse as Response);
            }
            throw new Error((err as Error).message);
        }
    }

    public async delete(url: string | URL, config?: RequestInit) {
        let tempResponse;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: config?.headers,
            });
            tempResponse = response;
            
            if (!response.ok) {
                throw new NextHttpError(response);
            }
            return response;
        }
        catch (err) {
            if (err instanceof NextHttpError) {
                if (err.response.status===401) {
                 //   await logout(); // Logout the user 
                }
                throw new NextHttpError(tempResponse as Response);
            }
            throw new Error((err as Error).message);
        }
    }


}

const nextHttp = NextHttp.Instance;
export default nextHttp;
