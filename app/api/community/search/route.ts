import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const client = new PrismaClient();
export async function GET(req: NextRequest) {
  const communityId = req.nextUrl.searchParams.get("communityId") ?? "";
  const allCommunities = await client.community.findMany({
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
    const searchResult = await client.community.findMany({
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
