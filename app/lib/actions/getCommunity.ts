import prisma from "../db";
export async function getCommunity(communityId: string) {
  const community = await prisma.community.findUnique({
    where: { communityId },
    select: {
      communityName: true,
    },
  });
  return community?.communityName;
}
