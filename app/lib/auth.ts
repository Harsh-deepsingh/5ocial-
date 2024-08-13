import prisma from "./db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Session as NextAuthSession } from "next-auth";
import { z } from "zod";
import { pages } from "next/dist/build/templates/app-page";

type Session = NextAuthSession & {
  user: {
    id: string;
    email: string;
    password: string;
    username: string | null;
    verified: boolean;
  };
};
interface CredentialsSchema {
  email: string;
  password: string;
}
const credentialsSchema: any = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email@gmail.com",
          type: "email",
          placeholder: "1231231231",
        },
        password: { label: "Password", type: "password" },
      },

      // User credentials type from next-auth
      async authorize(credentials: any) {
        //OTP validation here

        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const existingUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials?.password,
            existingUser.password
          );

          if (passwordValidation) {
            return {
              id: existingUser.id,
              username: existingUser.username,
              verified: existingUser.verified,
            };
          }
          return null;
        }
        try {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: any; session: Session }) {
      session.user.id = token.sub;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
