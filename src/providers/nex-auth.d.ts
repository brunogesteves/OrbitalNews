import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user2: {
      email: string;
    };
  }
}
