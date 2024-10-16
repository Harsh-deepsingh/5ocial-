"use server";
import prisma from "../db";
import { sendLoginEmail } from "../sendEmail";
export default async function generateOtp(email: string) {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  try {
    await prisma?.otp.create({
      data: {
        Otp: otp,
        Email: email,
      },
    });

    await sendLoginEmail(email, otp);
  } catch (error) {
    return error;
  }
}
