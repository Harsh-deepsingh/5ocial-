import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");

    if (postId) {
      const [likeCount, dislikeCount] = [
        await prisma.action.count({
          where: {
            postId,
            type: "LIKE",
          },
        }),
        await prisma.action.count({
          where: { postId, type: "DISLIKE" },
        }),
      ];
      return NextResponse.json({ like: likeCount, dislike: dislikeCount });
    }
    const [likeCount, dislikeCount] = [
      await prisma.action.count({
        where: {
          commentId,
          type: "LIKE",
        },
      }),
      await prisma.action.count({
        where: { commentId, type: "DISLIKE" },
      }),
    ];
    return NextResponse.json({ like: likeCount, dislike: dislikeCount });
  } catch (error) {}
}
