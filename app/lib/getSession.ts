import { useSession } from "next-auth/react";
import prisma from "./db";
export const logUserInfo = async () => {
  console.log(1);

  const session = useSession();
  const userId = session.data?.user?.id;
  const username = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true },
  });
  return username;
};
