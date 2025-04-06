import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from 'services/api';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        last_name: { label: 'Last Name', type: 'text' }
      },

      async authorize(credentials) {
        const response = await api.post('/sessions', {
          name: credentials?.name,
          last_name: credentials?.last_name,
          email: credentials?.email,
          password: credentials?.password
        });

        const { user } = response.data.data;

        if (user) {
          return user;
        }

        return null;
      }
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      if (token.user){ 
        session.user = token.user;
      }
      return session;
    }
  }
};
