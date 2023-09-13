import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { api } from '@/Utils/api';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        console.log('credentials:', credentials);

        const response = await api
          .post('/login', credentials)
          .then((res) => {
            return res.data.status;
          })
          .catch((e) => {
            console.log('erro:'); // "Ah, não!"
          });

        return response;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  //   callbacks: {
  //     async jwt({ token }) {
  //       token.user2 = 'user';
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       session = token.email as any;
  //       return session;
  //     },
  //   },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
