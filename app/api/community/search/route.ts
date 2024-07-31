import prisma from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
  const allCommunities = await prisma.community.findMany({
    where: {
      NOT: {
        communityId,
      },
    },
    select: {
      communityName: true,
      users: true,
    },
  });

  return NextResponse.json({
    Communities: allCommunities.map((community) => community.communityName),
    userCount: allCommunities.map((community) => community.users.length),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();
    const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
    const searchResult = await prisma.community.findMany({
      where: {
        NOT: {
          communityId,
        },
        communityName: {
          contains: userInput,
        },
      },
      select: {
        communityName: true,
      },
    });

    return NextResponse.json(searchResult);
  } catch (error) {
    console.log(error);
  }
}
