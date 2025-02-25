import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import api from 'services/api';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        last_name: { label: 'Last Name', type: 'text' }
      },

      async authorize(credentials, req) {
        const response = await api.post('/sessions', {
          name: credentials?.name,
          last_name: credentials?.last_name,
          email: credentials?.email,
          password: credentials?.password
        });

        const { user } = response.data.data;
        console.log(response.data.data);

        if (user) {
          return user;
        }

        return null;
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    }
  }
};
