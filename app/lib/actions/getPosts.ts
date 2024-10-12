"use server";
import prisma from "../../lib/db";
import { logUserInfo } from "./getUsername";

export async function Posts(
  sortOption: string,
  page: number,
  skip: number,
  take: number
) {
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

        const posts = await prisma.post.findMany({
          where: {
            communityId: communityId,
            shared: false,
          },
          orderBy,
          skip,
          take,
          select: {
            userId: true,
            content: true,
            postId: true,
            imageUrl: true,
            options: true,
            date: true,
            action: true,
            community: true,
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

        // Check if the number of fetched posts is less than 'take'
        const noMorePosts = posts.length < take;

        return {
          communityName: community.communityName,
          posts: postsWithUsernames,
          noMorePosts: noMorePosts ? "No more posts available" : null,
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
