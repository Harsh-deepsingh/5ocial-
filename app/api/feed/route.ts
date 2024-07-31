import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const community = await prisma.community.findUnique({
      where: {
        communityId,
      },
    });

    if (community) {
      const posts = await prisma.post.findMany({
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
