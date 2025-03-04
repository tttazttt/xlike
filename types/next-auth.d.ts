import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    email: string | null;
  }
}
