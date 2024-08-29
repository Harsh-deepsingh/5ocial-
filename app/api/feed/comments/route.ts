import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") ?? "";

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      commentId: true,
      userId: true,
      content: true,
    },
  });

  const allComments = await Promise.all(
    comments.map(async (comment) => {
      const user = await prisma.user.findUnique({
        where: { id: comment.userId },
        select: {
          username: true,
        },
      });
      return {
        ...comment,
        username: user?.username,
      };
    })
  );

  const commentCount = await prisma.comment.count({
    where: {
      postId,
    },
  });

  return NextResponse.json({
    allComments: allComments,
    commentCount: commentCount,
  });
}
