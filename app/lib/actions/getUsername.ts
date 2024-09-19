"use server";
import prisma from "../db";
import { getUser } from "./getUser";

export const logUserInfo = async (): Promise<{
  username: string | null;
  communityId: string | null;
} | null> => {
  try {
    const userId = await getUser();
    const id = userId?.user?.id;

    if (!id) {
      return null;
    }

    const username = await prisma.user.findUnique({
      where: { id },
      select: { username: true, communityId: true },
    });

    return username;
  } catch (error) {
    return null; // Return null on error
  }
};

export const communityInfo = async () => {
  try {
    const userInfo = await logUserInfo();

    if (!userInfo || !userInfo.communityId) {
      return { message: "User is not logged in or no communityId available" };
    }

    const community = await prisma.community.findUnique({
      where: { communityId: userInfo.communityId },
      select: { communityName: true },
    });

    return community || { message: "Community not found" };
  } catch (error) {
    return { message: "An error occurred" };
  }
};
