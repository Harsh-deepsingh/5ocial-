import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../../lib/db";

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
  const { sharedCommunity, content } = await req.json();
  try {
    const sharedPost = await prisma.post.create({
      data: {
        userId,
        communityId,
        sharedCommunity,
        shared: true,
        content,
      },
    });
    return NextResponse.json(sharedPost);
  } catch (error) {
    console.log(error);
  }
}
