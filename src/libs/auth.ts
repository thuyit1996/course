import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/api/auth/fetches';

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
                // const response = await signIn({
                //     email: String(credentials.identifier),
                //     password: String(credentials.password),
                // });
                // if (!response.responseData) {
                //     return null;
                // }
                const response = {
  "responseData": {
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDY2OTM5NTEsImV4cCI6MTc0NzI5ODc1MX0.WuK1zoatwt8TtmkkIU92cA5KkwNquXCz_nIE59NnZSMzn30ycmJ6j42pzqysQ_Dgj061ozkJdwaT7VN10YDzbg",
    "englishUser": {
      "userId": "67c27b22b4060540c59d2cf5",
      "roles": [
        "ROLE_ADMIN"
      ],
      "firstName": "John",
      "lastName": "Doe",
      "displayName": "John Doe",
      "email": "admin@gmail.com",
      "phone": "123-456-7890",
      "address": "123 Main St."
    }
  }
}
                return {
                    ...response.responseData.englishUser,
                    userId: response.responseData.englishUser.userId,
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
            session.user.displayName = token.displayName;
            session.user.phone = token.phone;
            session.user.accessToken = token.accessToken;
            session.user.roles = token.roles;
            session.user.userId = token.userId;
            return session;
        },
    },
} satisfies NextAuthOptions;
