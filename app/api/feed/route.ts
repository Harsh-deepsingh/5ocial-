import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const feed = await client.community.findUnique({
      where: {
        communityId,
      },
      include: {
        posts: true,
      },
    });

    if (feed) {
      return NextResponse.json({
        communityName: feed.communityName,
        posts: feed.posts.map((post) => post.content),
      });
    } else {
      return NextResponse.json({
        message: "Community not found",
      });
    }
  } catch (error) {
    console.error(error);
  }
}
