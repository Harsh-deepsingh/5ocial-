import prisma from "../../lib/db";

export async function sharedPosts(communityId: string) {
  try {
    if (communityId) {
      const posts = await prisma.post.findMany({
        where: {
          sharedCommunity: communityId,
          shared: true,
        },
        select: {
          community: true,
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
        // communityName: community.communityName,
        posts: postsWithUsernames,
      };
    } else {
      return {
        message: "Community not found",
      };
    }
  } catch (error) {
    console.error(error);
    return { message: "Internal server error", status: 500 };
  }
}
