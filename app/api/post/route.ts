import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const { content } = await req.json();
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";

  if (!content) {
    return NextResponse.json(
      { error: "Invalid content provided" },
      { status: 400 }
    );
  }

  const post = await client.post.create({
    data: {
      content,
      userId,
      communityId,
    },
  });

  return NextResponse.json(post.content);
}

export async function DELETE(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId") ?? "";
  try {
    const deletePost = await client.post.delete({
      where: {
        postId,
      },
    });
    return NextResponse.json({
      message: `post with ${deletePost.postId} is deleted`,
    });
  } catch (error) {
    console.log(error);
  }
}
