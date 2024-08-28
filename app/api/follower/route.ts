import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const followingId: string | null =
      req.nextUrl.searchParams.get("followingId");
    const userId: string | null = req.nextUrl.searchParams.get("userId");

    if (!userId || !followingId) {
      return NextResponse.json(
        { error: "Missing userId or followingId" },
        { status: 400 }
      );
    }

    const existingFollow = await prisma.following.findFirst({
      where: {
        followingId,
        userId,
      },
    });

    if (existingFollow) {
      await prisma.following.delete({
        where: {
          followingId,
          userId,
        },
      });
      return NextResponse.json({ message: "Entry removed" });
    }

    const followings = await prisma.following.create({
      data: {
        followingId,
        userId,
      },
    });
    return NextResponse.json(followings);
  } catch (error) {
    console.error("Error processing follow request:", error);
    return NextResponse.json(
      { error: "Failed to process follow request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const FollowingId: string | null =
      req.nextUrl.searchParams.get("followingId");

    if (!FollowingId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const followerCount = await prisma.following.count({
      where: {
        followingId: FollowingId,
      },
    });

    return NextResponse.json({ followers: followerCount });
  } catch (error) {
    console.error("Error fetching follower count:", error);
    return NextResponse.json(
      { error: "Failed to fetch follower count" },
      { status: 500 }
    );
  }
}
