import prisma from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";

  if (!userId) {
    return NextResponse.json({ message: "User ID is missing or invalid" });
  }

  try {
    const profileUsername = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });

    // if (!profileUsername) {
    //   return NextResponse.json({ message: "User not found" });
    // }

    const profile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        posts: true,
        actions: true,
        comments: true,
        community: true,
        following: true,
      },
    });

    if (!profile) {
      return NextResponse.json({
        profileUsername,
        message: "Profile data not found",
      });
    }

    const likedPostsId =
      profile.actions
        ?.filter((action) => action.type === "LIKE" && action.postId !== null)
        .map((action) => action.postId as string) ?? [];

    if (likedPostsId.length > 0) {
      const likedPosts = await prisma.post.findMany({
        where: {
          postId: {
            in: likedPostsId,
          },
        },
        select: {
          content: true,
          comments: true,
          userId: true,
          postId: true,
        },
      });

      return NextResponse.json({
        profileUsername,
        data: profile,
        likedPosts,
      });
    } else {
      return NextResponse.json({
        profileUsername,
        data: profile,
        message: "No liked posts found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: `Data isn't available`,
      error,
    });
  }
}
