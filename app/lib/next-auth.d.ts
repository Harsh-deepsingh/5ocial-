// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username?: string | null;
      verified: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    username?: string | null;
    verified: boolean;
  }

  interface JWT {
    uid: string;
  }
}
