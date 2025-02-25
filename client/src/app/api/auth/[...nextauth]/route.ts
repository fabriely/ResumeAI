import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';
//import { nextAuthOptions } from './options';

//const handler = NextAuth(nextAuthOptions);
const handler = NextAuth ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
    },
})

export { handler as GET, handler as POST };