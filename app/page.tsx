import { redirect } from "next/navigation";
import { logUserInfo } from "./lib/actions/getUsername";
import { getUser } from "./lib/actions/getUser";

export default async function Home() {
  const session = await getUser();
  if (!session?.user) redirect("/signin");
  else {
    const communityId = await logUserInfo();
    redirect(`feed/${session.user.id}/${communityId?.communityId}`);
  }

  return <div>{/* {JSON.stringify(session)} */}</div>;
}
