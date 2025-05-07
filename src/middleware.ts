/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    const token =
        request.cookies.get('next-auth.session-token')?.value ||
        request.cookies.get('__Secure-next-auth.session-token')?.value

    const loginUrl = new URL('/sign-in', request.url)

    // Nếu không có token -> redirect và clear cookie
    if (!token) {
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('__Secure-next-auth.session-token')
        return response
    }

    // Gọi API để validate token
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/public/token`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })


        if (!res.ok) {
            const response = NextResponse.redirect(loginUrl)
            response.cookies.delete('next-auth.session-token')
            response.cookies.delete('__Secure-next-auth.session-token')
            return response
        }
    } catch (error) {
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete('next-auth.session-token')
        response.cookies.delete('__Secure-next-auth.session-token')
        return response
    }

    return NextResponse.next()
}
// export async function middleware(request: NextRequest) {
//   const token =
//     request.cookies.get('next-auth.session-token')?.value ||
//     request.cookies.get('__Secure-next-auth.session-token')?.value

//   // Nếu không có token -> redirect về login
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   // Validate token qua API
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/public/token`, {
//         method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     if (!res.ok) {
//       return NextResponse.redirect(new URL('/sign-in', request.url))
//     }
//   } catch (error) {
//     return NextResponse.redirect(new URL('/sign-in', request.url))
//   }

//   return NextResponse.next()
// }

export const config = {
    matcher: [
        '/writing-test',
        '/quiz-test',
        '/admin/teachers',
        '/admin',
        '/admin/questions',
        '/admin/exams',
        '/admin/grade',
        '/'
    ],
};
