import prisma from "./db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { assignUserToCommunity } from "../api/community/assignCommunity";
import { assignUsername } from "../api/username/assignUsername";

type Session = {
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
              id: existingUser.id.toString(),
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
          const id = user.id;

          const joinCommunity = async (id: string) => {
            await assignUserToCommunity(id);
            await assignUsername(id);
          };

          joinCommunity(id);
          return {
            id: user.id.toString(),
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
    async session({ token, session }: { token: any; session: any }) {
      session.user.id = token.sub;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
