"use server";
import prisma from "../../lib/db";
export async function sharedPosts(
  communityId: string,
  sortOption: string,
  page: number,
  skip: number,
  take: number
) {
  try {
    let orderBy = {};
    if (sortOption === "latest") {
      orderBy = { date: "desc" };
    } else if (sortOption === "oldest") {
      orderBy = { date: "asc" };
    } else if (sortOption === "Controversial") {
      orderBy = {
        comments: {
          _count: "desc",
        },
      };
    } else if (sortOption === "mostLiked") {
      orderBy = {
        action: {
          _count: "desc",
        },
      };
    } else {
      orderBy = {
        date: "desc",
      };
    }

    if (communityId) {
      const posts = await prisma.post.findMany({
        where: {
          sharedCommunity: communityId,
          shared: true,
        },
        orderBy,
        skip,
        take,
        select: {
          community: true,
          userId: true,
          content: true,
          postId: true,
          imageUrl: true,
          options: true,
          date: true,
        },
      });

      if (posts.length > 0) {
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

        const noMorePosts = posts.length < take;

        return {
          // communityName: community.communityName,
          posts: postsWithUsernames,
          noMorePosts: noMorePosts ? "No more posts available" : null,
        };
      } else {
        return {
          message: "Not Posts Yet!",
        };
      }
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
