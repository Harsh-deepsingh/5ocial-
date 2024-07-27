import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") ?? "";
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
  const { sharedCommunity, content } = await req.json();
  console.log(sharedCommunity);
  console.log(content);

  try {
    const sharedPost = await client.post.create({
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
