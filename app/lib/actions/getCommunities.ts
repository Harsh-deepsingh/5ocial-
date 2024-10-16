import prisma from "../../lib/db";

export async function getCommunitiesWithUserCounts(
  excludedCommunityId: string | null | undefined
) {
  if (excludedCommunityId) {
    const allCommunities = await prisma.community.findMany({
      where: {
        NOT: {
          communityId: excludedCommunityId,
        },
      },
      select: {
        communityId: true,
        communityName: true,
      },
    });

    const userCountsPromises = allCommunities.map(async (community) => {
      const userCount = await prisma.user.count({
        where: {
          communityId: community.communityId,
        },
      });

      const sharedPostCount = await prisma.post.count({
        where: {
          shared: true,
          sharedCommunity: community.communityId,
        },
      });

      return {
        communityId: community.communityId,
        userCount: userCount,
        sharedPostCount: sharedPostCount,
      };
    });

    const userCounts = await Promise.all(userCountsPromises);

    return allCommunities.map((community) => {
      const foundCommunity = userCounts.find(
        (uc) => uc.communityId === community.communityId
      );

      return {
        ...community,
        userCount: foundCommunity?.userCount || 0,
        sharedPostCount: foundCommunity?.sharedPostCount || 0,
      };
    });
  } else {
    return [];
  }
}
