import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/db/index";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" });
    }

    let hasLiked = false;

    if (postId) {
      const like = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          postId: String(postId),
          type: "LIKE",
        },
      });

      if (like) {
        hasLiked = true;
      }
    } else if (commentId) {
      const like = await prisma.action.findFirst({
        where: {
          userId: String(userId),
          commentId: String(commentId),
          type: "LIKE",
        },
      });

      if (like) {
        hasLiked = true;
      }
    }

    return NextResponse.json({ hasLiked });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
