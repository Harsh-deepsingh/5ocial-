import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/db/index";

export async function GET(req: NextRequest, res: NextResponse) {
  const followingId: string | null =
    req.nextUrl.searchParams.get("followingId");
  const userId: string | null = req.nextUrl.searchParams.get("userId");

  if (!userId || !followingId) {
    return NextResponse.json({ error: "Missing userId or followingId" });
  }

  try {
    const followRecord = await prisma.following.findFirst({
      where: {
        userId: userId as string,
        followingId: followingId as string,
      },
    });
    const hasFollowed = !!followRecord;
    return NextResponse.json({ hasFollowed });
  } catch (error) {
    console.error("Error checking follow status:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
