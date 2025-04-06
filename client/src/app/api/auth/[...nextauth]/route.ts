import NextAuth from 'next-auth';

//import GoogleProvider from 'next-auth/providers/google';
import { nextAuthOptions } from './options';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };