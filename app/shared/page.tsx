import React, { Suspense } from "react";
import { SidebarDemo } from "../components/Sidebar/SideBar";
import Dashboard from "../components/Dashboard/Dashboard";
import SharedPosts from "../communities/sharedPosts/[sharedCommunityId]/SharedPosts";
import { logUserInfo } from "../lib/actions/getUsername";
import Loading from "../components/Loading/Loading";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
const Page = async () => {
  const data = await logUserInfo();
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>Access Denied. Please log in.</p>;
  }
  let communityId = "";
  if (data?.communityId) communityId = data?.communityId;

  return (
    <Suspense fallback={<Loading />}>
      <SidebarDemo>
        <Dashboard>
          <SharedPosts communityId={communityId}></SharedPosts>
        </Dashboard>
      </SidebarDemo>
    </Suspense>
  );
};

export default Page;
