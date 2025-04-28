import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            userId: string;
            roles: string[];
            firstName: string;
            lastName: string;
            displayName: string;
            email: string;
            phone: string;
            address: string;
            accessToken: string;
        } & DefaultSession['user'];
    }
    interface User {
        userId: string;
        roles: string[];
        firstName: string;
        lastName: string;
        displayName: string;
        email: string;
        phone: string;
        address: string;
        accessToken: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userId: string;
        roles: string[];
        firstName: string;
        lastName: string;
        displayName: string;
        email: string;
        phone: string;
        address: string;
        accessToken: string;
    }
}
