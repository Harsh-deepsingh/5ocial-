import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { logUserInfo } from "./lib/actions/getUsername";

export async function getUser() {
  //@ts-ignore
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();
  if (!session?.user) redirect("/signin");
  else {
    const communityId = await logUserInfo();
    redirect(`${session.user.id}&${communityId?.communityId}`);
  }

  return <div>{/* {JSON.stringify(session)} */}</div>;
}
