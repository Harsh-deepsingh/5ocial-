import prisma from "./db/index";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { assignUserToCommunity } from "../api/community/assignCommunity";
import { assignUsername } from "../api/username/assignUsername";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";

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

// const credentialsSchema = z.object({
//   email: z
//   .string()
//   .min(1, { message: "This field has to be filled." })
//   .email("This is not a valid email."),
//   password: z.string().min(8),
// });

const credentialsSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    otp: z.string().min(4).max(4),
  })
  .superRefine(({ password }, checkPassComplexity) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containsSpecialChar = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0,
      countOfNumbers = 0,
      countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (!isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      countOfSpecialChar < 1 ||
      countOfNumbers < 1
    ) {
      checkPassComplexity.addIssue({
        code: "custom",
        message: "password does not meet complexity requirements",
      });
    }
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
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error(parsedCredentials.error);
          return null;
        }

        const { email, password, otp } = parsedCredentials.data;
        if (email === "demo@gmail.com") {
          const existingUser = await prisma.user.findFirst({
            where: { email },
          });

          if (!existingUser) {
            console.error("Demo user not found");
            return null;
          }

          return {
            id: existingUser.id,
            email: existingUser.email,
            username: existingUser.username,
            verified: existingUser.verified,
          };
        }

        const dbOtp = await prisma.otp.findFirst({
          where: {
            Email: email,
          },
          select: {
            Otp: true,
            Id: true,
            Email: true,
          },
        });

        if (!dbOtp?.Otp || dbOtp?.Otp !== otp) {
          console.error("Invalid OTP");
          return null;
        }

        const existingUser = await prisma.user.findFirst({
          where: { email },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            password,
            existingUser.password
          );
          console.log(password);

          if (passwordValidation) {
            await prisma.otp.deleteMany({
              where: {
                Email: dbOtp.Email,
              },
            });

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

          if (dbOtp.Email) {
            await prisma.otp.deleteMany({
              where: {
                Email: dbOtp.Email,
              },
            });
          }

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
