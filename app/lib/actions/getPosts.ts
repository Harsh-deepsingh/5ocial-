import prisma from "../../lib/db";
import { logUserInfo } from "./getUsername";

export async function Posts() {
  try {
    const res = await logUserInfo();
    const communityId = res?.communityId;
    if (communityId) {
      const community = await prisma.community.findUnique({
        where: {
          communityId,
        },
      });

      if (community) {
        const posts = await prisma.post.findMany({
          where: {
            communityId: communityId,
            shared: false,
          },
          select: {
            userId: true,
            content: true,
            postId: true,
          },
        });

        const postsWithUsernames = await Promise.all(
          posts.map(async (post) => {
            const user = await prisma.user.findUnique({
              where: { id: post.userId },
              select: {
                username: true,
              },
            });
            return {
              ...post,
              username: user?.username,
            };
          })
        );

        return {
          communityName: community.communityName,
          posts: postsWithUsernames,
        };
      } else {
        return {
          message: "Community not found",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return { message: "Internal server error", status: 500 };
  }
}
