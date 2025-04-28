/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

export const config = {
    matcher: [
        '/writing-test',
        '/quiz-test',
        '/admin/teachers',
        '/admin'
    ],
};
