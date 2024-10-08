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
      communityId: true,
      communityName: true,
    },
  });

  const userCountsPromises = allCommunities.map(async (community) => {
    const count = await prisma.user.count({
      where: {
        communityId: community.communityId,
      },
    });
    return {
      communityId: community.communityId,
      userCount: count,
    };
  });

  const userCounts = await Promise.all(userCountsPromises);

  const communitiesWithUserCounts = allCommunities.map((community) => {
    const userCount =
      userCounts.find((uc) => uc.communityId === community.communityId)
        ?.userCount || 0;

    return {
      ...community,
      userCount,
    };
  });

  return NextResponse.json({
    CommunitiesInfo: communitiesWithUserCounts,
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
