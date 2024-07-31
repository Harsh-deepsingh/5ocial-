import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function POST(req: NextRequest) {
  const followingId: string | null =
    req.nextUrl.searchParams.get("followingId");
  const userId: string | null = req.nextUrl.searchParams.get("userId");
  if (userId && followingId) {
    const followings = await prisma.following.create({
      data: {
        followingId,
        userId,
      },
    });
    return NextResponse.json(followings);
  }
}

export async function GET(req: NextRequest) {
  const userId: string | null = req.nextUrl.searchParams.get("userId");
  if (userId) {
    const followers = await prisma.following.findMany({
      where: {
        followingId: userId,
      },
      select: {
        user: true,
      },
    });
    return NextResponse.json(followers);
  }
}
