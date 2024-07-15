import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const client = new PrismaClient();

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

      // TODO: User credentials type from next-aut
      async authorize(credentials: any) {
        // Do zod validation, OTP validation here
        console.log(credentials.providers);
        if (credentials.providers) {
          const hashedPassword = await bcrypt.hash(credentials.providers, 10);
        }
        const existingUser = await client.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            id: existingUser.id;
            username: existingUser.username;
            verified: existingUser.verified;
          }
          return null;
        }
        console.log(2);
        try {
          const user = await client.user.create({
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          console.log(user);
          console.log(3);
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
    async session({ token, session }: any) {
      session.user.id = token.sub;

      return session;
    },
  },
};
