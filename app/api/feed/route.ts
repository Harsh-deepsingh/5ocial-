import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const community = await client.community.findUnique({
      where: {
        communityId,
      },
    });

    if (community) {
      const posts = await client.post.findMany({
        where: {
          communityId: communityId,
          shared: false,
        },
      });

      return NextResponse.json({
        communityName: community.communityName,
        posts: posts.map((post) => post.content),
      });
    } else {
      return NextResponse.json({
        message: "Community not found",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
