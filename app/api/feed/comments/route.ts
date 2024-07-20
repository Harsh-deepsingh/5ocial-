import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") ?? "";
  const [allComments, commentCount] = [
    await client.comment.findMany({
      where: {
        postId,
      },
      select: {
        content: true,
      },
    }),
    await client.comment.count({
      where: {
        postId,
      },
    }),
  ];
  return NextResponse.json({
    allComments: allComments,
    commentCount: commentCount,
  });
}
