import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId") ?? "";
    const commentId = req.nextUrl.searchParams.get("commentId") ?? "";
    const userId = req.nextUrl.searchParams.get("userId") ?? "";
    const { actionType } = await req.json();

    if (!["LIKE", "DISLIKE"].includes(actionType)) {
      return NextResponse.json({ error: "Invalid action type" });
    }

    const existingLike = await prisma.action.findFirst({
      where: {
        userId,
        OR: [{ postId } || { commentId }],
      },
    });

    if (existingLike) {
      if (existingLike?.type === actionType) {
        const deleteLike = await prisma.action.delete({
          where: {
            actionId: existingLike?.actionId,
          },
        });
        return NextResponse.json(deleteLike);
      } else {
        const updateLike = await prisma.action.update({
          where: {
            actionId: existingLike?.actionId,
          },
          data: {
            type: actionType,
          },
        });
        return NextResponse.json(updateLike);
      }
    }
    if (postId) {
      const postLike = await prisma.action.create({
        data: {
          type: actionType,
          userId,
          postId,
        },
      });
      return NextResponse.json(postLike);
    }
    const commentLike = await prisma.action.create({
      data: {
        type: actionType,
        userId,
        commentId,
      },
    });
    return NextResponse.json(commentLike);
  } catch (error) {
    console.error(error);
  }
}
