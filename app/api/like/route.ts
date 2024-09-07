import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");
    const commentId = req.nextUrl.searchParams.get("commentId");
    const userId = req.nextUrl.searchParams.get("userId");
    const { actionType } = await req.json();

    if (!["LIKE", "DISLIKE"].includes(actionType)) {
      return NextResponse.json(
        { error: "Invalid action type" },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    let existingLike = null;

    if (commentId) {
      existingLike = await prisma.action.findFirst({
        where: {
          userId,
          commentId,
        },
      });
    } else if (postId) {
      existingLike = await prisma.action.findFirst({
        where: {
          userId,
          postId,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Post ID or Comment ID is required" },
        { status: 400 }
      );
    }
    if (existingLike) {
      if (existingLike.type === actionType) {
        const deleteLike = await prisma.action.delete({
          where: {
            actionId: existingLike.actionId,
          },
        });
        return NextResponse.json(deleteLike);
      } else {
        // If the action type differs, update it
        const updateLike = await prisma.action.update({
          where: {
            actionId: existingLike.actionId,
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
    } else if (commentId) {
      const commentLike = await prisma.action.create({
        data: {
          type: actionType,
          userId,
          commentId,
        },
      });
      return NextResponse.json(commentLike);
    }
    return NextResponse.json(
      { error: "Action could not be processed" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error processing action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
