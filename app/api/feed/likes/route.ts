import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");

    if (postId) {
      const [likeCount, dislikeCount] = await Promise.all([
        prisma.action.count({
          where: {
            postId,
            type: "LIKE",
          },
        }),
        prisma.action.count({
          where: { postId, type: "DISLIKE" },
        }),
      ]);
      return NextResponse.json({ like: likeCount, dislike: dislikeCount });
    }

    if (commentId) {
      const [likeCount, dislikeCount] = await Promise.all([
        prisma.action.count({
          where: {
            commentId,
            type: "LIKE",
          },
        }),
        prisma.action.count({
          where: { commentId, type: "DISLIKE" },
        }),
      ]);
      return NextResponse.json({ like: likeCount, dislike: dislikeCount });
    }

    return NextResponse.json(
      { error: "No postId or commentId provided" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching like/dislike counts" },
      { status: 500 }
    );
  }
}
