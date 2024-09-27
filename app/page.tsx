import { redirect } from "next/navigation";
import { logUserInfo } from "./lib/actions/getUsername";
import { getUser } from "./lib/actions/getUser";
import LandingPage from "./landing/page";

export default async function Home() {
  const session = await getUser();
  if (!session?.user) {
    return (
      <div>
        <LandingPage></LandingPage>
      </div>
    );
  } else {
    const communityId = await logUserInfo();
    redirect(`feed/${session.user.id}/${communityId?.communityId}`);
  }
}
