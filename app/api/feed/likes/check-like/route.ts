import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/db/index";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");
    const commentId = url.searchParams.get("commentId");
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" });
    }

    // Initialize flags for like and dislike
    let hasLiked = false;
    let hasDisliked = false;

    if (postId) {
      const like = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          postId: String(postId),
          type: "LIKE",
        },
        select: {
          type: true,
        },
      });

      const dislike = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          postId: String(postId),
          type: "DISLIKE",
        },
        select: {
          type: true,
        },
      });

      hasLiked = !!like;
      hasDisliked = !!dislike;
    } else if (commentId) {
      const like = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          commentId: String(commentId),
          type: "LIKE",
        },
        select: {
          type: true,
        },
      });

      const dislike = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          commentId: String(commentId),
          type: "DISLIKE",
        },
        select: {
          type: true,
        },
      });

      hasLiked = !!like;
      hasDisliked = !!dislike;
    }

    return NextResponse.json({ hasLiked, hasDisliked });
  } catch (error) {
    console.error("Error checking like/dislike status:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
