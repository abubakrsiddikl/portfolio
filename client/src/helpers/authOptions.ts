import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";
import { login } from "@/services";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await login({
          email: credentials.email,
          password: credentials.password,
        });

        const user = res?.data?.user;
        if (!user?.email) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    // ⚠️ এই লাইনটাই আসল কাজ করবে
    // এখন NextAuth আর encrypted টোকেন তৈরি করবে না
    encode: async ({ secret, token }) => {
      return jwt.sign(token!, secret);
    },
    decode: async ({ secret, token }) => {
      return jwt.verify(token!, secret) as Record<string, string>;
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  cookies: {
    sessionToken: {
      name: "accessToken",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  secret: process.env.AUTH_SECRET as string,

  pages: {
    signIn: "/login",
  },
};
