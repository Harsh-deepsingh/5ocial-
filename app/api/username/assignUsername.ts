import prisma from "../../lib/db";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export async function assignUsername(id: string) {
  const userId = id;
  let user;
  if (userId) {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    const randomName: string = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
    });
    const uniqueUsername = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: randomName,
      },
    });
    return uniqueUsername;
  }
}
