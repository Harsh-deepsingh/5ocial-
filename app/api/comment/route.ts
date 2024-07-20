import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

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

  const comment = await client.comment.create({
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
  const deleteComment = await client.comment.delete({
    where: {
      commentId,
    },
  });
  return NextResponse.json({
    message: `Comment is id ${deleteComment.commentId} is deleted`,
  });
}
