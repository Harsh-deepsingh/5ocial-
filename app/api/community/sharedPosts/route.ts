import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";

  try {
    const communityInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        communityId: true,
      },
    });
    if (!communityInfo || !communityInfo.communityId) {
      return NextResponse.json(
        { error: "Community not found for the user" },
        { status: 404 }
      );
    }

    const { sharedCommunity, content } = await req.json();

    const sharedPost = await prisma.post.create({
      data: {
        userId,
        communityId: communityInfo.communityId,
        sharedCommunity,
        shared: true,
        content,
      },
    });

    return NextResponse.json(sharedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
