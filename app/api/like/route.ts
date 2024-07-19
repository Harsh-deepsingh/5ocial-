import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId") ?? "";
    const userId = req.nextUrl.searchParams.get("userId") ?? "";
    const { actionType } = await req.json();

    if (!["LIKE", "DISLIKE"].includes(actionType)) {
      return NextResponse.json({ error: "Invalid action type" });
    }

    const existingLike = await client.action.findFirst({
      where: {
        postId,
        userId,
        type: actionType,
      },
    });
    if (existingLike) {
      const deleteLike = await client.action.delete({
        where: {
          postId,
          userId,
          actionId: existingLike.actionId,
        },
      });
      return NextResponse.json(deleteLike);
    }
    const like = await client.action.create({
      data: {
        postId,
        userId,
        type: actionType,
      },
    });
    return NextResponse.json(like);
  } catch (error) {
    console.error(error);
  }
}
