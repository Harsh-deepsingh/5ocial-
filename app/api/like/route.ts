import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId") ?? "";
    const userId = req.nextUrl.searchParams.get("userId") ?? "";

    const existingLike = await client.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (existingLike) {
      const deleteLike = await client.like.delete({
        where: {
          postId,
          userId,
          likeId: existingLike.likeId,
        },
      });
      return NextResponse.json(deleteLike);
    }
    const like = await client.like.create({
      data: {
        postId,
        userId,
      },
    });
    return NextResponse.json(like);
  } catch (error) {
    console.error(error);
  }
}
