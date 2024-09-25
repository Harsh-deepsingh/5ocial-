import prisma from "./db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { assignUserToCommunity } from "../api/community/assignCommunity";
import { assignUsername } from "../api/username/assignUsername";
import { NextAuthOptions, Session, User as NextAuthUser } from "next-auth";

// User model type based on Prisma schema
type User = {
  id: string;
  email: string;
  password: string;
  username: string | null;
  verified: boolean;
};

interface CredentialsSchema {
  email: string;
  password: string;
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // OTP validation here (optional)

        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id,
              email: existingUser.email,
              username: existingUser.username,
              verified: existingUser.verified,
            };
          }
          return null;
        }

        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
          });

          await assignUserToCommunity(newUser.id);
          await assignUsername(newUser.id);

          return {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            verified: newUser.verified,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
};
