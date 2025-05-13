import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/api/auth/fetches';
import { redirect } from 'next/navigation';

export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials.password) {
                    return null;
                }
                const response = await signIn({
                    email: String(credentials.identifier),
                    password: String(credentials.password),
                });
                // console.log(response);
                // // if (!response.responseData) {
                // // }
                // if ((response as any)?.error?.messages?.includes("Please verify otp.")) {
                //     console.log("here");
                //    return {

                //    }
                // }
                if (!response?.responseData) {
                    if ((response as any)?.error?.messages?.includes("Please verify otp.")) {
                        throw new Error((response as any)?.error?.messages?.[0]);
                    }
                }
                if (response?.responseData) {
                    return {
                        ...response.responseData.englishUser,
                        userId: response.responseData.englishUser.userId,
                        id: response.responseData.englishUser.userId,
                        accessToken: response.responseData.token,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ user, token, session, trigger }) {
            if (trigger === 'update') {
                return {
                    ...token,
                    ...session.user,
                };
            }
            if (user) {
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.displayName = user.displayName;
                token.phone = user.phone;
                token.userId = user.userId;
                token.accessToken = user.accessToken;
                token.roles = user.roles;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.displayName = token.displayName;
            session.user.phone = token.phone;
            session.user.accessToken = token.accessToken;
            session.user.roles = token.roles;
            session.user.userId = token.userId;
            return session;
        },
    },
} satisfies NextAuthOptions;
