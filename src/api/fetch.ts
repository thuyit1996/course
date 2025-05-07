import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

enum ApiMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
interface FetchOptions<T> {
    headers?: HeadersInit;
    method: ApiMethod;
    body?: T;
}
export class API {
    private queryParameters: Record<string, number | string | undefined> = {};

    private path: string = '';


    private token = '';

    constructor() {
    }

    addPathName(path: string) {
        this.path = path;
        return this;
    }

    getEndpoint() {
        return process.env.NEXT_PUBLIC_API_ENDPOINT;
    }

    addQueryParam(params: { key: string; value: number | string }[]): API {
        params.forEach((param) => {
            this.queryParameters[param.key] = param.value;
        });
        return this;
    }

    private buildURL(): string {
        let url = `${this.getEndpoint()}${this.path}`;
        const queryParams = new URLSearchParams(
            Object.entries(this.queryParameters ?? {}).map(([key, value]) => [
                key,
                String(value),
            ]),
        ).toString();
        if (queryParams) {
            url += `?${queryParams}`;
        }
        return url;
    }

    addToken = (token: string) => {
        this.token = token;
        return this;
    };

    private async fetchRequest<T>(options: FetchOptions<T>): Promise<Response> {
        const { body, ...restOptions } = options;
        console.log(this.buildURL(), this.token);
        const session = await (typeof window !== 'undefined'
            ? getSession()
            : getServerSession(authOptions));
        const token = session?.user.accessToken;
        const authorizationHeader: HeadersInit = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        return fetch(this.buildURL(), {
            credentials: 'same-origin',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                ...authorizationHeader,
                ...restOptions.headers,
            },
            cache: 'no-store',
            body: body ? JSON.stringify(body) : null,
            ...restOptions,
        }).then(res => {
            console.log("status", res.status);
            if (res.status === 401) {
                if (typeof window !== 'undefined') void signOut({ callbackUrl: '/sign-in' });
                else redirect('/logout');
                return {
                    ...res,
                    json: () =>
                        new Promise((resolve) => {
                            resolve(null);
                        }),
                };
            }
            return res;
        })
    }

    async get(): Promise<Response> {
        return this.fetchRequest({ method: ApiMethod.GET });
    }

    async post<T>(body?: T): Promise<Response> {
        return this.fetchRequest({ method: ApiMethod.POST, body });
    }

    async put<T>(body?: T): Promise<Response> {
        return this.fetchRequest({ method: ApiMethod.PUT, body });
    }

    async delete(): Promise<Response> {
        return this.fetchRequest({ method: ApiMethod.DELETE });
    }

    async patch<T>(body?: T): Promise<Response> {
        return this.fetchRequest({ method: ApiMethod.PATCH, body });
    }

    private async uploadFile<T>(options: FetchOptions<T>): Promise<Response> {
        const { body, ...restOptions } = options;
        console.log(this.buildURL(), this.token);
        const session = await (typeof window !== 'undefined'
            ? getSession()
            : getServerSession(authOptions));
        const token = session?.user.accessToken;
        const authorizationHeader: HeadersInit = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        return fetch(this.buildURL(), {
            credentials: 'same-origin',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                ...authorizationHeader,
                ...restOptions.headers,
            },
            cache: 'no-store',
            body: body as BodyInit,
            ...restOptions,
        });
    }

    async postFile<T>(body?: T): Promise<Response> {
        return this.uploadFile({ method: ApiMethod.POST, body });
    }
}