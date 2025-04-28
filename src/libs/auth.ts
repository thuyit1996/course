import { cookies } from 'next/headers';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/api/auth/fetches';
import { Cookiekeys } from './constant';

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
                if (!response.responseData) {
                    return null;
                }
                const cookieStore = await cookies();
                cookieStore.set({
                    name: Cookiekeys.accessToken,
                    value: response.responseData.token,
                    httpOnly: true
                });
                return {
                    ...response.responseData.englishUser,
                    id: response.responseData.englishUser.userId,
                    accessToken: response.responseData.token,
                };
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
            token.displayName = token.displayName;
            session.user.phone = token.phone;
            session.user.accessToken = token.accessToken;
            session.user.roles = token.roles;
            return session;
        },
    },
} satisfies NextAuthOptions;
