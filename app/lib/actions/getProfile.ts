import prisma from "../db";
import { getUser } from "./getUser";
export async function profile() {
  const userId = await getUser();
  const id = userId?.user?.id;
  try {
    const profile = await prisma.user.findUnique({
      where: { id },
      select: {
        username: true,
        posts: true,
        actions: true,
        comment: true,
        community: true,
        following: true,
      },
    });
    return { data: profile };
  } catch (error) {
    return { message: "data isn't available" };
  }
}
