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

    return allCommunities.map((community) => {
      const userCount =
        userCounts.find((uc) => uc.communityId === community.communityId)
          ?.userCount || 0;

      return {
        ...community,
        userCount,
      };
    });
  }
}
