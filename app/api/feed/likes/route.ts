import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");
    if (postId) {
      const [likeCount, dislikeCount] = [
        await client.action.count({
          where: {
            postId,
            type: "LIKE",
          },
        }),
        await client.action.count({
          where: { postId, type: "DISLIKE" },
        }),
      ];
      return NextResponse.json({ like: likeCount, dislike: dislikeCount });
    }
    const [likeCount, dislikeCount] = [
      await client.action.count({
        where: {
          commentId,
          type: "LIKE",
        },
      }),
      await client.action.count({
        where: { commentId, type: "DISLIKE" },
      }),
    ];
    return NextResponse.json({ like: likeCount, dislike: dislikeCount });
  } catch (error) {}
}
