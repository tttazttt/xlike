import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

process.env.NEXTAUTH_URL =
  process.env.NEXTAUTH_URL ?? `https://${process.env.VERCEL_URL}`;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name,
              image: user.image,
            },
          });
          token.id = newUser.id;
        } else {
          token.id = existingUser.id;
        }
        token.email = user.email as string | null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string | null;
      }
      return session;
    },
  },
};
