import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";
export async function POST(req: NextRequest) {
  const { content } = await req.json();
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const postId = req.nextUrl.searchParams.get("postId") ?? "";

  if (!content) {
    return NextResponse.json(
      { error: "Invalid content provided" },
      { status: 400 }
    );
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });

  return NextResponse.json(comment);
}

export async function DELETE(req: NextRequest) {
  const commentId = req.nextUrl.searchParams.get("commentId") ?? "";
  const deleteComment = await prisma.comment.delete({
    where: {
      commentId,
    },
  });
  return NextResponse.json({
    message: `Comment is id ${deleteComment.commentId} is deleted`,
  });
}
