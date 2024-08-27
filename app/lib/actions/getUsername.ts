"use server";
import prisma from "../db";
import { getUser } from "../../page";
export const logUserInfo = async () => {
  try {
    const userId = await getUser();
    const id = userId?.user?.id;
    const username = await prisma.user.findUnique({
      where: { id },
      select: { username: true, communityId: true },
    });

    return username;
  } catch (error) {
    return { message: "User is ont logged in" };
  }
};

export const communityInfo = async () => {
  try {
    const res = await logUserInfo();
    const communityId = res?.communityId;
    if (communityId !== null) {
      const community = await prisma.community.findUnique({
        where: { communityId: communityId },
        select: { communityName: true },
      });
      return community;
    }
  } catch (error) {
    return { message: "User is ont logged in" };
  }
};
