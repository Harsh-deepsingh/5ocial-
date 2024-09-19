import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const userId: string | null = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const followersData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            followingId: true,
          },
        },
      },
    });

    if (!followersData || !followersData.following.length) {
      return NextResponse.json(
        { message: "No followers found" },
        { status: 200 }
      );
    }
    const followingIds = followersData.following.map(
      (entry) => entry.followingId
    );
    const followers = await prisma.user.findMany({
      where: {
        id: {
          in: followingIds,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    return NextResponse.json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    return NextResponse.json(
      { error: "Failed to fetch followers" },
      { status: 500 }
    );
  }
}
