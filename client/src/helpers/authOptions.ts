import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
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
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validation:

        if (!credentials?.email || !credentials?.password) {
          console.error("Email or Password is missing");
          return null;
        }
        try {
          // Backend login API call
          const res = await login({
            email: credentials.email,
            password: credentials.password,
          });

          const user = res?.data?.user;
          //  Response validation
          if (!user?.email) {
            console.error("Invalid credentials");
            return null;
          }

          //  User object return
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.picture ?? null,
            role: user.role,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],

  // Callbacks
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

  secret: process.env.AUTH_SECRET as string,

  pages: {
    signIn: "/login",
  },
};
