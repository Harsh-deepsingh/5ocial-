import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") ?? "";
  const [allComments, commentCount] = [
    await prisma.comment.findMany({
      where: {
        postId,
      },
      select: {
        content: true,
      },
    }),
    await prisma.comment.count({
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
